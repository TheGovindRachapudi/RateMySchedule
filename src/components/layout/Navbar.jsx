import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ solid = false }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={`top-nav ${solid ? "is-solid" : ""}`}>
      <div className="top-nav__inner">
        <Link to="/" className="brand-link" onClick={closeMenu}>
          <img src="/longhorn.svg" alt="RateMySchedule logo" />
          <span>RateMySchedule</span>
        </Link>

        <nav className={`top-nav__links ${open ? "is-open" : ""}`}>
          {isLanding ? (
            <>
              <a href="#features" onClick={closeMenu}>Features</a>
              <a href="#how-it-works" onClick={closeMenu}>How It Works</a>
              <Link to="/about" onClick={closeMenu}>About</Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={closeMenu}>Home</Link>
              <Link to="/app" onClick={closeMenu}>Optimizer</Link>
              <Link to="/about" onClick={closeMenu}>About</Link>
            </>
          )}
          <Link to="/app" className="nav-cta" onClick={closeMenu}>Launch App</Link>
        </nav>

        <button type="button" className="nav-toggle" onClick={() => setOpen((current) => !current)} aria-label="Toggle navigation">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}