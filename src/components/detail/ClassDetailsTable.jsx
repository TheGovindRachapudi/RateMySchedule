export default function ClassDetailsTable({ sections }) {
  return (
    <section className="detail-table-card panel-card">
      <div className="panel-heading">
        <div>
          <p className="landing-eyebrow">Class details</p>
          <h3>Registration-day view</h3>
        </div>
      </div>
      <div className="detail-table-wrap">
        <table className="detail-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Unique #</th>
              <th>Instructor</th>
              <th>Days / Time</th>
              <th>Building</th>
              <th>Rating</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => {
              const fill = Math.round((section.enrolled / section.seats) * 100);
              const ratingClass = section.rating >= 4 ? "good" : section.rating >= 3 ? "okay" : "bad";
              return (
                <tr key={section.unique}>
                  <td>{section.courseId}</td>
                  <td className="mono">{section.unique}</td>
                  <td>{section.instructor}</td>
                  <td>{section.days} {section.start}-{section.end}</td>
                  <td>{section.building} {section.room}</td>
                  <td><span className={`rating-pill ${ratingClass}`}>{section.rating.toFixed(1)}</span></td>
                  <td>
                    <div className="seat-cell">
                      <span>{section.enrolled}/{section.seats}</span>
                      <div className="seat-bar"><i style={{ width: `${fill}%` }} /></div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}