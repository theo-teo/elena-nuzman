"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "@/lib/copy";

// Inspiriert von private-studio Shore.tsx + Room.tsx Portal:
// 1. Das Vollbild-Video zieht sich beim Scrollen sanft zu einem gerundeten Rahmen zusammen (clip-path inset),
//    waehrend die Zeilen nacheinander aufsteigen.
// 2. Danach waechst eine warme Lichtscheibe (hs-portal) aus der Mitte, bis die helle Creme-Welt (.cream)
//    den gesamten Bildschirm fuellt.

function CreamPortal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    const d = discRef.current;
    if (!el || !d) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none";
      return;
    }
    let raf = 0;
    const f = () => {
      raf = requestAnimationFrame(f);
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      const e = p * p * (3 - 2 * p);
      d.style.transform = `translate(-50%, -50%) scale(${0.015 + e * e * 2.2})`;
      el.dataset.light = e > 0.78 ? "1" : "";
      d.style.opacity = String(Math.min(1, p * 5.5));
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="relative h-[135vh] bg-[#16110d]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          ref={discRef}
          className="hs-portal absolute left-1/2 top-1/2 h-[100vmax] w-[100vmax] rounded-full will-change-transform"
          style={{ transform: "translate(-50%, -50%) scale(0.015)", opacity: 0 }}
        />
      </div>
    </div>
  );
}

export default function ShoreInterlude({
  lang,
  onPlayChord,
  soundOn,
}: {
  lang: Lang;
  onPlayChord: (freq: number) => void;
  soundOn: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    const v = vidRef.current;
    if (!el || !v) return;
    const mobile = matchMedia("(max-width: 767px)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced) {
          if (!v.src) v.src = `/media/cinema-vocal${mobile ? "-m" : ""}.mp4`;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      if (frameRef.current && !reduced) {
        frameRef.current.style.clipPath = `inset(${p * 6}% ${p * 7}% ${p * 6}% ${p * 7}% round ${p * 28}px)`;
      }
      el.querySelectorAll<HTMLElement>("[data-rise]").forEach((n, i) => {
        const k = Math.min(1, Math.max(0, (p - 0.06 - i * 0.11) / 0.22));
        n.style.opacity = String(k);
        n.style.transform = `translate3d(0, ${(1 - k) * 24}px, 0)`;
      });
    };
    raf = requestAnimationFrame(loop);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <section ref={rootRef} className="shore warm-stage relative h-[210vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div ref={frameRef} className="absolute inset-0 will-change-[clip-path]">
            <picture aria-hidden>
              <source media="(max-width: 767px)" srcSet="/media/cinema-vocal-m.webp" />
              <img
                src="/media/cinema-vocal.webp"
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
              />
            </picture>
            <video
              ref={vidRef}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#140f0b]/85 via-transparent to-[#140f0b]/30"
            />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-14 md:px-12 md:pb-20 lg:px-16">
            <p data-rise className="ag-eyebrow" style={{ opacity: 0 }}>
              {lang === "de" ? "03 / Die Metamorphose · Licht & Stimme" : "03 / The Metamorphosis · Light & Voice"}
            </p>
            <h2 className="mt-4 max-w-4xl text-[clamp(2rem,5.4vw,5.4rem)] leading-[0.98] text-[#f6f0e6]">
              <span
                data-rise
                className="block font-sans font-light uppercase tracking-[-0.035em]"
                style={{ opacity: 0 }}
              >
                {lang === "de" ? "DIE STILLE WEICHT." : "THE SILENCE YIELDS."}
              </span>
              <em
                data-rise
                className="mt-1 block font-serif italic font-normal tracking-[-0.02em] text-[#daa55c]"
                style={{ opacity: 0 }}
              >
                {lang === "de"
                  ? "Vier Oktaven öffnen den Raum ins Licht."
                  : "Four octaves open the hall into warm light."}
              </em>
            </h2>
            <p
              data-rise
              className="mt-5 max-w-lg font-sans text-xs font-light leading-relaxed text-[#f6f0e6]/80 sm:text-base"
              style={{ opacity: 0 }}
            >
              {lang === "de"
                ? "Wenn Elena Nuzman den Steinway nicht nur spielt, sondern gleichzeitig mit vier Oktaven Stimmumfang erfüllt, verwandelt sich der dunkle Konzertsaal in eine leuchtende Bühne."
                : "When Elena Nuzman not only plays the Steinway grand, but fills the hall simultaneously with four octaves of vocal resonance, the darkened stage opens into warm light."}
            </p>
            <button
              type="button"
              data-rise
              style={{ opacity: 0 }}
              onClick={() => onPlayChord(261.63)}
              className="ag-btn mt-7 self-start"
            >
              <span className={`ag-dot ${soundOn ? "animate-ping" : ""}`} />
              {lang === "de" ? "Vier-Oktaven-Akkord hören" : "Hear Four-Octave Chord"}
            </button>
          </div>
        </div>
      </section>
      <CreamPortal />
    </>
  );
}
