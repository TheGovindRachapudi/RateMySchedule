import { Brain, CalendarDays, MessageSquare } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";

const steps = [
  {
    number: "1",
    icon: MessageSquare,
    title: "Tell it what you need",
    description: '"SDS 322, CS 331, Fridays off, no 8 AMs." Natural language first, structured controls if you want them.',
    mockup: "chat",
  },
  {
    number: "2",
    icon: Brain,
    title: "Optimize every combo",
    description: "The engine scores every valid schedule across professors, walking, workload, seat safety, and preference fit.",
    mockup: "radar",
  },
  {
    number: "3",
    icon: CalendarDays,
    title: "Export and register",
    description: "Lock in the best schedule, copy your unique numbers, and download a calendar file you can import immediately.",
    mockup: "calendar",
  },
];

function Mockup({ type }) {
  if (type === "chat") {
    return (
      <div className="mini-chat">
        <span>Student: SDS 322, CS 331, Fridays off</span>
        <span>AI: Found 14 valid schedules. Here are your top 3.</span>
      </div>
    );
  }

  if (type === "radar") {
    return (
      <svg viewBox="0 0 120 120" className="mini-radar" aria-hidden="true">
        <polygon points="60,10 105,42 88,100 32,100 15,42" fill="none" stroke="rgba(255,255,255,0.12)" />
        <polygon points="60,24 92,48 78,88 38,84 24,48" fill="rgba(191,87,0,0.28)" stroke="#ff6b00" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <div className="mini-calendar">
      <div />
      <div />
      <div />
      <span className="mini-check">OK</span>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="how-section section-frame" id="how-it-works">
      <div className="section-heading center">
        <p className="landing-eyebrow">How it works</p>
        <h2>Three steps. Thirty seconds. Zero stress.</h2>
        <p>One request in plain English. Three optimized schedules back.</p>
      </div>
      <div className="how-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <ScrollReveal key={step.title} className="how-card" delay={index * 200}>
              <span className="how-watermark">{step.number}</span>
              <Icon size={28} className="how-icon" />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <Mockup type={step.mockup} />
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}