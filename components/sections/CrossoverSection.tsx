"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import ChapterCard from "../ui/ChapterCard";
import AcousticContour from "../ui/AcousticContour";
import VoiceWave from "../VoiceWave";
import { Award, Volume2 } from "lucide-react";

export default function CrossoverSection({
  onPlayOctave,
}: {
  onPlayOctave: (freq: number) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeOctave, setActiveOctave] = useState(1);

  const OCTAVES = [
    {
      num: "01",
      name: "Contralto Resonance",
      range: "E3 — B3",
      hz: 164.81,
      timber: "Velvet Chest Depth",
      description: "Deep, resonant, grounding the Steinway bass strings with intimate warmth.",
    },
    {
      num: "02",
      name: "Mezzo-Soprano Core",
      range: "C4 — B4",
      hz: 261.63,
      timber: "Storytelling Register",
      description: "Lyrical melodic clarity, conveying romantic lieder and classical nuance.",
    },
    {
      num: "03",
      name: "Dramatic Soprano",
      range: "C5 — B5",
      hz: 523.25,
      timber: "Symphonic Power Belting",
      description: "Piercing effortlessly through full orchestra fortissimos and stadium arena acoustics.",
    },
    {
      num: "04",
      name: "Flageolet Stratosphere",
      range: "C6 — E7",
      hz: 1046.5,
      timber: "Whistle Altitude",
      description: "Rare acoustic altitude far above traditional soprano registers, crystalline and pure.",
    },
  ];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = registerGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".crossover-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="crossover"
      className="relative w-full border-t border-line/40 py-24 sm:py-32 md:py-40 px-5 md:px-12 bg-background"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line/40 pb-8">
          <ChapterCard
            chapter="Chapter 04"
            italicPrefix="The"
            title="Acoustic Compass"
            subtitle="Classical Meets Contemporary. Four octaves bridging sacred scores and arena rock."
          />
          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted/70">
            Vocal Range · E3 (164 Hz) to E7 (2637 Hz)
          </div>
        </div>

        {/* Monumental Kinetic Statement */}
        <div className="crossover-heading my-16 md:my-24 max-w-4xl">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-cinematic text-accent mb-4">
            Artistic Manifesto
          </p>
          <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-foreground leading-[1.05]">
            “Some boundaries were never meant to be heard.”
          </h3>
          <p className="mt-6 font-sans text-sm sm:text-base font-light text-foreground/75 leading-relaxed max-w-2xl">
            Conservatory purists draw walls between classical concert grands and popular music. Elena dismantles those walls. Her four-octave voice commands the stage while her hands execute Lisztian virtuosity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Interactive 4-Octave Acoustic Compass */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-line/60 bg-surface/30 p-4 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-line/40 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-cinematic text-accent">
                  Interactive Vocal Spectrum
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                  Click Register to Synthesize
                </span>
              </div>

              {/* Dynamic Waveform Display */}
              <div className="py-6 border-b border-line/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <VoiceWave active={true} />
                  <div>
                    <p className="font-serif text-lg text-foreground">
                      {OCTAVES[activeOctave].name}
                    </p>
                    <p className="font-mono text-[10px] text-accent">
                      Fundamental: {OCTAVES[activeOctave].hz} Hz · {OCTAVES[activeOctave].range}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onPlayOctave(OCTAVES[activeOctave].hz)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-background transition"
                  aria-label="Play acoustic tone"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              {/* Octave Registers (Editorial Linear Flow, No Clunky Cards) */}
              <div className="divide-y divide-line/30 pt-2">
                {OCTAVES.map((oct, idx) => {
                  const isSelected = activeOctave === idx;
                  return (
                    <button
                      key={oct.num}
                      type="button"
                      onClick={() => {
                        setActiveOctave(idx);
                        onPlayOctave(oct.hz);
                      }}
                      className={`group w-full py-4 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors ${
                        isSelected ? "text-accent" : "text-foreground hover:text-accent"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-accent/80 font-medium">
                          {oct.num}
                        </span>
                        <div>
                          <p className="font-serif text-base sm:text-lg font-light">
                            {oct.name}
                          </p>
                          <p className="font-sans text-xs text-muted font-light">
                            {oct.description}
                          </p>
                        </div>
                      </div>
                      <div className="font-mono text-[11px] text-muted group-hover:text-accent text-right shrink-0">
                        <span>{oct.range}</span>
                        <span className="block text-[9px] opacity-70">{oct.hz} Hz</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Uncut Photographs (Award + Concert Grand) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Elena with IMPALA Silver Award (Preserved in full vertical ratio, NEVER cropped) */}
            <div className="relative border border-line/60 bg-surface/30 p-4 backdrop-blur-sm mx-auto max-w-sm lg:max-w-none">
              <span className="absolute -top-1 -left-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
              <span className="absolute -top-1 -right-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
              <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
              <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-accent/60 leading-none">+</span>

              <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
                <Image
                  src="/images/real/elena-impala-award.jpg"
                  alt="Elena Nuzman with IMPALA Silver Award"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>

              <div className="mt-3 pt-3 border-t border-line/40 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-muted">
                <span className="inline-flex items-center gap-1.5 text-accent">
                  <Award className="h-3 w-3" />
                  IMPALA Silver Award
                </span>
                <span>Liebesträume · 5M+ Streams</span>
              </div>
            </div>

            {/* Concert Stage Visual */}
            <div className="relative border border-line/60 bg-surface/30 p-4 backdrop-blur-sm mx-auto max-w-sm lg:max-w-none">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                <Image
                  src="/images/real/elena-grand-5.jpg"
                  alt="Elena Nuzman commanding piano and vocal performance"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <div className="mt-3 pt-3 border-t border-line/40 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-muted">
                <span>Dual Artistry</span>
                <span className="text-accent">Live Performance</span>
              </div>
            </div>
          </div>
        </div>

        <AcousticContour className="mt-16" />
      </div>
    </section>
  );
}
