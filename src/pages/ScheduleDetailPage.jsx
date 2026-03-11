import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ExportButton from "../components/ExportButton";
import ExportSuccess from "../components/ExportSuccess";
import RegistrationSheet from "../components/RegistrationSheet";
import ClassDetailsTable from "../components/detail/ClassDetailsTable";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import PageWrapper from "../components/layout/PageWrapper";
import WeeklyGrid from "../components/WeeklyGrid";
import { useAppContext } from "../context/AppContext";

const scoreLabels = {
  professorQuality: "Professor Quality",
  walkingFeasibility: "Walking Feasibility",
  workloadBalance: "Workload Balance",
  timePreference: "Time Preference",
  seatAvailability: "Seat Availability",
};

export default function ScheduleDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    schedules,
    selectedSchedule,
    selectSchedule,
    registrationItems,
    exportSchedule,
    exporting,
    exportResult,
  } = useAppContext();

  const schedule = schedules.find((item) => item.id === id) || selectedSchedule;

  useEffect(() => {
    if (schedule && selectedSchedule?.id !== schedule.id) {
      selectSchedule(schedule.id);
    }
  }, [schedule, selectedSchedule, selectSchedule]);

  if (!schedule) {
    return (
      <PageWrapper>
        <Navbar solid />
        <main className="empty-route-state section-frame app-page-top-gap">
          <p className="landing-eyebrow">No schedule selected</p>
          <h1>Pick one from the results page first.</h1>
          <Link to="/app/results" className="hero-primary-cta">Open results</Link>
        </main>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Navbar solid />
      <main className="section-frame app-page-top-gap detail-page">
        <div className="results-page-header detail-header">
          <div>
            <p className="landing-eyebrow">Schedule detail</p>
            <h1 className="app-page-title">{schedule.nickname}</h1>
            <p>{schedule.explanation}</p>
          </div>
          <div className="results-header-actions">
            <button type="button" className="hero-secondary-cta" onClick={() => navigate("/app/results")}><ArrowLeft size={18} /> Back to results</button>
            <ExportButton onExport={() => exportSchedule(schedule.id)} loading={exporting} />
          </div>
        </div>

        <section className="panel-card detail-summary-card">
          <div className="detail-summary-topline">
            <div className="detail-metric"><span>Composite</span><strong>{schedule.composite}/100</strong></div>
            <p className="detail-summary-note">Use the weekly grid below to judge pacing, building changes, and instructor visibility at a glance.</p>
          </div>
          <div className="score-badges detail-score-strip">
            {Object.entries(schedule.scores).map(([key, value]) => (
              <div key={key} className="score-pill detail-score-pill">
                <strong>{scoreLabels[key]}: {value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card detail-weekly-panel">
          <div className="panel-heading">
            <div>
              <p className="landing-eyebrow">Weekly grid</p>
              <h3>See every class, building, and professor clearly</h3>
            </div>
          </div>
          <WeeklyGrid sections={schedule.sections} expanded />
        </section>

        <ClassDetailsTable sections={schedule.sections} />
        <RegistrationSheet items={registrationItems} scheduleName={schedule.nickname} />
        {exportResult ? <ExportSuccess result={exportResult} /> : null}
        {exportResult ? <a className="detail-open-link" href={exportResult.deepLink} target="_blank" rel="noreferrer">Open Google Calendar import <ExternalLink size={16} /></a> : null}
      </main>
      <Footer />
    </PageWrapper>
  );
}
