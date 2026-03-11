export default function WalkingWarning({ warning }) {
  const labels = {
    ok: "Comfortable",
    tight: "Tight",
    sprint: "Sprint required"
  };

  return (
    <div className={`warning-row ${warning.severity}`}>
      <span className={`warning-dot ${warning.severity}`} />
      <div>
        <strong>{warning.day}</strong>
        <p>
          {warning.fromCourse} to {warning.toCourse}: {warning.walkMinutes} min walk, {warning.gapMinutes} min gap. {labels[warning.severity]}.
        </p>
      </div>
    </div>
  );
}
