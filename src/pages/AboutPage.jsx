import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import PageWrapper from "../components/layout/PageWrapper";

export default function AboutPage() {
  return (
    <PageWrapper>
      <Navbar solid />
      <main className="section-frame app-page-top-gap about-page">
        <div className="section-heading">
          <p className="landing-eyebrow">About RateMySchedule</p>
          <h1 className="app-page-title">Built in hackathon time, designed like it belongs on a startup launch page.</h1>
          <p>RateMySchedule exists because UT registration is still a stress test disguised as a product.</p>
        </div>

        <section className="about-grid">
          <article className="panel-card about-card">
            <h3>The tech stack</h3>
            <ul>
              <li>Frontend: React + Vite + React Router</li>
              <li>AI: Claude-ready parser and explainer architecture</li>
              <li>Calendar: export flow ready for Google Calendar handoff</li>
              <li>Data: curated UT Austin catalog + building coordinates</li>
              <li>Logic: conflict detection, scoring, walking-time calculations</li>
            </ul>
          </article>

          <article className="panel-card about-card">
            <h3>The architecture</h3>
            <div className="architecture-flow">
              <span>Parser</span>
              <span>Optimizer</span>
              <span>Explainer</span>
              <span>Calendar Export</span>
            </div>
          </article>

          <article className="panel-card about-card wide">
            <h3>Why this exists</h3>
            <blockquote>
              "I've made 15 backup schedules every semester for years. UT has 50,000 students and still no tool that combines professor ratings, walking time, and actual optimization. So I built one."
            </blockquote>
            <p>Govind, SDS '27 energy, translated into a product judges can understand instantly.</p>
          </article>
        </section>

        <div className="about-actions">
          <Link to="/" className="hero-secondary-cta">Back to home</Link>
          <Link to="/app" className="hero-primary-cta">Launch the app <ArrowRight size={18} /></Link>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}