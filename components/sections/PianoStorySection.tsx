"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import SectionLabel from "../ui/SectionLabel";

export default function PianoStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = registerGSAP();
    const ctx = gsap.context(() => {
      const pinEl = pinSectionRef.current;
      if (!pinEl) return;

      const panels = gsap.utils.toArray<HTMLElement>(".piano-story-step");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          pin: true,
          scrub: 1.0,
          start: "top top",
          end: `+=${panels.length * 900}`,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return; // First step visible by default
        tl.fromTo(
          panel,
          { opacity: 0, y: 60, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const STEPS = [
    {
      step: "01",
      title: "Twelve Thousand Components",
      heading: "The Sovereign Anatomy",
      body: "A concert grand is a cathedral of physics. Twelve thousand moving parts of hornbeam, felt, brass, and Bavarian spruce. Under Elena's fingers, the sheer weight of mechanical friction dissolves into effortless velocity.",
      stat: "88 Keys · 243 Tension Strings",
      image: "/images/real/elena-grand-2.jpg",
    },
    {
      step: "02",
      title: "The Velocity of Touch",
      heading: "From Whisper to Thunder",
      body: "Every felt hammer strike is calibrated down to the gram. The touch shifts seamlessly from a pianissimo breath that hangs suspended in silence to an orchestral fortissimo that shakes the auditorium.",
      stat: "Dynamic Range: 20 dB — 110 dB",
      image: "/images/real/elena-grand-3.jpg",
    },
    {
      step: "03",
      title: "The Soundboard Resonance",
      heading: "Where Bone Meets Bronze",
      body: "The instrument does not stop at the fingertips. It vibrates through bone, breath, and thought. It is the acoustic chamber where Franz Liszt's romantic complexity finds its sovereign modern voice.",
      stat: "Cast Iron Plate · 20 Tons of Tension",
      image: "/images/real/elena-grand-4.jpg",
    },
  ];

  return (
    <div ref={containerRef} id="piano-story" className="relative border-t border-line">
      {/* Pinned Cinematic Stage */}
      <section
        ref={pinSectionRef}
        className="relative h-screen w-full overflow-hidden bg-background px-6 md:px-14 flex flex-col justify-center"
      >
        <div className="mx-auto w-full max-w-[1600px] h-full flex flex-col justify-between py-12 md:py-20">
          {/* Top Section Header */}
          <div className="flex items-center justify-between border-b border-line pb-6">
            <SectionLabel chapter="Chapter 03" title="The Art of Piano" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Theme · Where discipline becomes expression
            </span>
          </div>

          {/* Central Layered Story Presentation */}
          <div className="relative flex-1 my-auto flex items-center">
            {STEPS.map((step, idx) => (
              <div
                key={step.step}
                className={`piano-story-step absolute inset-0 flex flex-col justify-center ${
                  idx === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                  {/* Left: Architectural Story Card */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-accent">{step.step}</span>
                      <span className="h-px w-8 bg-accent/40" />
                      <span className="font-mono text-xs uppercase tracking-widest text-muted">
                        {step.title}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl font-light sm:text-5xl md:text-6xl text-foreground leading-[1.02]">
                      {step.heading}
                    </h3>

                    <p className="font-sans text-sm font-light leading-relaxed text-foreground/75 md:text-base max-w-xl">
                      {step.body}
                    </p>

                    <div className="pt-4 border-t border-line font-mono text-xs uppercase tracking-widest text-accent">
                      {step.stat}
                    </div>
                  </div>

                  {/* Right: Authentic Macro Visual Frame */}
                  <div className="lg:col-span-6">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
                      <Image
                        src={step.image}
                        alt={step.heading}
                        fill
                        className="object-cover object-center transition-transform duration-1000 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-6 right-6 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
                        <span>Steinway Acoustic Chamber</span>
                        <span>0{idx + 1} of 03</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Scrubbing Indicator */}
          <div className="border-t border-line pt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
            <span>Scroll slowly to traverse the instrument</span>
            <span className="text-accent">ScrollTrigger Scrubbed Pin</span>
          </div>
        </div>
      </section>
    </div>
  );
}
