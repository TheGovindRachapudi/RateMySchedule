function toTimeValue(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function fromTimeValue(value) {
  const [hours, mins] = value.split(":").map(Number);
  return hours * 60 + mins;
}

export default function PreferencePanel({ preferences, setPreferences }) {
  function updatePreference(key, value) {
    setPreferences((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="preferences panel-card">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Preference engine</p>
          <h3>How should the optimizer think?</h3>
        </div>
      </div>

      <div className="preference-grid">
        <label>
          <span>Earliest start</span>
          <input
            type="time"
            value={toTimeValue(preferences.earliestStart)}
            onChange={(event) => updatePreference("earliestStart", fromTimeValue(event.target.value))}
          />
        </label>

        <label>
          <span>Latest end</span>
          <input
            type="time"
            value={toTimeValue(preferences.latestEnd)}
            onChange={(event) => updatePreference("latestEnd", fromTimeValue(event.target.value))}
          />
        </label>

        <label>
          <span>Day pattern</span>
          <select
            value={preferences.dayPattern}
            onChange={(event) => updatePreference("dayPattern", event.target.value)}
          >
            <option value="none">No preference</option>
            <option value="TTH">Prefer TTH</option>
            <option value="MWF">Prefer MWF</option>
          </select>
        </label>

        <label>
          <span>Time of day</span>
          <select
            value={preferences.preferTimeOfDay}
            onChange={(event) => updatePreference("preferTimeOfDay", event.target.value)}
          >
            <option value="none">No preference</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
          </select>
        </label>

        <label className="slider-field">
          <span>Minimize walking</span>
          <input
            type="range"
            min="1"
            max="5"
            value={preferences.minimizeWalking}
            onChange={(event) => updatePreference("minimizeWalking", Number(event.target.value))}
          />
          <strong>{preferences.minimizeWalking}/5</strong>
        </label>

        <label className="slider-field">
          <span>Prioritize professor rating</span>
          <input
            type="range"
            min="1"
            max="5"
            value={preferences.prioritizeProfessorRating}
            onChange={(event) => updatePreference("prioritizeProfessorRating", Number(event.target.value))}
          />
          <strong>{preferences.prioritizeProfessorRating}/5</strong>
        </label>
      </div>

      <div className="toggle-row">
        <label><input type="checkbox" checked={preferences.wantFridaysOff} onChange={(event) => updatePreference("wantFridaysOff", event.target.checked)} /> Fridays off</label>
        <label><input type="checkbox" checked={preferences.avoidBackToBack} onChange={(event) => updatePreference("avoidBackToBack", event.target.checked)} /> Avoid back-to-back</label>
        <label><input type="checkbox" checked={preferences.minimizeDaysOnCampus} onChange={(event) => updatePreference("minimizeDaysOnCampus", event.target.checked)} /> Minimize days on campus</label>
      </div>
    </div>
  );
}
