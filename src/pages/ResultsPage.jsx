import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RadarComparison from "../components/RadarComparison";
import ScheduleCard from "../components/ScheduleCard";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import PageWrapper from "../components/layout/PageWrapper";
import { useAppContext } from "../context/AppContext";

export default function ResultsPage() {
  const navigate = useNavigate();
  const { schedules, stats, diagnostics, selectedSchedule, selectSchedule } = useAppContext();

  if (!schedules.length) {
    return (
      <PageWrapper>
        <Navbar solid />
        <main className="empty-route-state section-frame app-page-top-gap">
          <p className="landing-eyebrow">No results yet</p>
          <h1>Generate a schedule first.</h1>
          <Link to="/app" className="hero-primary-cta">Go to optimizer</Link>
        </main>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Navbar solid />
      <main className="section-frame app-page-top-gap results-page">
        <div className="results-page-header">
          <div>
            <p className="landing-eyebrow">Results</p>
            <h1 className="app-page-title">Top schedule paths</h1>
            <p>We found {stats?.validCombinations || 0} conflict-free combinations out of {stats?.totalCombinations || 0} candidate builds.</p>
          </div>
          <div className="results-header-actions">
            <button type="button" className="hero-secondary-cta" onClick={() => navigate("/app")}><ArrowLeft size={18} /> Refine inputs</button>
            <Link to={`/app/results/${selectedSchedule?.id || schedules[0].id}`} className="hero-primary-cta">Open selected <ArrowRight size={18} /></Link>
          </div>
        </div>

        {diagnostics.length ? <section className="diagnostic-strip panel-card">{diagnostics.map((item) => <p key={item}>{item}</p>)}</section> : null}

        <section className="schedule-grid schedule-grid-results">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="schedule-result-stack">
              <ScheduleCard schedule={schedule} isActive={schedule.id === selectedSchedule?.id} onSelect={() => selectSchedule(schedule.id)} />
              <Link to={`/app/results/${schedule.id}`} className="detail-link">View full detail</Link>
            </div>
          ))}
        </section>

        <RadarComparison schedules={schedules} />
      </main>
      <Footer />
    </PageWrapper>
  );
}
