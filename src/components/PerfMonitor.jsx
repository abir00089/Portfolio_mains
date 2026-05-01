import { useEffect, useRef } from "react";

/**
 * PerfMonitor — lightweight FPS overlay (dev only).
 * Uses stats.js loaded from CDN only in development mode.
 * Zero production overhead — renders nothing in prod builds.
 */
const PerfMonitor = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    // Dynamically load stats.js only in dev
    const script = document.createElement("script");
    script.src = "https://mrdoob.github.io/stats.js/build/stats.min.js";
    script.async = true;
    script.onload = () => {
      // eslint-disable-next-line no-undef
      const stats = new Stats();
      stats.showPanel(0); // 0 = FPS, 1 = MS, 2 = MB
      stats.dom.style.position = "fixed";
      stats.dom.style.top      = "0px";
      stats.dom.style.right    = "0px";
      stats.dom.style.left     = "auto";
      stats.dom.style.zIndex   = "9999";
      document.body.appendChild(stats.dom);
      statsRef.current = stats;

      let rafId;
      const loop = () => {
        stats.begin();
        stats.end();
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);

      // Store cleanup
      statsRef.current._cleanup = () => {
        cancelAnimationFrame(rafId);
        document.body.removeChild(stats.dom);
      };
    };
    document.head.appendChild(script);

    return () => {
      statsRef.current?._cleanup?.();
    };
  }, []);

  return null; // renders nothing in the React tree
};

export default PerfMonitor;
