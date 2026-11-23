"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import MagneticButton from "../ui/MagneticButton";
import { ArrowDown, Music } from "lucide-react";

export default function HeroSection({
  onPlayPreview,
}: {
  onPlayPreview: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = registerGSAP();
    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-meta",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.0, delay: 0.2 }
      )
        .fromTo(
          ".hero-title-line",
          { opacity: 0, y: 80, rotateX: -20 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.15 },
          "-=0.6"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.7"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.6"
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" },
          "-=1.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="overture"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-14 md:pb-20"
    >
      {/* Cinematic Theater Atmosphere Background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_75%_25%,_rgba(201,184,154,0.11)_0%,_rgba(21,20,22,0.6)_45%,_#09090b_85%)]" />

      {/* Subtle Burgundy Stage Flare */}
      <div className="pointer-events-none absolute left-10 top-24 -z-10 h-[500px] w-[500px] rounded-full bg-burgundy/15 blur-[160px]" />

      <div className="mx-auto w-full max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          {/* Left Column: Architectural Editorial Typography */}
          <div className="lg:col-span-7">
            <div className="hero-meta inline-flex items-center gap-3 border border-line bg-surface/80 px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-cinematic text-accent">
                Concert Pianist & 4-Octave Vocalist
              </span>
            </div>

            <h1
              ref={titleRef}
              className="mt-8 font-serif text-[clamp(3rem,8vw,8.5rem)] font-light leading-[0.92] tracking-tight text-foreground"
            >
              <span className="hero-title-line block">ELENA NUZMAN</span>
              <span className="hero-title-line block italic font-normal text-accent tracking-[-0.01em]">
                BETWEEN SILENCE
              </span>
              <span className="hero-title-line block uppercase tracking-tight text-foreground/90">
                &amp; SOUND.
              </span>
            </h1>

            <div className="hero-sub mt-8 max-w-xl border-l border-accent/40 pl-6">
              <p className="font-sans text-sm font-light leading-relaxed text-foreground/80 md:text-base">
                Some stories are written in words. Hers is written in music.
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                Robert Schumann Hochschule Düsseldorf Alumni · Master of Music
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <MagneticButton
                href="#first-note"
                variant="primary"
                className="hero-cta"
              >
                Explore The Story
                <ArrowDown className="h-3.5 w-3.5" />
              </MagneticButton>

              <MagneticButton
                onClick={onPlayPreview}
                variant="ghost"
                className="hero-cta"
              >
                <Music className="h-3.5 w-3.5 text-accent" />
                Listen To The Music
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame with Elena at the Concert Grand */}
          <div className="lg:col-span-5">
            <div
              ref={imageRef}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
            >
              <Image
                src="/images/real/elena-grand-1.jpg"
                alt="Elena Nuzman at the Steinway Concert Grand Piano"
                fill
                priority
                className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-line/50 pt-4 font-mono text-[10px] uppercase tracking-widest text-foreground/60">
                <span>Steinway &amp; Sons D-274</span>
                <span className="text-accent">Chapter 01 / 07</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
