import React, { lazy, Suspense, useState } from "react";
import Navbar from "./sections/navbar";
import Hero from "./sections/Hero";
import VinylPlayer from "./components/VinylPlayer";
import useSmoothScroll from "./hooks/useSmoothScroll";
import NewAboutPage from "./sections/NewAboutPage";
import { MusicProvider } from "./context/MusicContext";

// ─── Lazy-load all below-the-fold sections ──────────────────────────────────
const About       = lazy(() => import("./sections/About"));
const Projects    = lazy(() => import("./sections/Projects"));
const Connect     = lazy(() => import("./sections/Connect"));
const Experiences = lazy(() => import("./sections/Experiences"));
const Testimonial = lazy(() => import("./sections/Testimonial"));
const Contact     = lazy(() => import("./sections/Contact"));
const Footer      = lazy(() => import("./sections/Footer"));

const SectionFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
  </div>
);

const App = () => {
  useSmoothScroll(); // buttery smooth inertia scroll across the whole site
  const [showNewAbout, setShowNewAbout] = useState(false);

  return (
    // MusicProvider wraps EVERYTHING so the Audio object is never destroyed
    <MusicProvider>
      {showNewAbout ? (
        <NewAboutPage onBack={() => setShowNewAbout(false)} />
      ) : (
        <div className="container mx-auto max-w-7xl">
          <Navbar onOpenAbout={() => setShowNewAbout(true)} />
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Connect />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Experiences />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Testimonial />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Footer />
          </Suspense>
        </div>
      )}

      {/* VinylPlayer is ALWAYS mounted — lives outside the page swap so music never stops */}
      <VinylPlayer />
    </MusicProvider>
  );
};

export default App;
