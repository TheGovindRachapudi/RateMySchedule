import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageWrapper({ className = "", children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return <div className={`page-shell page-enter-active ${className}`.trim()}>{children}</div>;
}