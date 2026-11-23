"use client";

import { useEffect, useRef } from "react";
import { SCROLL_BEATS, type Lang } from "@/lib/copy";

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function ScrollStage({ lang }: { lang: Lang }) {
  const t = SCROLL_BEATS[lang];
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = matchMedia("(max-width: 767px)").matches;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-beat]"));
    const imgs = Array.from(el.querySelectorAll<HTMLElement>("[data-beat-img]"));

    let loaded = false;
    let iosUnlocked = false;
    const ensureVideo = () => {
      if (loaded || reduced) return;
      loaded = true;
      vid.src = `/media/cinema-keys${mobile ? "-m" : ""}.mp4`;
      vid.load();
    };

    // iOS Safari requires a gesture-triggered play().then(pause) to unlock currentTime scrubbing
    const unlockIos = () => {
      if (iosUnlocked || !vid.src) return;
      iosUnlocked = true;
      vid
        .play()
        .then(() => vid.pause())
        .catch(() => {});
    };
    window.addEventListener("touchstart", unlockIos, { passive: true, once: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) ensureVideo();
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(el);

    let curTime = 0;
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -vh || r.top > vh * 1.5) return;

      const p = Math.min(0.9999, Math.max(0, -r.top / Math.max(1, r.height - vh)));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }

      // Frame-accurate scroll scrubbing (-g 1 keyframe encoded video)
      if (!reduced && vid.readyState >= 2 && vid.duration) {
        const target = p * (vid.duration - 0.05);
        curTime += (target - curTime) * 0.16;
        if (Math.abs(vid.currentTime - curTime) > 0.015) {
          vid.currentTime = curTime;
        }
      }

      const N = cards.length;
      const f = p * N;
      const activeIdx = Math.min(N - 1, Math.floor(f));
      const q = f - activeIdx;

      cards.forEach((card, k) => {
        let alpha = 0;
        if (k === activeIdx) {
          const fadeIn = k === 0 ? smooth(0, 0.12, q) || 1 : smooth(0.05, 0.24, q);
          const fadeOut = k === N - 1 ? 1 : 1 - smooth(0.76, 0.96, q);
          alpha = fadeIn * fadeOut;
        }
        card.style.opacity = String(alpha);
        card.style.transform = `translate3d(0, ${(1 - alpha) * 22}px, 0)`;
        card.style.pointerEvents = alpha > 0.5 ? "auto" : "none";
      });

      imgs.forEach((img, k) => {
        const on = k === activeIdx ? 1 : 0;
        img.style.opacity = String(on);
        img.style.transform = `scale(${on ? 1 : 1.06})`;
      });
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("touchstart", unlockIos);
    };
  }, [lang]);

  return (
    <section
      id="story"
      ref={rootRef}
      className="relative h-[320vh] border-t border-white/[0.08] bg-[#050506]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Background Scroll-Scrubbed Video (-g 1) + Fallback WebP */}
        <picture aria-hidden>
          <source media="(max-width: 767px)" srcSet="/media/cinema-keys-m.webp" />
          <img
            src="/media/cinema-keys.webp"
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-65"
          />
        </picture>
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/media/cinema-keys.webp"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />

        {/* Chiaroscuro Gradients */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/45 to-[#050506]/80"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050506]/90 via-[#050506]/40 to-transparent"
        />

        {/* Pinned Stage Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pb-10 pt-24 md:px-12 md:pb-16 md:pt-28 lg:px-16">
          {/* Top Chapter Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#d4af37] sm:text-[11px] sm:tracking-[0.3em]">
              {t.eyebrow}
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-[#f2efea]/40 sm:inline">
              {lang === "de" ? "Scroll-gesteuerte Bühne" : "Scroll-Scrubbed Stage"}
            </span>
          </div>

          {/* Center Grid: Narrative Beat on Left, Authentic Archival Portrait Card on Right */}
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="relative min-h-[280px] md:col-span-7 lg:col-span-8">
              {t.beats.map((b, idx) => (
                <div
                  key={b.num}
                  data-beat
                  className="inset-x-0 top-0 transition-none"
                  style={{
                    position: idx === 0 ? "relative" : "absolute",
                    opacity: idx === 0 ? 1 : 0,
                  }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
                    <span className="ag-dot" />
                    {b.num}
                  </span>
                  <h2 className="mt-4 text-[clamp(1.85rem,4.8vw,5.2rem)] font-light uppercase leading-[0.98] tracking-[-0.035em] text-[#f2efea]">
                    <span className="block">{b.l1}</span>
                    <em className="mt-1 block font-serif italic font-normal normal-case tracking-[-0.02em] text-[#d4af37]">
                      {b.l2}
                    </em>
                  </h2>
                  <p className="mt-5 max-w-2xl font-sans text-xs font-light leading-relaxed text-[#f2efea]/75 sm:text-base">
                    {b.body}
                  </p>

                  {/* Mobile Compact Archival Photo Badge */}
                  <div className="ag-glass mt-5 flex items-center gap-3.5 rounded-2xl p-2.5 md:hidden">
                    <img
                      src={`${b.img}-m.webp`}
                      alt={b.caption}
                      loading="lazy"
                      className="h-14 w-14 shrink-0 rounded-xl object-cover object-top"
                    />
                    <div className="min-w-0">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[#d4af37]">
                        {lang === "de" ? "Originalaufnahme" : "Authentic Archival Photo"}
                      </span>
                      <p className="truncate font-serif text-sm italic text-[#f2efea]">
                        {b.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Authentic Portrait Inset Card */}
            <div className="hidden md:col-span-5 md:block lg:col-span-4">
              <div className="ag-glass relative ml-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl p-2">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  {t.beats.map((b, idx) => (
                    <div
                      key={b.img}
                      data-beat-img
                      className="absolute inset-0 transition-all duration-700 ease-out"
                      style={{ opacity: idx === 0 ? 1 : 0 }}
                    >
                      <picture>
                        <source media="(max-width: 767px)" srcSet={`${b.img}-m.webp`} />
                        <img
                          src={`${b.img}.webp`}
                          alt={b.caption}
                          loading="lazy"
                          className="h-full w-full object-cover object-top"
                        />
                      </picture>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4af37]">
                          {lang === "de" ? "Originalaufnahme" : "Authentic Archival Photo"}
                        </span>
                        <p className="mt-1 font-serif text-sm italic text-[#f2efea]">
                          {b.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Progress Hairline */}
          <div className="flex items-center justify-between gap-6 pt-4">
            <div className="h-px w-full max-w-md bg-white/15">
              <span
                ref={barRef}
                className="block h-px w-full origin-left scale-x-0 bg-[#d4af37] shadow-[0_0_12px_#d4af37]"
              />
            </div>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f2efea]/50">
              Chisinau · Paris · Düsseldorf · NYC
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
