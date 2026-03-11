import { courses } from "../data/courses";
import { parseTimeToMinutes } from "../utils/formatting";

const aliasDefinitions = [
  {
    label: "Scientific Programming",
    patterns: [/\bscientific programming\b/],
    mode: "required",
    courseIds: ["SDS322"],
  },
  {
    label: "Algorithms",
    patterns: [/\balgorithms\b/],
    mode: "required",
    courseIds: ["CS331"],
  },
  {
    label: "Probability",
    patterns: [/\bprobability\b/],
    mode: "required",
    courseIds: ["M362K"],
  },
  {
    label: "Data Visualization",
    patterns: [/\bdata viz\b/, /\bvisualization\b/],
    mode: "required",
    courseIds: ["SDS375"],
  },
  {
    label: "Data Structures",
    patterns: [/\bdata structures\b/],
    mode: "required",
    courseIds: ["CS314"],
  },
  {
    label: "Discrete Math",
    patterns: [/\bdiscrete math\b/, /\bdiscrete mathematics\b/],
    mode: "group",
    courseIds: ["CS311", "M325K"],
    note: "Treating discrete math as a best-fit requirement slot instead of forcing every matching course.",
  },
  {
    label: "Microeconomics",
    patterns: [/\bmicroeconomics\b/],
    mode: "required",
    courseIds: ["ECO304K"],
  },
  {
    label: "Finance",
    patterns: [/\bfinance\b/],
    mode: "required",
    courseIds: ["FIN357"],
  },
  {
    label: "Psychology",
    patterns: [/\bpsychology\b/],
    mode: "required",
    courseIds: ["PSY301"],
  },
  {
    label: "Philosophy",
    patterns: [/\bphilosophy\b/],
    mode: "required",
    courseIds: ["PHL301"],
  },
  {
    label: "Rhetoric",
    patterns: [/\brhetoric\b/],
    mode: "required",
    courseIds: ["RHE306"],
  },
  {
    label: "Writing Requirement",
    patterns: [/\bwriting flag course\b/, /\bwriting flag\b/, /\bwriting course\b/, /\bwriting\b/],
    mode: "group",
    courseIds: ["RHE306", "UGS303", "HIS315K"],
    note: "Treating the writing requirement as one best-fit course choice instead of adding every writing option.",
  },
  {
    label: "Fun Elective",
    patterns: [/\bfun elective\b/, /\belective\b/],
    mode: "group",
    courseIds: ["PHL301", "PSY301", "UGS303"],
    note: "Treating the elective request as a choose-one slot so the optimizer can keep the schedule realistic.",
  },
  {
    label: "Government",
    patterns: [/\bgovernment\b/],
    mode: "required",
    courseIds: ["GOV310L"],
  },
];

const courseIndex = courses.reduce((lookup, course) => {
  lookup[course.id] = course;
  return lookup;
}, {});

function normalizeInput(input) {
  return input.toLowerCase().replace(/[^a-z0-9\s&]+/g, " ");
}

function parseDirectCourseMatches(input) {
  const compact = input.toUpperCase().replace(/\s+/g, " ");
  const matches = compact.match(/\b([A-Z]{1,3})\s?(\d{3}[A-Z]?)\b/g) || [];

  return matches
    .map((match) => match.replace(/\s+/g, ""))
    .filter((courseId) => courseIndex[courseId]);
}

function dedupe(values) {
  return [...new Set(values)];
}

function matchesAliasDefinition(normalizedInput, definition) {
  return definition.patterns.some((pattern) => pattern.test(normalizedInput));
}

export function parseNaturalLanguageInput(input) {
  const normalizedInput = normalizeInput(input);
  const notes = [];
  const requiredCourseIds = [...parseDirectCourseMatches(input)];
  const courseGroups = [];
  const seenGroups = new Set();

  aliasDefinitions.forEach((definition) => {
    if (!matchesAliasDefinition(normalizedInput, definition)) {
      return;
    }

    if (definition.mode === "required") {
      requiredCourseIds.push(...definition.courseIds);
      return;
    }

    if (!seenGroups.has(definition.label)) {
      courseGroups.push({
        label: definition.label,
        courseIds: definition.courseIds.filter((courseId) => courseIndex[courseId]),
      });
      seenGroups.add(definition.label);
      if (definition.note) {
        notes.push(definition.note);
      }
    }
  });

  const inferredPreferences = {
    earliestStart: normalizedInput.includes("no 8 am") || normalizedInput.includes("hate mornings") ? parseTimeToMinutes("09:00") : null,
    latestEnd: normalizedInput.includes("done by 4") ? parseTimeToMinutes("16:00") : null,
    dayPattern: normalizedInput.includes("prefer tth") ? "TTH" : normalizedInput.includes("prefer mwf") ? "MWF" : null,
    wantFridaysOff: normalizedInput.includes("fridays off") || normalizedInput.includes("friday off") ? true : null,
    minimizeWalking: normalizedInput.includes("minimize walking") || normalizedInput.includes("chill walk") ? 5 : null,
    prioritizeProfessorRating: normalizedInput.includes("good professors") || normalizedInput.includes("strongest professor") ? 5 : null,
    avoidBackToBack: normalizedInput.includes("avoid back to back") ? true : null,
    preferTimeOfDay: normalizedInput.includes("morning") ? "morning" : normalizedInput.includes("afternoon") ? "afternoon" : null,
    minimizeDaysOnCampus: normalizedInput.includes("minimize days") || normalizedInput.includes("four day") || normalizedInput.includes("4 day") ? true : null,
  };

  const resolvedRequiredCourseIds = dedupe(requiredCourseIds).filter((courseId) => courseIndex[courseId]);

  if (!resolvedRequiredCourseIds.length && !courseGroups.length) {
    notes.push("I could not confidently map courses from the prompt, so start with the quick course chips below and refine from there.");
  }

  return {
    requiredCourseIds: resolvedRequiredCourseIds,
    courseGroups,
    inferredPreferences,
    notes: dedupe(notes),
  };
}
