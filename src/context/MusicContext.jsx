import { createContext, useContext, useEffect, useRef, useState } from "react";

const AUDIO_SRC  = "/audio/music.mp3";
const FADE_STEPS = 20;
const FADE_MS    = 20;

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const audioRef    = useRef(null);
  const fadeTimer   = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Create the Audio element once, for the entire app lifetime
  useEffect(() => {
    const audio      = new Audio(AUDIO_SRC);
    audio.loop       = true;
    audio.volume     = 0;
    audio.preload    = "auto";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (!audio.duration) return;
      setProgress(audio.currentTime / audio.duration);
    };
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended",      onEnded);

    // ⚠️  NO visibilitychange listener — music must keep playing when minimised

    return () => {
      audio.pause();
      clearInterval(fadeTimer.current);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended",      onEnded);
    };
  }, []);

  const fadeIn = (audio) => {
    clearInterval(fadeTimer.current);
    audio.volume = 0;
    let step = 0;
    fadeTimer.current = setInterval(() => {
      step++;
      audio.volume = Math.min(0.5, (step / FADE_STEPS) * 0.5);
      if (step >= FADE_STEPS) clearInterval(fadeTimer.current);
    }, FADE_MS);
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      clearInterval(fadeTimer.current);
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        fadeIn(audio);
        setPlaying(true);
      } catch (err) {
        console.warn("Autoplay blocked:", err.message);
      }
    }
  };

  return (
    <MusicContext.Provider value={{ playing, progress, toggle }}>
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
