"use client";

import { useRef, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";
import HeroSection from "@/components/sections/HeroSection";
import BiographySection from "@/components/sections/BiographySection";
import PianoStorySection from "@/components/sections/PianoStorySection";
import CrossoverSection from "@/components/sections/CrossoverSection";
import MusicSection from "@/components/sections/MusicSection";
import StageSection from "@/components/sections/StageSection";
import FinaleSection from "@/components/sections/FinaleSection";

export default function Home() {
  const [soundOn, setSoundOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio Synthetic Piano Resonator (Native browser harmonic generator)
  const playHarmonics = (baseFreq = 207.65) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();

      // Warm acoustic grand piano harmonic series
      const intervals = [1, 1.25, 1.498, 2, 2.5];
      intervals.forEach((ratio, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(baseFreq * ratio, ctx.currentTime + idx * 0.04);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.14 / (idx + 1), ctx.currentTime + 0.06 + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.04);
        osc.stop(ctx.currentTime + 4.0);
      });
      setSoundOn(true);
    } catch {
      setSoundOn(true);
    }
  };

  const toggleSound = () => {
    if (!soundOn) {
      playHarmonics(207.65); // Liszt Liebestraum Ab3
    } else {
      setSoundOn(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-accent selection:text-background">
      {/* Precision Scroll Progress */}
      <ScrollProgress />

      {/* Persistent Philharmonic Navigation */}
      <Header soundOn={soundOn} onToggleSound={toggleSound} />

      {/* Chapter 01 — The Overture */}
      <HeroSection onPlayPreview={() => playHarmonics(207.65)} />

      {/* Chapter 02 — The First Note */}
      <BiographySection />

      {/* Chapter 03 — The Art of Piano */}
      <PianoStorySection />

      {/* Chapter 04 — Breaking the Score */}
      <CrossoverSection onPlayOctave={playHarmonics} />

      {/* Chapter 05 — The Music */}
      <MusicSection onPlayTrack={playHarmonics} />

      {/* Chapter 06 — The Stage */}
      <StageSection />

      {/* Chapter 07 — The Finale */}
      <FinaleSection />

      {/* Minimalist Concert Footer */}
      <Footer />
    </div>
  );
}
