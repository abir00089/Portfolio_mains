import { memo } from "react";
import { motion } from "motion/react";

// Smooth scroll to a section ID using the Lenis instance (exposed on window)
const scrollTo = (id) => {
  const target = document.getElementById(id);
  if (!target) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(target, {
      offset: -60,
      duration: 1.4,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // easeOutExpo
    });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
};

// ─── Static navigation list ──────────────────────────────────────────────────
const Navigation = memo(function Navigation({ onOpenAbout, toggle }) {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <button
          className="nav-link cursor-pointer"
          onClick={() => {
            if (toggle) toggle();
            scrollTo("home");
          }}
        >
          Home
        </button>
      </li>
      <li className="nav-li">
        <button
          className="nav-link cursor-pointer"
          onClick={() => {
            if (toggle) toggle();
            if (onOpenAbout) onOpenAbout();
          }}
        >
          About
        </button>
      </li>
      <li className="nav-li">
        <button
          className="nav-link cursor-pointer"
          onClick={() => {
            if (toggle) toggle();
            scrollTo("work");
          }}
        >
          Work
        </button>
      </li>
      <li className="nav-li">
        <button
          className="nav-link cursor-pointer"
          onClick={() => {
            if (toggle) toggle();
            scrollTo("contact");
          }}
        >
          Contact
        </button>
      </li>
    </ul>
  );
});

const Navbar = memo(function Navbar({ onOpenAbout }) {
  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <button
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            Abir
          </button>
          <nav className="flex items-center gap-2 sm:gap-6">
            <Navigation onOpenAbout={onOpenAbout} />
          </nav>
        </div>
      </div>
    </div>
  );
});

export default Navbar;
