import { twMerge } from "tailwind-merge";
import React, { useEffect, useRef } from "react";

// ─── Cap DPR so canvas never renders beyond 2× resolution ───────────────────
const DPR = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2);

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const hexInt = parseInt(hex, 16);
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
}

export const Particles = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef          = useRef(null);
  const canvasContainerRef = useRef(null);
  const context            = useRef(null);
  const circles            = useRef([]);
  // ─── Use refs instead of useState — zero re-renders from mouse moves ────
  const mouse              = useRef({ x: 0, y: 0 });
  const canvasSize         = useRef({ w: 0, h: 0 });
  const rafID              = useRef(null);
  const resizeTimeout      = useRef(null);
  const isVisible          = useRef(false); // Intersection Observer flag
  const rgb                = hexToRgb(color);

  // ─── Intersection Observer — pause RAF when off-screen ──────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting && rafID.current === null) {
          rafID.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.01 }
    );
    if (canvasContainerRef.current) observer.observe(canvasContainerRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Main setup effect ───────────────────────────────────────────────────
  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    rafID.current = requestAnimationFrame(animate);

    // Passive mouse listener — ref update only, no setState
    const handleMouseMove = (event) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = event.clientX - rect.left - w / 2;
      const y = event.clientY - rect.top  - h / 2;
      if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    };

    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => initCanvas(), 200);
    };

    // passive: true — never blocks scroll compositing
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize",    handleResize,    { passive: true });

    return () => {
      if (rafID.current != null) {
        cancelAnimationFrame(rafID.current);
        rafID.current = null;
      }
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize",    handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  useEffect(() => { initCanvas(); }, [refresh]); // eslint-disable-line

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;

      canvasRef.current.width  = canvasSize.current.w * DPR;
      canvasRef.current.height = canvasSize.current.h * DPR;
      canvasRef.current.style.width  = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(DPR, DPR);

      circles.current = [];
      for (let i = 0; i < quantity; i++) {
        const circle = circleParams();
        drawCircle(circle);
      }
    }
  };

  const circleParams = () => {
    const { w, h } = canvasSize.current;
    return {
      x:           Math.floor(Math.random() * w),
      y:           Math.floor(Math.random() * h),
      translateX:  0,
      translateY:  0,
      size:        Math.floor(Math.random() * 2) + size,
      alpha:       0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx:          (Math.random() - 0.5) * 0.1,
      dy:          (Math.random() - 0.5) * 0.1,
      magnetism:   0.1 + Math.random() * 4,
    };
  };

  const drawCircle = (circle, update = false) => {
    if (!context.current) return;
    const { x, y, translateX, translateY, size: s, alpha } = circle;
    context.current.translate(translateX, translateY);
    context.current.beginPath();
    context.current.arc(x, y, s, 0, 2 * Math.PI);
    context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
    context.current.fill();
    context.current.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (!update) circles.current.push(circle);
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const drawParticles = () => {
    clearContext();
    for (let i = 0; i < quantity; i++) drawCircle(circleParams());
  };

  const remapValue = (value, s1, e1, s2, e2) => {
    const r = ((value - s1) * (e2 - s2)) / (e1 - s1) + s2;
    return r > 0 ? r : 0;
  };

  const animate = () => {
    // ── Stop loop when off-screen — resumes via IntersectionObserver ────
    if (!isVisible.current) {
      rafID.current = null;
      return;
    }

    clearContext();
    circles.current.forEach((circle, i) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge      = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));

      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }

      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      drawCircle(circle, true);

      if (
        circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        drawCircle(circleParams());
      }
    });

    rafID.current = requestAnimationFrame(animate);
  };

  return (
    <div
      className={twMerge("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
