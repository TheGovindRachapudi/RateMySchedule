export default function SocialProofBar() {
  const items = [
    "5 scoring dimensions",
    "25+ UT buildings mapped",
    "Real walking times",
    "Google Calendar export",
    "Powered by Claude-ready architecture",
  ];

  return (
    <section className="social-proof-bar section-frame">
      <div className="social-proof-track">
        {items.concat(items).map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}