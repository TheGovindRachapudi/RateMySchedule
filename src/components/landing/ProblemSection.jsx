import AnimatedCounter from "../shared/AnimatedCounter";

const stats = [
  { value: 50, suffix: ",000+", label: "students fighting for seats" },
  { value: 15, suffix: "+", label: "backup schedules per student" },
  { value: 10, prefix: "< ", suffix: " sec", label: "before popular sections fill" },
  { value: 0, label: "tools that optimize for you" },
];

export default function ProblemSection() {
  return (
    <section className="problem-section section-frame" id="features">
      <div className="problem-copy">
        <h2>"Every semester, I make 15 schedules and pray."</h2>
        <p className="problem-attribution">Actual UT Austin student energy, every registration season.</p>
        <p className="problem-description">
          Registration at UT is broken. Classes fill in seconds, campus is huge, and the existing tools make you do all the reasoning yourself. RateMySchedule combines professor quality, walking time, workload balance, and your real preferences in one view.
        </p>
      </div>
      <div className="problem-stats-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="problem-stat-card">
            <strong><AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} /></strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}