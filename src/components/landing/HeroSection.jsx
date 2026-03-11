import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import GradientText from "../shared/GradientText";
import HeroSchedulePreview from "./HeroSchedulePreview";

export default function HeroSection() {
  return (
    <section className="landing-hero section-frame">
      <div className="landing-hero__copy">
        <p className="landing-eyebrow">Built for UT Austin students</p>
        <h1>
          The <GradientText>decision engine</GradientText> for a better semester.
        </h1>
        <p className="landing-subheadline">
          Tell RateMySchedule what courses you need. It returns ranked schedule paths scored on professor quality, walking time, and workload balance, then helps you export the best one in a click.
        </p>
        <div className="landing-cta-row">
          <Link to="/app" className="hero-primary-cta">Optimize My Schedule <ArrowRight size={18} /></Link>
          <a href="#how-it-works" className="hero-secondary-cta">See How It Works <ChevronDown size={18} /></a>
        </div>
        <div className="landing-social-proof">
          <div className="avatar-stack">
            {Array.from({ length: 5 }).map((_, index) => <span key={index} />)}
          </div>
          <p>Built to turn course registration from a search task into a recommendation product students can trust.</p>
        </div>
      </div>
      <HeroSchedulePreview />
    </section>
  );
}
