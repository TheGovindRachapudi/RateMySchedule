const steps = ["Parsing requirements", "Finding sections", "Scoring schedules", "Writing tradeoff notes"];

export default function LoadingState({ stepIndex }) {
  return (
    <section className="loading-shell panel-card">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Working</p>
          <h3>{steps[stepIndex] || steps[0]}</h3>
        </div>
      </div>

      <div className="loading-steps">
        {steps.map((step, index) => (
          <div key={step} className={`loading-step ${index <= stepIndex ? "active" : ""}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <div className="skeleton-grid">
        {[0, 1, 2].map((card) => (
          <div key={card} className="skeleton-card">
            <div className="skeleton-line large" />
            <div className="skeleton-line medium" />
            <div className="skeleton-calendar" />
          </div>
        ))}
      </div>
    </section>
  );
}
