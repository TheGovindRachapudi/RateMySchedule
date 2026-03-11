export default function Header() {
  return (
    <header className="site-header panel-card">
      <div className="brand-mark">
        <img src="/longhorn.svg" alt="RateMySchedule logo" />
        <div>
          <p className="eyebrow">UT Austin Scheduler</p>
          <h1>RateMySchedule</h1>
        </div>
      </div>

      <div className="header-copy">
        <p>Trade off professors, walks, seat risk, and lifestyle in one pass.</p>
        <div className="header-pills">
          <span className="pill">Local optimizer</span>
          <span className="pill">Real UT buildings</span>
          <span className="pill">Google Calendar-ready</span>
        </div>
      </div>
    </header>
  );
}
