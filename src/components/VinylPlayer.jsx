import { useLayoutEffect, useRef } from "react";
import { useMusic } from "../context/MusicContext";

const ALBUM_ART   = "/assets/cover.jpg";
const DEG_PER_MS  = 360 / 8000; // 1 full rotation per 8 seconds

export default function VinylPlayer() {
  const { playing, toggle } = useMusic();

  const discRef     = useRef(null);
  const rAFRef      = useRef(null);
  const angleRef    = useRef(0);
  const lastTimeRef = useRef(null);

  // ── rAF spin loop ────────────────────────────────────────────────────────
  const spinLoop = (timestamp) => {
    if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
    const delta = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    angleRef.current = (angleRef.current + DEG_PER_MS * delta) % 360;

    if (discRef.current) {
      discRef.current.style.transform =
        `translate3d(0,0,0) rotate(${angleRef.current}deg)`;
    }

    rAFRef.current = requestAnimationFrame(spinLoop);
  };

  const startSpin = () => {
    if (rAFRef.current) return;
    lastTimeRef.current = null;
    rAFRef.current = requestAnimationFrame(spinLoop);
  };

  const stopSpin = () => {
    if (rAFRef.current) {
      cancelAnimationFrame(rAFRef.current);
      rAFRef.current = null;
    }
  };

  // Keep disc spinning in sync with playing state
  if (playing) {
    startSpin();
  } else {
    stopSpin();
  }

  // Set initial transform on mount
  useLayoutEffect(() => {
    if (discRef.current) {
      discRef.current.style.transform =
        `translate3d(0,0,0) rotate(${angleRef.current}deg)`;
    }
    return () => stopSpin();
  }, []);

  return (
    <>
      {/* ── Widget wrapper ── */}
      <div
        onClick={toggle}
        title={playing ? "Pause music" : "Play music"}
        className="absolute z-[9999] cursor-pointer select-none right-2 top-[4.5rem] sm:right-5 sm:top-4"
        style={{
          width:      "120px",
          height:     "120px",
        }}
      >
        {/* Tonearm */}
        <div style={{
          position:        "absolute",
          top:             "4px",
          right:           "10px",
          width:           "65px",
          height:          "3px",
          background:      "linear-gradient(to right, #ffffff, #888888)",
          borderRadius:    "2px",
          transformOrigin: "right center",
          transform:       playing ? "rotate(-12deg)" : "rotate(18deg)",
          transition:      "transform 0.7s cubic-bezier(.4,0,.2,1)",
          zIndex:          3,
          boxShadow:       "0 1px 3px rgba(0,0,0,0.5)",
        }}>
          <span style={{ position:"absolute", right:"-5px", top:"-4px", width:"11px", height:"11px", borderRadius:"50%", background:"#aaaaaa", border: "1px solid #ffffff", boxShadow:"0 0 4px rgba(255,255,255,0.5)" }} />
          <span style={{ position:"absolute", left:"-5px",  top:"-4px", width:"11px", height:"11px", borderRadius:"50%", background:"#ffffff", border: "1px solid #dddddd", boxShadow:"0 0 4px rgba(255,255,255,0.8)" }} />
        </div>

        {/* ── Static clipper ── */}
        <div style={{
          position:     "absolute",
          bottom:       0,
          left:         0,
          width:        "106px",
          height:       "106px",
          borderRadius: "50%",
          overflow:     "hidden",
          boxShadow:    "0 6px 32px #0009, 0 0 0 3px #1a1a2e, 0 0 0 5px #2a2a4e",
        }}>
          {/* ── SPINNER ── */}
          <div
            ref={discRef}
            style={{
              width:                    "100%",
              height:                   "100%",
              background:               ALBUM_ART
                ? `url(${ALBUM_ART}) center/cover no-repeat`
                : "radial-gradient(circle at 55% 30%, #3a2a6e 0%, #0d0820 80%)",
              willChange:               "transform",
              backfaceVisibility:       "hidden",
              WebkitBackfaceVisibility: "hidden",
              transformOrigin:          "50% 50%",
            }}
          />
        </div>

        {/* ── Grooves overlay ── */}
        <div style={{
          position:      "absolute",
          bottom:        0,
          left:          0,
          width:         "106px",
          height:        "106px",
          borderRadius:  "50%",
          pointerEvents: "none",
          zIndex:        1,
          background:    "repeating-radial-gradient(circle at 50%, transparent 0px, transparent 6px, rgba(0,0,0,0.18) 7px, rgba(0,0,0,0.18) 8px)",
        }} />

        {/* ── Center hub ── */}
        <div style={{
          position:       "absolute",
          bottom:         "39px",
          left:           "39px",
          width:          "28px",
          height:         "28px",
          borderRadius:   "50%",
          background:     "radial-gradient(circle at 40% 35%, #444, #111)",
          border:         "2px solid #555",
          boxShadow:      "0 2px 8px #0006",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          pointerEvents:  "none",
          zIndex:         2,
        }}>
          <div style={{
            width:        "7px",
            height:       "7px",
            borderRadius: "50%",
            background:   "#000",
            border:       "1.5px solid #666",
          }} />
        </div>
      </div>
    </>
  );
}
