import { createContext, useContext, useEffect, useState } from "react";
import { buildRegistrationSheet, exportScheduleToCalendar } from "../agents/calendarAgent";
import { explainSchedules } from "../agents/explainerAgent";
import { generateSchedules } from "../agents/optimizerEngine";
import { parseNaturalLanguageInput } from "../agents/parserAgent";
import { courses as catalogCourses } from "../data/courses";
import { sampleInputs } from "../data/sampleInputs";

const AppContext = createContext(null);

const defaultPreferences = {
  earliestStart: 9 * 60,
  latestEnd: 18 * 60,
  dayPattern: "none",
  wantFridaysOff: false,
  minimizeWalking: 3,
  prioritizeProfessorRating: 4,
  avoidBackToBack: false,
  preferTimeOfDay: "none",
  minimizeDaysOnCampus: false,
};

function mergePreferences(current, inferred) {
  return Object.entries(inferred).reduce((merged, [key, value]) => {
    if (value === null || value === undefined || value === "") {
      return merged;
    }
    return { ...merged, [key]: value };
  }, current);
}

export function AppProvider({ children }) {
  const [inputText, setInputText] = useState("");
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [schedules, setSchedules] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [stats, setStats] = useState(null);
  const [notes, setNotes] = useState([]);
  const [diagnostics, setDiagnostics] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [exportResult, setExportResult] = useState(null);
  const [step, setStep] = useState("input");

  useEffect(() => {
    if (!loading) {
      setLoadingStep(0);
      return undefined;
    }

    const timer = window.setInterval(() => {
      setLoadingStep((current) => (current < 3 ? current + 1 : current));
    }, 500);

    return () => window.clearInterval(timer);
  }, [loading]);

  function toggleCourse(courseId) {
    setSelectedCourseIds((current) =>
      current.includes(courseId) ? current.filter((item) => item !== courseId) : [...current, courseId],
    );
  }

  async function generateFromCurrentState() {
    const parsed = parseNaturalLanguageInput(inputText);
    const mergedPreferences = mergePreferences(preferences, parsed.inferredPreferences);
    const requiredCourseIds = [...new Set([...selectedCourseIds, ...parsed.requiredCourseIds])];
    const generationRequest = {
      requiredCourseIds,
      courseGroups: parsed.courseGroups,
    };

    setPreferences(mergedPreferences);
    setNotes(parsed.notes);
    setExportResult(null);
    setHasGenerated(true);
    setStep("loading");

    if (!generationRequest.requiredCourseIds.length && !generationRequest.courseGroups.length) {
      setSchedules([]);
      setStats(null);
      setDiagnostics(["Pick at least one real course or use a prompt that mentions a UT course requirement."]);
      setStep("input");
      return [];
    }

    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1500));

    const generated = generateSchedules(generationRequest, mergedPreferences);
    const explained = explainSchedules(generated.schedules);

    setSchedules(explained);
    setStats(generated.stats);
    setDiagnostics(generated.diagnostics);
    setSelectedScheduleId(explained[0]?.id || null);
    setLoading(false);
    setStep(explained.length ? "results" : "input");

    return explained;
  }

  function selectSchedule(scheduleId) {
    setSelectedScheduleId(scheduleId);
    setStep("results");
  }

  async function exportSchedule(scheduleId = selectedScheduleId) {
    const schedule = schedules.find((item) => item.id === scheduleId) || schedules[0];
    if (!schedule) {
      return null;
    }

    setSelectedScheduleId(schedule.id);
    setExporting(true);
    const result = await exportScheduleToCalendar(schedule);
    setExportResult(result);
    setExporting(false);
    setStep("exported");
    return result;
  }

  const selectedSchedule = schedules.find((schedule) => schedule.id === selectedScheduleId) || schedules[0] || null;
  const registrationItems = selectedSchedule ? buildRegistrationSheet(selectedSchedule) : [];

  return (
    <AppContext.Provider
      value={{
        availableCourses: catalogCourses,
        courses: selectedCourseIds,
        selectedCourseIds,
        inputText,
        setInputText,
        sampleInputs,
        preferences,
        setPreferences,
        schedules,
        selectedSchedule,
        selectedScheduleId,
        selectSchedule,
        step,
        stats,
        notes,
        diagnostics,
        hasGenerated,
        loading,
        loadingStep,
        exporting,
        exportResult,
        registrationItems,
        toggleCourse,
        generateFromCurrentState,
        exportSchedule,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const value = useContext(AppContext);
  if (!value) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return value;
}
