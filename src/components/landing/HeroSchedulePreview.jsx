const mockClasses = [
  { course: "CS314", place: "GDC", day: 0, top: 12, height: 18, delay: 500 },
  { course: "SDS375", place: "GDC", day: 1, top: 34, height: 18, delay: 700 },
  { course: "M 362K", place: "RLM", day: 0, top: 60, height: 18, delay: 900 },
  { course: "CS314", place: "GDC", day: 3, top: 12, height: 18, delay: 1100 },
  { course: "SDS375", place: "GDC", day: 3, top: 34, height: 18, delay: 1300 },
  { course: "M 362K", place: "RLM", day: 2, top: 60, height: 18, delay: 1500 },
];

export default function HeroSchedulePreview() {
  return (
    <div className="hero-preview-wrap">
      <div className="hero-preview-glow" />
      <div className="hero-preview-card">
        <div className="hero-preview-header">
          <span>Schedule A</span>
          <div className="hero-score-pill">Score: 87</div>
        </div>
        <div className="hero-mini-grid">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
            <div key={day} className="hero-mini-column">
              <span>{day}</span>
            </div>
          ))}
          {mockClasses.map((block) => (
            <article
              key={`${block.course}-${block.day}-${block.top}`}
              className="hero-mini-block"
              style={{ left: `calc(${block.day} * 20% + 10px)`, top: `${block.top}%`, height: `${block.height}%`, animationDelay: `${block.delay}ms` }}
            >
              <strong>{block.course}</strong>
              <small>{block.place}</small>
            </article>
          ))}
          <div className="hero-connector connector-a" />
          <div className="hero-connector connector-b" />
        </div>
        <div className="hero-analysis-tip">AI Analysis: Best professors, Fridays off, one tight walk.</div>
      </div>
    </div>
  );
}