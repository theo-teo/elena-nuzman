"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import AcousticContour from "../ui/AcousticContour";
import { ArrowDown, Volume2 } from "lucide-react";

export default function HeroSection({
  onPlayPreview,
}: {
  onPlayPreview: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = registerGSAP();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 1.0, delay: 0.1 }
      )
        .fromTo(
          ".hero-script",
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2 },
          "-=0.6"
        )
        .fromTo(
          ".hero-title-main",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=0.8"
        )
        .fromTo(
          ".hero-contour",
          { opacity: 0, scaleX: 0.8 },
          { opacity: 1, scaleX: 1, duration: 1.4, ease: "power2.out" },
          "-=0.8"
        )
        .fromTo(
          ".hero-stage-card",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="overture"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-background px-5 pt-28 pb-12 md:px-12 md:pt-36 md:pb-16"
    >
      {/* Background Concert Spotlight Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/images/atmosphere/concert-hall-spotlight.png"
          alt="Concert Hall Spotlight"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-screen scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      </div>

      {/* Top Movement Tag */}
      <div className="hero-eyebrow mx-auto max-w-[1600px] w-full flex items-center justify-between text-muted border-b border-line/40 pb-4">
        <div className="flex items-center gap-2 font-mono text-[10px] md:text-[11px] uppercase tracking-cinematic text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
          <span>Movement I · The Overture</span>
        </div>
        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted/70">
          Robert Schumann Hochschule Alumni
        </span>
      </div>

      {/* Center Monumental Typography Lockup (Symphony of Vines Style) */}
      <div ref={heroContentRef} className="my-auto py-12 md:py-16 text-center max-w-5xl mx-auto w-full">
        {/* Calligraphic Flourish Script */}
        <span className="hero-script font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-accent/90 block mb-2 select-none">
          Between
        </span>

        {/* Monumental Architectural Headline */}
        <h1 className="hero-title-main font-serif text-[clamp(2.8rem,8.5vw,7.5rem)] font-light uppercase tracking-tight text-foreground leading-[0.92]">
          Silence &amp; Sound
        </h1>

        <p className="mt-4 font-mono text-[10px] sm:text-xs uppercase tracking-cinematic text-accent/80">
          Elena Nuzman · Concert Grand &amp; Four-Octave Vocalist
        </p>

        {/* Fine Acoustic Wave Contour Line */}
        <div className="hero-contour max-w-3xl mx-auto my-6 md:my-8">
          <AcousticContour />
        </div>

        <p className="font-sans text-xs sm:text-sm md:text-base font-light text-foreground/75 max-w-xl mx-auto leading-relaxed px-4">
          Some stories are written in words. Hers is written in music. An intimate journey through classical virtuosity and transcendent acoustic resonance.
        </p>

        {/* Responsive Dual Action Triggers */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#first-note"
            className="group inline-flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-6 py-3 font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-foreground hover:bg-accent hover:text-background transition-all duration-300"
          >
            <span>Explore The Movement</span>
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </a>

          <button
            type="button"
            onClick={onPlayPreview}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-6 py-3 font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-muted hover:text-foreground hover:border-accent transition-all duration-300"
          >
            <Volume2 className="h-3.5 w-3.5 text-accent group-hover:animate-pulse" />
            <span>Harmonic Resonance (432 Hz)</span>
          </button>
        </div>
      </div>

      {/* Bottom Curated Artwork Frame: Elena at the Steinway Grand (Uncut) */}
      <div className="hero-stage-card mx-auto max-w-4xl w-full">
        <div className="relative border border-line/60 bg-surface/40 p-3 sm:p-4 md:p-6 backdrop-blur-md">
          {/* Hairline Crosshairs in Corners */}
          <span className="absolute -top-1 -left-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
          <span className="absolute -top-1 -right-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
          <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
          <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-accent/60 leading-none">+</span>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* The Natural Portrait - Fitted and Framed, NEVER CUT OFF */}
            <div className="md:col-span-5 relative aspect-[3/4] max-h-[360px] md:max-h-[420px] w-full overflow-hidden bg-surface">
              <Image
                src="/images/real/elena-grand-1.jpg"
                alt="Elena Nuzman seated at the Steinway & Sons Concert Grand"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top transition-transform duration-1000 ease-out hover:scale-105"
              />
            </div>

            {/* Curated Editorial Metadata */}
            <div className="md:col-span-7 space-y-4">
              <div className="font-mono text-[10px] uppercase tracking-cinematic text-accent">
                Archival Exhibit · Movement I
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-light">
                The Sovereign Chamber
              </h2>
              <p className="font-sans text-xs sm:text-sm text-foreground/70 font-light leading-relaxed">
                Documented at the Steinway &amp; Sons D-274 concert grand. 88 hand-crafted keys, 243 acoustic tension strings, and a dynamic sensitivity spanning from whisper to thunderous fortissimo.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-line/40 font-mono text-[9px] uppercase tracking-widest text-muted">
                <span>D-274 · Robert Schumann Saal</span>
                <span className="text-accent">Opus 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
