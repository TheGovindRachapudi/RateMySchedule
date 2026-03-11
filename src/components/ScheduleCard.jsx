import CompactScheduleOverview from "./CompactScheduleOverview";
import WalkingWarning from "./WalkingWarning";

const scoreLabels = {
  professorQuality: "Prof",
  walkingFeasibility: "Walk",
  workloadBalance: "Load",
  timePreference: "Fit",
  seatAvailability: "Seats",
};

export default function ScheduleCard({ schedule, isActive, onSelect }) {
  return (
    <article className={`schedule-card panel-card ${isActive ? "active" : ""}`}>
      <div className="schedule-topline">
        <div>
          <p className="landing-eyebrow">Schedule {schedule.emoji}</p>
          <h3>{schedule.nickname}</h3>
        </div>
        <button type="button" className="secondary-button" onClick={onSelect}>
          {isActive ? "Selected" : "Select"}
        </button>
      </div>

      <div className="schedule-scoreline">
        <strong>{schedule.composite}/100</strong>
        <span>{schedule.sections.length} classes</span>
      </div>

      <div className="score-badges score-badges-readable">
        {Object.entries(schedule.scores).map(([key, value]) => (
          <div key={key} className="score-pill score-pill-readable">
            <strong>{scoreLabels[key]}: {value}</strong>
          </div>
        ))}
      </div>

      <CompactScheduleOverview sections={schedule.sections} />

      <div className="schedule-explanation">
        <p>{schedule.explanation}</p>
      </div>

      <div className="warning-list">
        {(schedule.walkingWarnings.length ? schedule.walkingWarnings : [{ severity: "ok", day: "All week", fromCourse: "Schedule", toCourse: "Next class", walkMinutes: 0, gapMinutes: 15 }]).map((warning, index) => (
          <WalkingWarning key={`${warning.day}-${warning.fromCourse}-${index}`} warning={warning} />
        ))}
      </div>
    </article>
  );
}
