import CourseSearch from "./CourseSearch";
import PreferencePanel from "./PreferencePanel";

export default function HeroInput({
  inputText,
  setInputText,
  sampleInputs,
  courses,
  selectedCourseIds,
  onToggleCourse,
  preferences,
  setPreferences,
  onGenerate,
  loading,
}) {
  return (
    <section className="hero-layout">
      <div className="hero-copy panel-card hero-card">
        <p className="eyebrow">AI-powered schedule optimizer</p>
        <h2>Tell RateMySchedule what you still need, then let it rank the best paths through UT.</h2>
        <p className="hero-supporting">
          Professor quality, walking feasibility, workload balance, seat safety, and lifestyle fit all get folded into one ranked set of schedules.
        </p>

        <textarea
          className="hero-textarea"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          placeholder="I need SDS 322, CS 331, M 362K, SDS 375, and a writing flag course. No 8 AMs, prefer TTH, Fridays off."
        />

        <div className="chip-row">
          {sampleInputs.map((sample) => (
            <button key={sample} type="button" className="chip" onClick={() => setInputText(sample)}>
              {sample}
            </button>
          ))}
        </div>

        <button type="button" className="primary-button" onClick={onGenerate} disabled={loading}>
          {loading ? "Optimizing..." : "Optimize My Schedule"}
        </button>
      </div>

      <div className="hero-side">
        <CourseSearch
          courses={courses}
          selectedCourseIds={selectedCourseIds}
          onToggleCourse={onToggleCourse}
        />
        <PreferencePanel preferences={preferences} setPreferences={setPreferences} />
      </div>
    </section>
  );
}
