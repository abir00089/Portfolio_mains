import { useEffect } from "react";
import Lenis from "lenis";

/**
 * useSmoothScroll — frame-rate-independent Lenis scroll.
 * Exposes the instance as window.__lenis so navbar links can
 * call scrollTo() with a nice easing instead of instant jumps.
 */

const LERP = 0.08;

export default function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // slightly lower for more glide
      smoothWheel: true,
      wheelMultiplier: 1, // Reset to default 1
      touchMultiplier: 2.0,
      infinite: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
      autoRaf: true, // Let Lenis handle the RAF loop automatically
    });

    // Expose globally so Navbar can call scrollTo without prop-drilling
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
}
