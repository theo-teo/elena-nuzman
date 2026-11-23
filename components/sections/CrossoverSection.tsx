"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import SectionLabel from "../ui/SectionLabel";
import VoiceWave from "../VoiceWave";

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
      name: "1st Octave",
      range: "E3 — B3",
      timber: "Contralto / Chest Resonance",
      hz: 164.81,
      desc: "Deep, dark, velvety chest timber. Grounding the Steinway bass strings.",
    },
    {
      num: "02",
      name: "2nd Octave",
      range: "C4 — B4",
      timber: "Mezzo-Soprano / Speech Register",
      hz: 261.63,
      desc: "Lyrical melodic clarity. The core storytelling range of romantic lieder.",
    },
    {
      num: "03",
      name: "3rd Octave",
      range: "C5 — B5",
      timber: "Dramatic Soprano / Power Belting",
      hz: 523.25,
      desc: "The rock crossover explosion. Piercing through full symphonic fortissimos.",
    },
    {
      num: "04",
      name: "4th Octave",
      range: "C6 — E7",
      timber: "Flageolet & Whistle Stratosphere",
      hz: 1046.5,
      desc: "Rare operatic altitude. Reaching crystalline frequencies far above concert soprano limits.",
    },
  ];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = registerGSAP();
    const ctx = gsap.context(() => {
      // Kinetic statement reveal
      gsap.fromTo(
        ".crossover-statement",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".crossover-statement",
            start: "top 80%",
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
      className="relative border-t border-line py-36 px-6 md:px-14 bg-surface/40 overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel chapter="Chapter 04" title="Breaking the Score" />

        {/* Large Statement Headline */}
        <div className="crossover-statement mt-12 max-w-5xl">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Theme · Classical Meets Contemporary
          </span>
          <h2 className="mt-6 font-serif text-[clamp(2.5rem,6vw,6.5rem)] font-light leading-[0.96] text-foreground tracking-tight">
            “SOME BOUNDARIES WERE NEVER MEANT TO BE HEARD.”
          </h2>
          <p className="mt-8 font-sans text-sm font-light leading-relaxed text-foreground/75 md:text-base max-w-2xl">
            Classical concert halls demand restraint. Stadium rock demands total surrender. Elena Nuzman commands both simultaneously. With an extraordinary vocal range spanning four full octaves, she accompanies herself live on the concert grand, dissolving the partition between Franz Liszt and stadium rock.
          </p>
        </div>

        {/* Split Layout: 4-Octave Acoustic Visualizer + Live Photo */}
        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Interactive 4-Octave Compass */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl border border-line bg-background/80 p-8 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-xs uppercase tracking-widest text-accent">
                <span>The 4-Octave Acoustic Register</span>
                <span className="text-muted">E3 to E7</span>
              </div>

              {/* Dynamic Soundwave */}
              <div className="py-8">
                <VoiceWave fallback={0.8} height={90} />
              </div>

              {/* Octave Selector Tiles */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-line">
                {OCTAVES.map((oct, idx) => (
                  <button
                    key={oct.num}
                    type="button"
                    onClick={() => {
                      setActiveOctave(idx);
                      onPlayOctave(oct.hz);
                    }}
                    className={`rounded-xl border p-4 text-left transition ${
                      activeOctave === idx
                        ? "border-accent bg-accent/10 shadow-[0_0_15px_rgba(201,184,154,0.25)]"
                        : "border-line bg-surface/50 hover:border-accent/40"
                    }`}
                  >
                    <div className="flex justify-between font-mono text-[10px] text-accent">
                      <span>{oct.num}</span>
                      <span>{oct.range}</span>
                    </div>
                    <p className="mt-2 font-serif text-lg text-foreground">{oct.name}</p>
                    <p className="mt-1 font-mono text-[10px] text-muted">{oct.timber}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase text-muted">
                <span>Click any register to trigger frequency resonance</span>
                <span className="text-accent">Live Harmonic Synthesizer</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Stage Photo */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
              <Image
                src="/images/real/elena-grand-5.jpg"
                alt="Elena Nuzman vocal and piano performance"
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Dual Mastery
                </span>
                <p className="mt-1 font-serif text-2xl italic text-foreground">
                  Singing live while commanding the Steinway grand
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
