import { DAY_ORDER, formatMinutes } from "../utils/formatting";
import { groupSectionsByDay } from "../utils/timeConflict";

const DAY_SHORT = {
  M: "Mon",
  T: "Tue",
  W: "Wed",
  TH: "Thu",
  F: "Fri",
};

export default function CompactScheduleOverview({ sections }) {
  const grouped = groupSectionsByDay(sections);

  return (
    <div className="compact-overview-list">
      {DAY_ORDER.map((day) => {
        const daySections = grouped[day];
        const first = daySections[0];
        const last = daySections[daySections.length - 1];
        const summary = daySections.length
          ? `${formatMinutes(first.startMinutes)} - ${formatMinutes(last.endMinutes)}`
          : "Free day";

        return (
          <section key={day} className={`compact-day-row ${daySections.length ? "" : "free"}`.trim()}>
            <div className="compact-day-meta">
              <strong>{DAY_SHORT[day]}</strong>
              <span>{summary}</span>
              <small>{daySections.length ? `${daySections.length} classes` : "No campus time"}</small>
            </div>

            <div className="compact-day-classes">
              {daySections.length ? (
                daySections.map((section) => (
                  <article key={`${day}-${section.unique}`} className={`compact-class-chip dept-${section.dept.toLowerCase()}`}>
                    <strong>{section.courseId}</strong>
                    <span>{section.start} - {section.end}</span>
                  </article>
                ))
              ) : (
                <div className="compact-free-note">Clear day</div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}