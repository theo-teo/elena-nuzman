"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_SLIDES, type Lang } from "@/lib/copy";

export default function EmotionHero({
  lang,
  onPlayChord,
  soundOn,
}: {
  lang: Lang;
  onPlayChord: (freq: number) => void;
  soundOn: boolean;
}) {
  const [active, setActive] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [past, setPast] = useState(false);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const s = HERO_SLIDES[active];

  useEffect(() => {
    const mq = matchMedia("(max-width: 767px)");
    setMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  // Floating round inquiry button (noth.in / Private Studio pattern)
  useEffect(() => {
    let last = window.scrollY;
    let up = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 6) {
        up = y < last;
        last = y;
      }
      const formRect = document.getElementById("booking")?.getBoundingClientRect();
      const atForm = !!formRect && formRect.top < window.innerHeight * 0.85;
      const small = window.innerWidth < 768;
      setPast(y > window.innerHeight * 0.75 && !atForm && (!small || up));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only load and play the short video for the currently active slide
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && !reduced) {
        const targetSrc = `${v.dataset.src}${mobile ? "-m" : ""}.mp4`;
        if (!v.src.endsWith(targetSrc)) {
          v.src = targetSrc;
        }
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, mobile]);

  // Auto-advance every 9.5s if user hasn't scrolled past hero, plus keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY > window.innerHeight * 0.6) return;
      if (e.key === "ArrowRight") setActive((prev) => (prev + 1) % HERO_SLIDES.length);
      if (e.key === "ArrowLeft")
        setActive((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    const timer = window.setInterval(() => {
      if (window.scrollY < window.innerHeight * 0.4) {
        setActive((prev) => (prev + 1) % HERO_SLIDES.length);
      }
    }, 9500);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section
      id="top"
      className="eh relative h-[100svh] w-full overflow-hidden bg-[#050506] text-[#f2efea]"
    >
      {/* Layered Real-Identity Cinema Stills + Lazy-Loaded Short Videos */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== active}
          className={`eh-layer absolute inset-0 transition-opacity duration-700 ease-out ${
            i === active ? "is-on opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={`${slide.img}-m.webp`} />
            <img
              src={`${slide.img}.webp`}
              alt={slide.title[lang]}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              className="eh-media h-full w-full object-cover object-[center_20%] md:object-[62%_22%]"
            />
          </picture>
          <video
            ref={(el) => {
              vids.current[i] = el;
            }}
            data-src={slide.film}
            muted
            loop
            playsInline
            preload="none"
            poster={`${slide.img}${mobile ? "-m" : ""}.webp`}
            className="eh-media absolute inset-0 h-full w-full object-cover object-[center_20%] md:object-[62%_22%]"
          />
        </div>
      ))}

      {/* Cinematic Chiaroscuro Overlays — keeping upper-center face bright and clear */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050506]/95"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050506]/90 via-[#050506]/25 to-transparent"
      />

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between px-4 pb-6 pt-20 sm:px-10 sm:pb-9 sm:pt-28 lg:px-16">
        {/* Top Eyebrow & Right Floating Quote */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div className="inline-flex items-center gap-2.5">
            <span className="ag-dot shrink-0" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f2efea]/80 sm:text-[11px] sm:tracking-[0.3em]">
              {lang === "de"
                ? "Elena Nuzman · Diplom-Konzertpianistin & 4 Oktaven"
                : "Elena Nuzman · Master Concert Pianist & 4 Octaves"}
            </span>
          </div>

          <div key={s.id} className="ag-fade hidden max-w-xs text-right md:block">
            <span className="inline-block rounded-full border border-[#d4af37]/35 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4af37] backdrop-blur-md">
              {s.tag[lang]}
            </span>
            <p className="mt-3 font-serif text-base italic leading-relaxed text-[#f2efea]/90">
              {s.quote[lang]}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d4af37]/80">
              {s.location[lang]}
            </p>
          </div>
        </div>

        {/* Lower Editorial Stage: Monumental Headline on Left + Thumbnails Below (Leaves Elena's face 100% clear) */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <h1 className="text-[clamp(1.85rem,5.4vw,5.8rem)] font-light uppercase leading-[0.94] tracking-[-0.035em] text-[#f2efea]">
                {lang === "de" ? "EIN KONZERTFLÜGEL." : "A CONCERT GRAND."}
                <br />
                <span className="font-serif italic font-normal normal-case tracking-[-0.02em] text-[#d4af37]">
                  {lang === "de" ? "Vier Oktaven." : "Four octaves."}
                </span>
                <br />
                {lang === "de" ? "REINE GRAVITATION." : "PURE GRAVITY."}
              </h1>
              <p className="mt-3 max-w-md font-serif text-sm italic text-[#f2efea]/85 md:hidden">
                {s.quote[lang]}
              </p>
            </div>

            {/* Circular Thumbnail Selector */}
            <div className="flex items-end gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] sm:gap-3 [&::-webkit-scrollbar]:hidden">
              {HERO_SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={slide.title[lang]}
                  aria-pressed={i === active}
                  onClick={() => {
                    setActive(i);
                    onPlayChord(slide.freq);
                  }}
                  className="group flex shrink-0 flex-col items-center gap-1.5"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      i === active
                        ? "bg-[#d4af37] opacity-100 shadow-[0_0_10px_#d4af37]"
                        : "bg-white/40 opacity-30 group-hover:opacity-75"
                    }`}
                  />
                  <span
                    className={`block h-11 w-11 overflow-hidden rounded-full border transition-all duration-500 sm:h-14 sm:w-14 ${
                      i === active
                        ? "scale-105 border-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.5)]"
                        : "border-white/25 opacity-65 group-hover:opacity-100"
                    }`}
                  >
                    <img
                      src={slide.thumb}
                      alt={slide.title[lang]}
                      className="h-full w-full object-cover object-top"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Hairline Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2efea]/70 sm:text-[11px] sm:tracking-[0.24em]">
            <div className="flex items-center gap-2.5 truncate">
              <span className="text-[#d4af37]">
                0{active + 1} / 0{HERO_SLIDES.length}
              </span>
              <span className="truncate text-[#f2efea]">{s.title[lang]}</span>
              <span className="hidden text-white/30 md:inline">·</span>
              <span className="hidden text-[#d4af37] md:inline">{s.year}</span>
            </div>

            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => onPlayChord(s.freq)}
                className="inline-flex items-center gap-2 text-[#f2efea] transition hover:text-[#d4af37]"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    soundOn ? "animate-ping bg-[#d4af37]" : "bg-white/50"
                  }`}
                />
                {soundOn
                  ? lang === "de"
                    ? "Liszt-Akkord aktiv"
                    : "Liszt Chord Active"
                  : lang === "de"
                  ? "Klang erleben"
                  : "Experience Sound"}
              </button>

              <a
                href="#story"
                className="underline underline-offset-4 text-[#f2efea]/80 transition hover:text-[#d4af37]"
              >
                {lang === "de" ? "Story ↓" : "Scroll Story ↓"}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Round Inquiry Orb */}
      <a
        href="#booking"
        className={`eh-ask fixed bottom-5 right-5 z-40 grid h-[64px] w-[64px] place-items-center rounded-full bg-[#d4af37] text-center font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-[#050506] shadow-[0_18px_45px_-10px_rgba(212,175,55,0.6)] transition-all duration-700 hover:scale-110 hover:bg-[#f2efea] md:bottom-8 md:right-8 md:h-[92px] md:w-[92px] md:text-[10px] ${
          past ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {lang === "de" ? "Anfragen" : "Inquire"}
      </a>
    </section>
  );
}
