"use client";

import { useState } from "react";
import { PRESS_ARCHIVE, type Lang, type PressItem } from "@/lib/copy";

const REAL_GALLERY = [
  {
    img: "/media/real-portrait-gold",
    title: { en: "Berlin Brandenburg Gate Portrait", de: "Berlin Brandenburger Tor Porträt" },
    meta: "2448 × 3264 · Original Press Portrait",
  },
  {
    img: "/media/real-portrait-noir",
    title: { en: "Harper's Bazaar Chiaroscuro Session", de: "Harper's Bazaar Chiaroscuro-Porträt" },
    meta: "Editorial Studio Session",
  },
  {
    img: "/media/real-schloss-strings",
    title: { en: "Schloss Burg · Steinway Soundboard", de: "Schloss Burg · Am offenen Steinway" },
    meta: "Solingen · Historic Concert Hall",
  },
  {
    img: "/media/real-portrait-crimson",
    title: { en: "Classic Crossover Gala Portrait", de: "Klassik-Crossover Gala-Porträt" },
    meta: "2448 × 3072 · Official Press Archive",
  },
];

export default function PressArchive({ lang }: { lang: Lang }) {
  const [selectedPress, setSelectedPress] = useState<PressItem | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const cards = e.currentTarget.querySelectorAll<HTMLElement>(".ag-card");
    cards.forEach((card) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - r.left}px`);
      card.style.setProperty("--y", `${e.clientY - r.top}px`);
    });
  };

  return (
    <section
      id="press"
      onPointerMove={handlePointerMove}
      className="ag-cards border-t border-white/[0.08] bg-[#050506] px-5 py-28 md:px-12 md:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37]">
              {lang === "de"
                ? "05 / Internationale Weltpresse & Feuilleton"
                : "05 / International Press & Cover Features"}
            </span>
            <h2 className="mt-5 text-[clamp(2.2rem,5.5vw,5.6rem)] font-light uppercase leading-[0.95] tracking-[-0.04em] text-[#f2efea]">
              {lang === "de" ? "ECHO DER " : "VOICES OF "}
              <em className="font-serif italic font-normal normal-case tracking-[-0.02em] text-[#d4af37]">
                {lang === "de" ? "Weltpresse." : "Acclaim."}
              </em>
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm font-light leading-relaxed text-[#f2efea]/60">
            {lang === "de"
              ? "Titelgeschichten und Porträts in Rolling Stone USA, Harper’s Bazaar USA, Vogue Miami, Vogue Athens und Cosmopolitan UK."
              : "Cover features and in-depth profiles in Rolling Stone USA, Harper’s Bazaar USA, Vogue Miami, Vogue Athens, and Cosmopolitan UK."}
          </p>
        </div>

        {/* 5 Real International Magazine Covers */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PRESS_ARCHIVE.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedPress(item)}
              className="ag-card group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl p-4"
            >
              <div>
                <div className="relative aspect-[3/4.1] w-full overflow-hidden rounded-xl border border-white/10 bg-black">
                  <picture>
                    <source media="(max-width: 767px)" srcSet={`${item.cover}-m.webp`} />
                    <img
                      src={`${item.cover}.webp`}
                      alt={`${item.publication} — Elena Nuzman`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-30" />
                </div>

                <div className="mt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4af37]">
                    {item.publication}
                  </span>
                  <h3 className="mt-1.5 font-serif text-lg font-light leading-snug text-[#f2efea] group-hover:text-[#d4af37] transition-colors">
                    {item.headline[lang]}
                  </h3>
                  <p className="mt-2 line-clamp-3 font-sans text-xs font-light leading-relaxed text-[#f2efea]/60">
                    {item.quote[lang]}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2efea]/45">
                <span>{item.issue.split("·")[0]}</span>
                <span className="text-[#d4af37]">
                  {lang === "de" ? "Cover öffnen →" : "Inspect →"}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Authentic High-Res Press Photography Strip */}
        <div className="mt-24 border-t border-white/[0.08] pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4af37]">
                {lang === "de"
                  ? "Offizielles Künstler-Archiv · Echte Porträts"
                  : "Official Artist Archive · Authentic Portraits"}
              </span>
              <h3 className="mt-2 font-serif text-3xl font-light text-[#f2efea]">
                {lang === "de"
                  ? "Präsenz & Authentizität."
                  : "Presence & Authenticity."}
              </h3>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#f2efea]/40">
              {lang === "de" ? "Verifizierte Pressefotografie" : "Verified Press Photography"}
            </span>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REAL_GALLERY.map((photo) => (
              <figure
                key={photo.img}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#08080a]"
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <picture>
                    <source media="(max-width: 767px)" srcSet={`${photo.img}-m.webp`} />
                    <img
                      src={`${photo.img}.webp`}
                      alt={photo.title[lang]}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                    />
                  </picture>
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#d4af37]">
                    {photo.meta}
                  </span>
                  <p className="mt-1 font-serif text-lg font-light text-[#f2efea]">
                    {photo.title[lang]}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Magazine Cover Lightbox Reader */}
      {selectedPress && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPress(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="grid w-full max-w-4xl gap-8 overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#08080a] p-6 shadow-2xl md:grid-cols-12 md:p-10"
          >
            <div className="md:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-white/15">
                <img
                  src={`${selectedPress.cover}.webp`}
                  alt={selectedPress.publication}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between md:col-span-7">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#d4af37]">
                    {selectedPress.publication}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPress(null)}
                    className="ag-btn !px-3.5 !py-1.5"
                  >
                    ✕
                  </button>
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#f2efea]/45">
                  {selectedPress.issue}
                </p>
                <h3 className="mt-6 font-serif text-3xl font-light leading-tight text-[#f2efea] sm:text-4xl">
                  {selectedPress.headline[lang]}
                </h3>
                <blockquote className="mt-6 border-l-2 border-[#d4af37] pl-5 font-serif text-xl italic leading-relaxed text-[#f2efea]/90">
                  {selectedPress.quote[lang]}
                </blockquote>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#f2efea]/45">
                  Verified Press Dossier
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPress(null)}
                  className="ag-btn ag-btn-solid"
                >
                  {lang === "de" ? "Schliessen" : "Done Reading"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
