import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="final-cta section-frame">
      <p className="landing-eyebrow">Ready when you are</p>
      <h2>Turn the three-hour registration spiral into a 30-second decision.</h2>
      <p>Launch the optimizer, paste what you need, and let the app rank the tradeoffs for you.</p>
      <Link to="/app" className="hero-primary-cta">Launch App <ArrowRight size={18} /></Link>
    </section>
  );
}