"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import ChapterCard from "../ui/ChapterCard";
import AcousticContour from "../ui/AcousticContour";

export default function PianoStorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const PIANO_MOVEMENTS = [
    {
      num: "I",
      tag: "The Architecture of Touch",
      headline: "Twelve Thousand Components",
      description:
        "A concert grand is a cathedral of physics. Twelve thousand moving parts of hornbeam, felt, brass, and Bavarian spruce. Under Elena's fingers, the mechanical friction dissolves into pure acoustic velocity.",
      spec: "88 Keys · 243 Tension Strings · 20 Tons of Pressure",
      image: "/images/atmosphere/piano-hands-keys.png",
      alt: "Pianist fingers curved over Steinway & Sons ivory keys",
      aspectRatio: "aspect-[4/3] md:aspect-[16/10]",
      objectPosition: "object-center",
    },
    {
      num: "II",
      tag: "Acoustic Reflection",
      headline: "The Mirror of the Lid",
      description:
        "The angled lacquer lid directs sonic energy outward into the concert hall. Every nuance of touch is mirrored both visually in the high-gloss black finish and sonically across the auditorium.",
      spec: "Cast Iron Harp · Bavarian Spruce Soundboard",
      image: "/images/real/elena-grand-2.jpg",
      alt: "Reflections in the Steinway concert grand lacquer lid",
      aspectRatio: "aspect-[16/10] md:aspect-[3/2]",
      objectPosition: "object-center",
    },
    {
      num: "III",
      tag: "Dynamic Sovereignty",
      headline: "From Pianissimo to Thunder",
      description:
        "Every hammer strike is calibrated down to the gram. The touch shifts seamlessly from a 20 dB breath that hangs suspended in silence to an orchestral fortissimo exceeding 110 dB that commands a hundred-piece philharmonic.",
      spec: "Dynamic Range: 20 dB — 110 dB · Concert D-274",
      image: "/images/real/elena-grand-1.jpg",
      alt: "Elena Nuzman at the concert grand",
      aspectRatio: "aspect-[3/4] md:aspect-[4/5]",
      objectPosition: "object-top",
    },
  ];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = registerGSAP();
    const ctx = gsap.context(() => {
      // Fade in each movement smoothly on scroll
      const items = gsap.utils.toArray<HTMLElement>(".piano-movement-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="piano-story"
      className="relative w-full border-t border-line/40 py-24 sm:py-32 md:py-40 px-5 md:px-12 bg-background"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Unseen Studio Style Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line/40 pb-8">
          <ChapterCard
            chapter="Chapter 03"
            italicPrefix="The"
            title="Art of Piano"
            subtitle="Where discipline becomes expression. Deconstructing the sovereign instrument."
          />
          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted/70">
            Steinway &amp; Sons D-274 Masterclass
          </div>
        </div>

        {/* Narrative Movement Progression (Uncluttered, Uncropped, Mobile-Responsive) */}
        <div className="mt-16 space-y-24 md:space-y-36">
          {PIANO_MOVEMENTS.map((mov, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={mov.num}
                className="piano-movement-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* Visual Exhibit Column (Never Cropped, Proportional Frame) */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative border border-line/60 bg-surface/30 p-3 sm:p-4 md:p-6 backdrop-blur-sm">
                    {/* Corner Crosshairs */}
                    <span className="absolute -top-1 -left-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
                    <span className="absolute -top-1 -right-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
                    <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
                    <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-accent/60 leading-none">+</span>

                    <div className={`relative w-full ${mov.aspectRatio} overflow-hidden bg-surface`}>
                      <Image
                        src={mov.image}
                        alt={mov.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 750px"
                        className={`object-cover ${mov.objectPosition} transition-transform duration-1000 ease-out hover:scale-105`}
                      />
                    </div>

                    <div className="mt-3 pt-3 border-t border-line/40 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-muted">
                      <span>Movement {mov.num}</span>
                      <span className="text-accent">{mov.tag}</span>
                    </div>
                  </div>
                </div>

                {/* Narrative Typography Column */}
                <div
                  className={`lg:col-span-5 space-y-5 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-accent">Movement {mov.num}</span>
                    <span className="h-px w-8 bg-accent/40" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      {mov.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-[1.05]">
                    {mov.headline}
                  </h3>

                  <p className="font-sans text-sm sm:text-base font-light text-foreground/75 leading-relaxed">
                    {mov.description}
                  </p>

                  <div className="pt-4 border-t border-line/40 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent">
                    {mov.spec}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <AcousticContour className="mt-20" />
      </div>
    </section>
  );
}
