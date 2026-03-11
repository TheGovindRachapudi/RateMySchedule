import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ value, suffix = "", prefix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasAnimated) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setHasAnimated(true);
        const target = typeof value === "number" ? value : Number(value) || 0;
        const duration = 800;
        const startTime = performance.now();

        function tick(now) {
          const progress = Math.min(1, (now - startTime) / duration);
          setDisplayValue(Math.round(target * progress));
          if (progress < 1) {
            window.requestAnimationFrame(tick);
          }
        }

        window.requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
}