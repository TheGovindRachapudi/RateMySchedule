export default function ScrollReveal({ className = "", style, children, delay = 0 }) {
  return (
    <div className={`scroll-reveal ${className}`.trim()} style={{ ...style, animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}