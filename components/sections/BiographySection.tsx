"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import ChapterCard from "../ui/ChapterCard";
import AcousticContour from "../ui/AcousticContour";
import { ARTIST } from "@/content/artist";

export default function BiographySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = registerGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
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
      id="first-note"
      className="relative w-full border-t border-line/40 py-24 sm:py-32 md:py-40 px-5 md:px-12 bg-background"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Chapter Title Lockup (Unseen Studio Typography) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line/40 pb-8">
          <ChapterCard
            chapter="Chapter 02"
            italicPrefix="The"
            title="First Note"
            subtitle="Every extraordinary sound begins in silence. Moldavia to Robert Schumann Hochschule."
          />
          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted/70">
            Biographical Archival Record · 1981 — Present
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Natural Editorial Portrait (100% Uncropped, Museum Matted) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative border border-line/60 bg-surface/30 p-3 sm:p-4 backdrop-blur-sm mx-auto max-w-md lg:max-w-none"
            >
              {/* Corner crosshairs */}
              <span className="absolute -top-1 -left-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
              <span className="absolute -top-1 -right-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
              <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
              <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-accent/60 leading-none">+</span>

              <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
                <Image
                  src="/images/real/elena-grand-4.jpg"
                  alt="Elena Nuzman in concert dress at the grand piano"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                  className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>

              {/* Museum Footnote */}
              <div className="mt-4 pt-3 border-t border-line/40 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-muted">
                <span>Solitary Concentration</span>
                <span className="text-accent">Archiv Nuzman</span>
              </div>
            </div>

            {/* Secondary Historical Portrait: Schloss Burg */}
            <div className="mt-8 border border-line/40 bg-surface/20 p-4 flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line">
                <Image
                  src="/images/real/elena-portrait-schloss.jpg"
                  alt="Elena Nuzman Portrait Schloss Burg"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Historic Residency
                </p>
                <p className="font-serif text-sm text-foreground">
                  Schloss Burg Chamber Concerts
                </p>
                <p className="font-sans text-[11px] text-muted font-light">
                  Classical solo recitals &amp; romantic repertory
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Verified Milestones */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-10">
            {/* The Manifest Statement */}
            <blockquote className="border-l-2 border-accent/60 pl-6 sm:pl-8 space-y-3">
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-foreground leading-[1.2]">
                “At age two, I could not yet read music, but my hands found the melodies before my mind understood their structure.”
              </p>
              <footer className="font-mono text-[10px] uppercase tracking-widest text-accent">
                — Elena Nuzman · Conservatory Recollection
              </footer>
            </blockquote>

            <div className="space-y-6 font-sans text-sm sm:text-base font-light text-foreground/80 leading-relaxed max-w-2xl">
              <p>
                Born in 1981 into a lineage of Moldavian concert soloists — daughter to concert pianist Nina Kvasowa and violinist Josef Nuzman — Elena’s musical intuition preceded formal speech. By age seven, she was admitted to the elite Special Music Lyceum for musically gifted prodigies in Chișinău.
              </p>
              <p>
                Her journey carried her to Germany, completing her Master’s Diploma as a concert pianist at the renowned <span className="text-foreground font-normal">Robert Schumann Hochschule Düsseldorf</span> under premier European conservatory masters.
              </p>
              <p>
                Yet Elena never allowed her virtuosity to be confined to historical museum scores. In parallel to mastering Franz Liszt and Frédéric Chopin, she discovered an extraordinary natural vocal gift: a <span className="text-accent font-normal">four-octave singing compass</span> spanning from rich velvet contralto depths to flageolet stratosphere.
              </p>
            </div>

            {/* Verified Chronological Timeline (Editorial Layout, No Crammed Cards) */}
            <div className="pt-6 border-t border-line/40 space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-cinematic text-accent">
                Key Artistic Milestones
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ARTIST.milestones.map((item) => (
                  <div
                    key={item.year}
                    className="border-b border-line/30 pb-3 hover:border-accent/50 transition-colors"
                  >
                    <div className="flex items-baseline justify-between font-mono text-xs">
                      <span className="text-accent font-medium">{item.year}</span>
                      <span className="text-muted text-[10px] uppercase tracking-wider">{item.title}</span>
                    </div>
                    <p className="mt-1 font-serif text-sm text-foreground/90 font-light">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AcousticContour className="mt-16" />
      </div>
    </section>
  );
}
