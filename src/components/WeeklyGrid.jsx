import { DEPT_COLORS } from "../data/deptColors";
import { DAY_LABELS, DAY_ORDER, formatMinutes, parseDays, parseTimeToMinutes } from "../utils/formatting";

const START_MINUTES = 8 * 60;
const END_MINUTES = 18 * 60;
const TOTAL_MINUTES = END_MINUTES - START_MINUTES;
const TIMES = Array.from({ length: 11 }, (_, index) => START_MINUTES + index * 60);

export default function WeeklyGrid({ sections, compact = false, expanded = false }) {
  const className = ["weekly-grid-wrap", compact ? "compact" : "", expanded ? "expanded" : ""].filter(Boolean).join(" ");

  return (
    <div className={className}>
      <div className="weekly-grid-header">
        <div />
        {DAY_ORDER.map((day) => (
          <div key={day}>{DAY_LABELS[day].slice(0, 3).toUpperCase()}</div>
        ))}
      </div>

      <div className="weekly-grid-body">
        <div className="time-column">
          {TIMES.map((time) => (
            <div key={time} className="time-cell">{formatMinutes(time)}</div>
          ))}
        </div>

        <div className="week-columns">
          {DAY_ORDER.map((day) => (
            <div key={day} className="day-column">
              {TIMES.map((time) => (
                <div key={time} className="hour-line" />
              ))}
              {sections
                .filter((section) => parseDays(section.days).includes(day))
                .map((section) => {
                  const colors = DEPT_COLORS[section.dept] || DEPT_COLORS.default;
                  const start = parseTimeToMinutes(section.start);
                  const end = parseTimeToMinutes(section.end);
                  const top = ((start - START_MINUTES) / TOTAL_MINUTES) * 100;
                  const height = ((end - start) / TOTAL_MINUTES) * 100;
                  return (
                    <article
                      key={`${section.unique}-${day}`}
                      className="class-block"
                      style={{ top: `${top}%`, height: `${height}%`, background: colors.bg, borderColor: colors.border, color: colors.text }}
                    >
                      <strong>{section.courseId}</strong>
                      <span>{section.building}{compact ? "" : ` ${section.room}`}</span>
                      {!compact ? <small>{section.instructor}</small> : null}
                    </article>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}