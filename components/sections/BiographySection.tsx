"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import SectionLabel from "../ui/SectionLabel";
import TextReveal from "../motion/TextReveal";
import { ARTIST } from "@/content/artist";

export default function BiographySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = registerGSAP();
    const ctx = gsap.context(() => {
      // Parallax scroll on portrait
      gsap.fromTo(
        imageRef.current,
        { y: 60 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="first-note"
      className="relative border-t border-line py-36 px-6 md:px-14 bg-surface/30"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Section Label */}
        <SectionLabel chapter="Chapter 02" title="The First Note" />

        <div className="mt-8 grid gap-16 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Portrait Visual */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
            >
              <Image
                src="/images/real/elena-portrait-schloss.jpg"
                alt="Elena Nuzman Portrait"
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Heritage &amp; Lineage
                </span>
                <p className="mt-1 font-serif text-xl italic text-foreground">
                  Born into a classical music dynasty
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Editorial Biography */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Theme · Every extraordinary story begins somewhere.
            </span>

            <h2 className="mt-6 font-serif text-3xl font-light leading-snug sm:text-5xl md:text-6xl text-foreground">
              <TextReveal
                text="The discipline was inherited. The voice was an awakening."
                as="span"
              />
            </h2>

            <div className="mt-8 space-y-6 font-sans text-sm font-light leading-relaxed text-foreground/75 md:text-base max-w-2xl">
              <p>
                Elena Nuzman was born in 1981 in Moldova to two celebrated artists: her mother, the concert pianist Nina Kvasowa, and her father, the violin virtuoso and actor Josef Nuzman. Before learning to read alphabet or sheet music, she sat before the keyboard at age two, playing intricate classical melodies entirely by ear.
              </p>
              <p>
                Admitted at age seven to the elite state lyceum for musically gifted prodigies, she spent her youth immersed in the profound rigor of Russian, French, and German classical traditions. By age seventeen, she had already toured major concert halls as an international solo prodigy.
              </p>
              <p>
                Her journey culminated in Germany at the prestigious Robert Schumann Hochschule Düsseldorf, where she attained the highest state degree in piano performance: Master of Music / Diplom-Konzertpianistin.
              </p>
            </div>

            {/* Structured Milestone Grid */}
            <div className="mt-12 grid gap-6 sm:grid-cols-3 border-t border-line pt-8">
              {ARTIST.milestones.slice(0, 3).map((item, i) => (
                <div key={i} className="border-l border-accent/30 pl-4">
                  <span className="font-mono text-xs text-accent">{item.year}</span>
                  <h3 className="mt-1 font-serif text-lg text-foreground">{item.title}</h3>
                  <p className="mt-2 text-xs font-light text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
