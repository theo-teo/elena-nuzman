"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export interface HeroSlide {
  id: string;
  title: string;
  location: string;
  tag: string;
  img: string;
  quote: string;
  year: string;
  freq: number;
}

export const SLIDES: HeroSlide[] = [
  {
    id: "grand-virtuoso",
    title: "Concert Grand & Vocal Radiance",
    location: "Düsseldorf · Robert Schumann Hochschule",
    tag: "Diplom-Konzertpianistin",
    img: "/images/real/elena-grand-1.jpg",
    quote: "«The concert grand is not just an instrument. It is an extension of bone, thought, and breath.»",
    year: "Master Degree",
    freq: 207.65, // Ab3
  },
  {
    id: "grand-motion",
    title: "The Velocity of Touch",
    location: "Steinway & Sons · 88 Keys",
    tag: "Acoustic Discipline",
    img: "/images/real/elena-grand-2.jpg",
    quote: "«Twelve thousand moving parts dissolve into pure acoustic vulnerability.»",
    year: "88 Keys",
    freq: 174.61, // F3
  },
  {
    id: "brandenburg",
    title: "Live at the Brandenburg Gate",
    location: "Berlin Silvester · Millions Broadcast",
    tag: "Symphonic Rock Headline",
    img: "/images/real/elena-brandenburger-tor.jpg",
    quote: "«Classical discipline meets the triumphant ecstasy of stadium rock.»",
    year: "Live NYE",
    freq: 293.66, // D4
  },
  {
    id: "impala",
    title: "IMPALA Silver Award Laureate",
    location: "Liebesträume · Franz Liszt Crossover",
    tag: "Over 5 Million Streams",
    img: "/images/real/elena-impala-award.jpg",
    quote: "«When Liszt’s romantic nocturne unites with four octaves of vocal crescendo.»",
    year: "Silver Award",
    freq: 261.63, // C4
  },
];

export default function EmotionHero({
  onPlayChord,
  soundOn,
}: {
  onPlayChord: (freq: number) => void;
  soundOn: boolean;
}) {
  const [active, setActive] = useState(0);
  const s = SLIDES[active];

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrollY > innerHeight * 0.5) return;
      if (e.key === "ArrowRight") setActive((prev) => (prev + 1) % SLIDES.length);
      if (e.key === "ArrowLeft")
        setActive((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-[#050506] text-paper">
      {/* Layered Real Photo Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative h-full w-full">
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              priority={i === 0}
              className={`h-full w-full object-cover object-center transition-transform duration-[2000ms] ease-out ${
                i === active ? "scale-100" : "scale-105"
              }`}
            />
          </div>
        </div>
      ))}

      {/* Cinematic Vignette Overlays matching private-studio codex */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/20 to-black/60"
      />

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between px-6 pb-8 pt-28 sm:px-10 sm:pb-10 sm:pt-32 lg:px-16">
        {/* Top Meta & Mixed Headline */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="ag-dot" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-paper/80">
                Elena Nuzman · Authentic Concert Grand & 4 Octaves
              </span>
            </div>

            <h1 className="mt-6 text-[clamp(2.8rem,7.5vw,7.8rem)] font-light leading-[0.94] tracking-[-0.04em] text-paper">
              A CONCERT GRAND.<br />
              <span className="font-serif italic font-normal tracking-[-0.02em] text-[#d4af37]">
                Four octaves.
              </span><br />
              PURE GRAVITY.
            </h1>
          </div>

          <div className="max-w-xs md:pt-4">
            <p className="font-sans text-sm font-light leading-relaxed text-paper/85 sm:text-base">
              {s.quote}
            </p>
            <div className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-[#d4af37]">
              <span>{s.location}</span>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Thumbnail Selector & Meta Bar */}
        <div className="flex flex-col gap-6">
          <div className="flex items-end gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  setActive(i);
                  onPlayChord(slide.freq);
                }}
                className="group flex shrink-0 flex-col items-center gap-2"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-opacity duration-300 ${
                    i === active ? "bg-[#d4af37] opacity-100 shadow-[0_0_8px_#d4af37]" : "bg-paper/40 opacity-40 group-hover:opacity-75"
                  }`}
                />
                <span
                  className={`block h-14 w-14 overflow-hidden rounded-full border transition sm:h-18 sm:w-18 ${
                    i === active
                      ? "border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                      : "border-paper/20 opacity-60 group-hover:opacity-100"
                  }`}
                >
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="h-full w-full object-cover object-center"
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-5 font-mono text-xs uppercase tracking-widest text-paper/60">
            <div className="flex items-center gap-4">
              <span className="text-paper">{s.title}</span>
              <span className="hidden text-paper/40 sm:inline">·</span>
              <span className="hidden text-[#d4af37] sm:inline">{s.year}</span>
            </div>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => onPlayChord(s.freq)}
                className="inline-flex items-center gap-2 text-paper hover:text-[#d4af37] transition"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${soundOn ? "bg-[#d4af37] animate-ping" : "bg-paper/50"}`} />
                {soundOn ? "Resonating Chord" : "Experience Sound"}
              </button>

              <a
                href="#manifest"
                className="underline underline-offset-4 text-paper/70 hover:text-paper transition"
              >
                Scroll Story ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
