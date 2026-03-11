import { Clock3, MapPinned, ShieldCheck, Star, TimerReset } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";

const cards = [
  { icon: Star, title: "Professor quality", body: "Weight real instructor ratings so the optimizer stops sticking you with the random staff section.", className: "wide" },
  { icon: MapPinned, title: "Walking time", body: "GPS coordinates across UT buildings let us model whether that next class is a casual walk or a sprint.", className: "tall" },
  { icon: Clock3, title: "Time fit", body: "No 8 AMs, prefer TTH, Fridays off, afternoon-heavy. The schedule should reflect your life.", className: "" },
  { icon: TimerReset, title: "Workload balance", body: "Avoid the four-hour Tuesday stack unless it is genuinely worth the tradeoff.", className: "" },
  { icon: ShieldCheck, title: "Seat safety", body: "Sections with breathing room rank higher so your best plan is still alive on registration day.", className: "wide" },
];

export default function FeatureBento() {
  return (
    <section className="feature-bento section-frame">
      <div className="section-heading">
        <p className="landing-eyebrow">Five scoring dimensions</p>
        <h2>Not just schedule generation. Actual schedule judgment.</h2>
      </div>
      <div className="bento-grid">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <ScrollReveal key={card.title} className={`bento-card ${card.className}`.trim()} delay={index * 100}>
              <Icon size={24} />
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}