const axes = [
  { key: "professorQuality", label: "Prof" },
  { key: "walkingFeasibility", label: "Walk" },
  { key: "workloadBalance", label: "Load" },
  { key: "timePreference", label: "Fit" },
  { key: "seatAvailability", label: "Seats" }
];

function pointsForScore(values, radius = 74, center = 90) {
  return values
    .map((value, index) => {
      const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
      const scaled = (value / 100) * radius;
      const x = center + Math.cos(angle) * scaled;
      const y = center + Math.sin(angle) * scaled;
      return `${x},${y}`;
    })
    .join(" ");
}

function axisPoint(index, total, radius = 74, center = 90) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius
  };
}

export default function RadarComparison({ schedules }) {
  return (
    <section className="radar-panel panel-card">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Comparison</p>
          <h3>Radar snapshot</h3>
        </div>
      </div>

      <div className="radar-grid">
        {schedules.map((schedule, index) => {
          const values = axes.map((axis) => schedule.scores[axis.key]);
          const colors = ["#bf5700", "#16c79a", "#e94560"];
          return (
            <article key={schedule.id} className="radar-card">
              <div className="radar-copy">
                <strong>{schedule.nickname}</strong>
                <span>{schedule.composite}/100</span>
              </div>
              <svg viewBox="0 0 180 180" className="radar-svg" role="img" aria-label={`${schedule.nickname} radar chart`}>
                {[20, 40, 60, 80, 100].map((ring) => (
                  <polygon
                    key={ring}
                    points={pointsForScore(Array.from({ length: 5 }, () => ring))}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                  />
                ))}
                {axes.map((axis, axisIndex) => {
                  const point = axisPoint(axisIndex, axes.length, 82);
                  return (
                    <g key={axis.key}>
                      <line x1="90" y1="90" x2={point.x} y2={point.y} stroke="rgba(255,255,255,0.1)" />
                      <text x={point.x} y={point.y} textAnchor="middle" dominantBaseline="middle">{axis.label}</text>
                    </g>
                  );
                })}
                <polygon
                  points={pointsForScore(values)}
                  fill={`${colors[index]}33`}
                  stroke={colors[index]}
                  strokeWidth="2"
                />
              </svg>
            </article>
          );
        })}
      </div>
    </section>
  );
}
