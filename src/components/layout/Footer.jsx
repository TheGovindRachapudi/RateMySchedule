import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-title">RateMySchedule</p>
        <p>Built for UT Austin students who are done making 15 backup schedules by hand.</p>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/app">App</Link>
        <Link to="/about">About</Link>
      </div>
    </footer>
  );
}