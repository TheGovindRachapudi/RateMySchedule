import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroInput from "../components/HeroInput";
import LoadingState from "../components/LoadingState";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import PageWrapper from "../components/layout/PageWrapper";
import { useAppContext } from "../context/AppContext";

function StepIndicator({ step }) {
  const steps = ["Input", "Optimize", "Results", "Export"];
  const activeIndex = { input: 0, loading: 1, results: 2, exported: 3 }[step] ?? 0;
  return (
    <div className="step-indicator">
      {steps.map((item, index) => (
        <div key={item} className={`step-pill ${index <= activeIndex ? "active" : ""}`}>{item}</div>
      ))}
    </div>
  );
}

export default function AppPage() {
  const navigate = useNavigate();
  const {
    inputText,
    setInputText,
    sampleInputs,
    availableCourses,
    selectedCourseIds,
    toggleCourse,
    preferences,
    setPreferences,
    generateFromCurrentState,
    loading,
    loadingStep,
    notes,
    diagnostics,
    schedules,
    step,
  } = useAppContext();

  async function handleGenerate() {
    const results = await generateFromCurrentState();
    if (results.length) {
      navigate("/app/results");
    }
  }

  return (
    <PageWrapper>
      <Navbar solid />
      <main className="app-page-layout section-frame app-page-top-gap">
        <div className="app-page-intro">
          <p className="landing-eyebrow">Optimizer</p>
          <h1 className="app-page-title">Build the best version of your semester before UTDirect becomes a blood sport.</h1>
          <p>Use natural language, structured picks, or both. We keep everything in memory and score the schedules live.</p>
          <StepIndicator step={step} />
        </div>

        <HeroInput
          inputText={inputText}
          setInputText={setInputText}
          sampleInputs={sampleInputs}
          courses={availableCourses}
          selectedCourseIds={selectedCourseIds}
          onToggleCourse={toggleCourse}
          preferences={preferences}
          setPreferences={setPreferences}
          onGenerate={handleGenerate}
          loading={loading}
        />

        {notes.length ? <section className="notes-strip panel-card">{notes.map((note) => <p key={note}>{note}</p>)}</section> : null}
        {diagnostics.length && schedules.length ? <section className="diagnostic-strip panel-card">{diagnostics.map((item) => <p key={item}>{item}</p>)}</section> : null}
        {loading ? <LoadingState stepIndex={loadingStep} /> : null}

        {!loading && schedules.length ? (
          <div className="app-inline-results">
            <p>{schedules.length} ranked schedules ready.</p>
            <button type="button" className="hero-primary-cta inline" onClick={() => navigate("/app/results")}>See results <ArrowRight size={18} /></button>
          </div>
        ) : null}
      </main>
      <Footer />
    </PageWrapper>
  );
}
