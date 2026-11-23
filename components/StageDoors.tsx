"use client";

import { useEffect, useRef, useState } from "react";
import { STAGE_DOORS, type Lang } from "@/lib/copy";

const pad = (n: number) => String(n).padStart(2, "0");

export default function StageDoors({
  lang,
  onPlayChord,
}: {
  lang: Lang;
  onPlayChord: (freq: number) => void;
}) {
  const [open, setOpen] = useState(0);
  const [mobile, setMobile] = useState(false);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const rootRef = useRef<HTMLElement>(null);
  const seenRef = useRef(false);

  useEffect(() => {
    const mq = matchMedia("(max-width: 767px)");
    setMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  // Desktop: only the open door plays its video, and only when the section is in view
  useEffect(() => {
    if (mobile) return;
    const el = rootRef.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const playActive = () => {
      vids.current.forEach((v, i) => {
        if (!v) return;
        if (i === open && seenRef.current && !reduced) {
          if (!v.src && v.dataset.src) v.src = `${v.dataset.src}.mp4`;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        seenRef.current = entry.isIntersecting;
        playActive();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    playActive();
    return () => io.disconnect();
  }, [open, mobile]);

  // Mobile: each door plays its lightweight -m.mp4 video when scrolled into view
  useEffect(() => {
    if (!mobile) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target.querySelector("video") as HTMLVideoElement | null;
          if (!v) return;
          if (entry.isIntersecting) {
            if (!v.src && v.dataset.srcm) v.src = v.dataset.srcm;
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.45 }
    );
    rootRef.current?.querySelectorAll("[data-door]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [mobile]);

  return (
    <section
      id="stages"
      ref={rootRef}
      className="border-t border-white/[0.08] bg-[#08080a] px-5 py-28 md:px-12 md:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37]">
              {lang === "de" ? "02 / Weltbühnen & Meilensteine" : "02 / World Stages & Milestones"}
            </span>
            <h2 className="mt-5 text-[clamp(2.2rem,5.5vw,5.6rem)] font-light uppercase leading-[0.95] tracking-[-0.04em] text-[#f2efea]">
              {lang === "de" ? "FÜNF TORE DER " : "FIVE DOORS OF "}
              <em className="font-serif italic font-normal normal-case tracking-[-0.02em] text-[#d4af37]">
                {lang === "de" ? "Virtuosität." : "Virtuosity."}
              </em>
            </h2>
          </div>
          <p className="hidden pb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-[#f2efea]/45 md:block">
            {lang === "de"
              ? "Berühren Sie eine Bühne zum Öffnen"
              : "Hover or tap a stage door to expand"}
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-4 md:h-[74vh] md:flex-row md:gap-2.5">
          {STAGE_DOORS.map((door, i) => {
            const isOpen = i === open;
            return (
              <article
                key={door.id}
                data-door
                tabIndex={0}
                onPointerEnter={() => !mobile && setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => {
                  setOpen(i);
                  onPlayChord(door.freq);
                }}
                className={`wl-door group relative h-[54vh] overflow-hidden rounded-[20px] border border-white/[0.1] outline-none md:h-auto ${
                  isOpen ? "is-open border-[#d4af37]/50" : ""
                }`}
              >
                <picture aria-hidden>
                  <source media="(max-width: 767px)" srcSet={`${door.img}-m.webp`} />
                  <img
                    src={`${door.img}.webp`}
                    alt={door.line[lang]}
                    loading="lazy"
                    decoding="async"
                    className="wl-media absolute inset-0 h-full w-full object-cover object-top"
                  />
                </picture>
                {door.film && (
                  <video
                    ref={(el) => {
                      vids.current[i] = el;
                    }}
                    data-src={door.film}
                    data-srcm={`${door.film}-m.mp4`}
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden
                    className="wl-media absolute inset-0 h-full w-full object-cover object-center"
                  />
                )}
                <span aria-hidden className="wl-flash pointer-events-none absolute inset-0" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40"
                />

                {/* Top Number & Vertical Spine Label */}
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                  <span className="font-mono text-xs tabular-nums text-[#d4af37]">
                    {pad(i + 1)}
                  </span>
                  <span className="wl-vertical font-mono text-[11px] uppercase tracking-[0.28em] text-[#f2efea]/80">
                    {door.field[lang]}
                  </span>
                </div>

                {/* Bottom Expanded Story */}
                <div className="wl-copy absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4af37]">
                      {door.field[lang]}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#f2efea]/60">
                      · {door.location[lang]}
                    </span>
                  </div>
                  <h3 className="mt-3 max-w-xl font-serif text-2xl font-light leading-tight text-[#f2efea] md:text-4xl">
                    {door.line[lang]}
                  </h3>
                  <p className="mt-3 max-w-lg font-sans text-xs font-light leading-relaxed text-[#f2efea]/75 sm:text-sm">
                    {door.detail[lang]}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
