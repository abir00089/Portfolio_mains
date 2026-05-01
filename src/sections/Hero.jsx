import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, useRef, useEffect, useState } from "react";
import Loader from "../components/Loader";

// ─── Camera rig — smoothly tracks mouse ────────────────────────────────────
function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const containerRef = useRef(null);
  // frameloop switches to "never" when hero is off-screen → zero GPU load
  const [frameloop, setFrameloop] = useState("always");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? "always" : "never"),
      { threshold: 0.01 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
      id="home"
    >
      <HeroText />
      <ParallaxBackground />
      <figure
        ref={containerRef}
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          // ─── DPR capped at [1, 1.5] — huge win on Retina/4K screens ────
          dpr={[1, 1.5]}
          camera={{ position: [0, 1, 3] }}
          frameloop={frameloop}
          gl={{
            powerPreference: "high-performance",
            // antialias off — stylised character doesn't need it, saves GPU
            antialias: false,
            // Disable expensive post-processing passes
            alpha: true,
          }}
          // R3F adaptive performance — auto-reduces quality under load
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile ? 0.23 : undefined}
                position={isMobile ? [0, -1.5, 0] : undefined}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
