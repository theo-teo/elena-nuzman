"use client";

import { useEffect, useRef, useState } from "react";
import Kinetic from "@/components/Kinetic";
import VoiceWave from "@/components/VoiceWave";
import {
  DISCOGRAPHY,
  FOUR_OCTAVES,
  PRESS_ARCHIVE,
  VIDEO_REELS,
  type Lang,
  type OctaveNote,
  type PressItem,
  type Track,
} from "@/lib/copy";

/* ---------- 1. Haengende Buchstaben mit Feder-Physik (aus private-studio Projects.tsx) ---------- */
function Hanging({ word }: { word: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-letter]"));
    const st = letters.map((_, i) => ({ a: (i % 2 ? -1 : 1) * 0.055, v: 0 }));
    let lastY = window.scrollY;
    let raf = 0;

    const kick = (e: PointerEvent) => {
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        if (d < 160) {
          st[i].v += (e.movementX || 0) * 0.0015 * (1 - d / 160);
        }
      });
    };
    window.addEventListener("pointermove", kick, { passive: true });

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dy = Math.max(-30, Math.min(30, window.scrollY - lastY));
      lastY = window.scrollY;
      st.forEach((s, i) => {
        s.v += -s.a * 0.045 - s.v * 0.04 + dy * 0.00025 * (i % 2 ? 1 : -1);
        s.a = Math.max(-0.28, Math.min(0.28, s.a + s.v));
        if (letters[i]) {
          letters[i].style.transform = `rotate(${s.a * 57.3}deg)`;
        }
      });
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", kick);
    };
  }, [word]);

  return (
    <div
      ref={box}
      aria-label={word}
      role="img"
      className="hang flex justify-center gap-[2.2vw] pt-4 sm:gap-[2.8vw]"
    >
      {word.split("").map((c, i) => (
        <span
          key={i}
          data-letter
          aria-hidden
          className="hang-l relative inline-block origin-top"
          style={{ ["--h" as string]: `${4.5 + ((i * 37) % 4.5)}vw` }}
        >
          <span className="hang-s absolute left-1/2 top-0 w-px -translate-x-1/2 bg-current opacity-35" />
          <span className="block font-serif text-[12.5vw] font-light leading-none tracking-[-0.05em] text-[rgb(30_24_20)] md:text-[9.2vw]">
            {c}
          </span>
        </span>
      ))}
    </div>
  );
}

/* ---------- 2. Schwebende Musik- & Kunst-Symbole (eigene Linien-SVGs) ---------- */
const SYMBOLS = [
  // Piano Keys & Lyre
  <g key="lyre">
    <path d="M14 38h20M18 38V16c0-4 12-4 12 0v22M24 12v26" />
    <circle cx="24" cy="10" r="2.5" />
  </g>,
  // Tuning Fork (440 Hz)
  <g key="fork">
    <path d="M18 10v12a6 6 0 0 0 12 0V10M24 28v12" />
  </g>,
  // Four-Octave Acoustic Wave
  <g key="wave">
    <path d="M4 24c4-10 8 10 12 0s8-14 12 0 8 10 12 0 4-6 4-6" />
  </g>,
  // Star of Stage
  <g key="star">
    <path d="M24 4l4 16 16 4-16 4-4 16-4-16-16-4 16-4z" />
  </g>,
  // Vinyl Record
  <g key="vinyl">
    <circle cx="24" cy="24" r="18" />
    <circle cx="24" cy="24" r="11" strokeDasharray="3 3" />
    <circle cx="24" cy="24" r="4" />
  </g>,
  // Concert Arch / Door
  <g key="arch">
    <path d="M12 42V20a12 12 0 0 1 24 0v22M8 42h32" />
  </g>,
  // Harmonic Diamond
  <g key="diamond">
    <circle cx="24" cy="24" r="17" />
    <path d="M24 9l6 15-6 15-6-15z" />
  </g>,
];

function Floaters() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-f]"));
    const st = items.map((_, i) => ({ x: 0, y: 0, vx: 0, vy: 0, ph: i * 1.7 }));
    const m = { x: -9999, y: -9999 };
    const mv = (e: PointerEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
    };
    window.addEventListener("pointermove", mv, { passive: true });
    let raf = 0;
    const t0 = performance.now();

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const t = (now - t0) / 1000;
      items.forEach((it, i) => {
        const s = st[i];
        const r = it.getBoundingClientRect();
        const dx = r.left + r.width / 2 - m.x;
        const dy = r.top + r.height / 2 - m.y;
        const d = Math.hypot(dx, dy);
        if (d < 180 && d > 1) {
          s.vx += (dx / d) * 0.85;
          s.vy += (dy / d) * 0.85;
        }
        s.vx += -s.x * 0.01;
        s.vy += -s.y * 0.01;
        s.vx *= 0.9;
        s.vy *= 0.9;
        s.x += s.vx;
        s.y += s.vy;
        const fx = Math.sin(t * 0.4 + s.ph) * 16;
        const fy = Math.cos(t * 0.33 + s.ph) * 22;
        it.style.transform = `translate3d(${s.x + fx}px, ${s.y + fy}px, 0) rotate(${
          Math.sin(t * 0.3 + s.ph) * 14
        }deg)`;
      });
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", mv);
    };
  }, []);

  const spots = [
    [5, 4],
    [89, 8],
    [12, 24],
    [84, 32],
    [6, 52],
    [91, 60],
    [15, 76],
    [86, 84],
    [48, 94],
  ];

  return (
    <div
      ref={box}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden text-[rgb(186_104_40)]"
    >
      {spots.map(([x, y], i) => (
        <div key={i} data-f className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
          <svg
            viewBox="0 0 48 48"
            className={`${i % 3 === 0 ? "h-12 w-12 md:h-14 md:w-14" : "h-8 w-8 md:h-10 md:w-10"} fill-none stroke-current`}
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.45 }}
          >
            {SYMBOLS[i % SYMBOLS.length]}
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ---------- 3. Die 4 grossen Story-Showcases mit Kurzvideo & Live-Film ---------- */
const SHOWCASES = [
  {
    id: "loewenpalais",
    img: "/media/cinema-grand",
    film: "/media/cinema-grand",
    ytId: "YvgN-TUAfcY",
    freq: 174.61,
    badge: { de: "WERK 01 · STUDIOALBUM 2025", en: "WORK 01 · 2025 STUDIO ALBUM" },
    field: {
      de: "My Piano And I · Konzert im Löwenpalais Berlin",
      en: "My Piano And I · Live at Löwenpalais Berlin",
    },
    line: {
      de: "Reiner Konzertflügel und vier Oktaven Stimme – ohne Netz, ohne Distanz.",
      en: "Pure acoustic Steinway grand and four octaves of voice—unfiltered and intimate.",
    },
    desc: {
      de: "Auf ihrem 2025 erschienenen Werk «My Piano And I» kehrt Elena Nuzman zurück zum Ursprung ihrer Kunst: dem unmittelbaren Dialog zwischen ihren Händen auf 88 Tasten und ihrer vier Oktaven umfassenden Stimme.",
      en: "On her 2025 studio release 'My Piano And I', Elena Nuzman returns to the essence of her artistry: the intimate dialogue between her hands on 88 keys and her four-octave vocal range.",
    },
    ctaVideo: { de: "Konzertfilm Löwenpalais ↗", en: "Watch Löwenpalais Concert ↗" },
    ctaSound: { de: "F-Dur Resonanz hören", en: "Audition F-Major Chord" },
  },
  {
    id: "liebestraeume",
    img: "/media/cinema-keys",
    film: "/media/cinema-keys",
    ytId: "0MWWTors92o",
    freq: 207.65,
    badge: { de: "WERK 02 · IMPALA SILVER AWARD", en: "WORK 02 · IMPALA SILVER AWARD" },
    field: {
      de: "Franz Liszt · Liebesträume (Über 5 Mio. Streams)",
      en: "Franz Liszt · Liebesträume (Over 5M Streams)",
    },
    line: {
      de: "Wenn Franz Liszts berühmtes Nocturne zu einer vier Oktaven hohen Hymne erwacht.",
      en: "When Franz Liszt’s legendary nocturne awakens as a four-octave vocal anthem.",
    },
    desc: {
      de: "Ausgezeichnet mit dem europäischen IMPALA Silver Award für über fünf Millionen Streams, Downloads und Verkäufe. Gedreht im historischen Marmorsaal Stuttgart.",
      en: "Honored with the European IMPALA Silver Award for surpassing five million streams and sales across Europe. Filmed at Stuttgart's historic Marmorsaal.",
    },
    ctaVideo: { de: "Musikfilm Liebesträume ↗", en: "Watch Liebesträume Film ↗" },
    ctaSound: { de: "As-Dur Liszt-Akkord", en: "Play Liszt A♭-Major Chord" },
  },
  {
    id: "brandenburg",
    img: "/media/cinema-stage",
    film: "/media/cinema-stage",
    ytId: "U_nMQkL8XY0",
    freq: 293.66,
    badge: { de: "WERK 03 · 2 MILLIONEN LIVE", en: "WORK 03 · 2 MILLION LIVE" },
    field: {
      de: "Here I Go Again · Brandenburger Tor Silvester",
      en: "Here I Go Again · Brandenburg Gate Berlin NYE",
    },
    line: {
      de: "Vom klassischen Konservatorium vor zwei Millionen Menschen am Brandenburger Tor.",
      en: "From classical conservatory rigor to two million spectators at the Brandenburg Gate.",
    },
    desc: {
      de: "Mit ihrer symphonischen Flügel- und Rock-Adaption von Whitesnakes «Here I Go Again» vereinte Elena Nuzman zur Berliner Silvestergala klassische Klavierdisziplin mit der Ekstase einer Stadionbühne.",
      en: "With her symphonic grand piano and rock adaptation of Whitesnake’s 'Here I Go Again', Elena Nuzman united classical piano discipline with stadium-stage ecstasy in Berlin.",
    },
    ctaVideo: { de: "Live am Brandenburger Tor ↗", en: "Watch Brandenburg Gate Live ↗" },
    ctaSound: { de: "D-Dur Stadion-Akkord", en: "Play Stadium D-Major" },
  },
  {
    id: "showreel",
    img: "/media/cinema-vocal",
    film: "/media/cinema-vocal",
    ytId: "yYAkLE3S3Dk",
    freq: 261.63,
    badge: { de: "WERK 04 · RTL ALBUM DES JAHRES & ABBA", en: "WORK 04 · RTL ALBUM OF THE YEAR & ABBA" },
    field: {
      de: "I Believe In You · Nur die Sieger steh'n im Licht · Showreel 2025",
      en: "I Believe In You · The Winner Takes It All · Showreel 2025",
    },
    line: {
      de: "Persönlich autorisiert von den ABBA-Komponisten Andersson & Ulvaeus.",
      en: "Personally authorized by ABBA founders Benny Andersson & Björn Ulvaeus.",
    },
    desc: {
      de: "Top 10 der deutschen Newcomer-Charts, gekürt zum RTL «Album des Jahres» und persönliche Freigabe der ABBA-Gründer für ihre deutsche Konzertflügel-Interpretation «Nur die Sieger steh'n im Licht».",
      en: "Top 10 German Newcomer Charts, voted RTL 'Album of the Year', and granted personal clearance by ABBA founders for her German grand piano rendition of 'The Winner Takes It All'.",
    },
    ctaVideo: { de: "Offizielles Showreel 2025 ↗", en: "Watch Official Showreel 2025 ↗" },
    ctaSound: { de: "C-Dur Resonanz", en: "Play C-Major Resonance" },
  },
];

export default function CreamWorld({
  lang,
  onPlayChord,
  soundOn,
}: {
  lang: Lang;
  onPlayChord: (freq: number) => void;
  soundOn: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const [selectedNote, setSelectedNote] = useState<OctaveNote>(FOUR_OCTAVES[1]);
  const [activeTrack, setActiveTrack] = useState<Track>(DISCOGRAPHY[0]);
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);
  const [modalVideoTitle, setModalVideoTitle] = useState<string>("");
  const [selectedPress, setSelectedPress] = useState<PressItem | null>(null);
  const [pulse, setPulse] = useState(false);

  // Spring pop observer (.pj.is-in) + lazy video autoplay on scroll (exact private-studio Projects.tsx pattern)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const mobile = matchMedia("(max-width: 767px)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pop = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            pop.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -14% 0px" }
    );

    const vid = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting && !reduced) {
            if (!v.src && v.dataset.src) {
              v.src = `${v.dataset.src}${mobile ? "-m" : ""}.mp4`;
            }
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }),
      { threshold: 0.2 }
    );

    el.querySelectorAll("[data-pop]").forEach((n) => pop.observe(n));
    el.querySelectorAll("video[data-src]").forEach((n) => vid.observe(n));
    return () => {
      pop.disconnect();
      vid.disconnect();
    };
  }, []);

  const triggerNote = (note: OctaveNote) => {
    setSelectedNote(note);
    setPulse(true);
    onPlayChord(note.freq);
    window.setTimeout(() => setPulse(false), 3200);
  };

  const openVideo = (ytId: string, title: string) => {
    setModalVideoId(ytId);
    setModalVideoTitle(title);
  };

  return (
    <section
      id="repertoire"
      ref={rootRef}
      className="cream relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24"
    >
      <Floaters />

      {/* 1. Hanging Letters Header */}
      <div className="relative mx-auto max-w-[1440px] px-5 text-center md:px-10">
        <p className="ag-eyebrow">
          {lang === "de"
            ? "04 / Klangwelten, Vier Oktaven & Weltpresse"
            : "04 / Repertoire, Four Octaves & World Press"}
        </p>
        <Hanging word={lang === "de" ? "VIRTUOSIN" : "VIRTUOSO"} />
        <p className="mx-auto mt-6 max-w-lg font-sans text-sm font-light leading-relaxed text-[rgb(30_24_20/.75)] sm:text-base">
          {lang === "de"
            ? "Erleben Sie die Werke, Live-Konzertfilme, das Vier-Oktaven-Frequenzlabor und die internationalen Titelgeschichten in einer warmen, lebendigen Atelier-Atmosphäre."
            : "Explore the signature works, live concert films, the four-octave acoustic frequency lab, and international cover stories in a warm, living salon atmosphere."}
        </p>
      </div>

      {/* 2. Four Alternating Spring-Pop Cinema Showcases (.pj.is-in) */}
      <div className="relative mx-auto mt-16 max-w-[1280px] px-5 md:mt-24 md:px-10">
        {SHOWCASES.map((item, i) => (
          <article
            key={item.id}
            data-pop
            className={`pj relative mb-20 grid items-center gap-8 md:mb-28 md:grid-cols-12 ${
              i % 2 ? "pj-r" : "pj-l"
            }`}
            style={{ ["--d" as string]: `${(i % 3) * 75}ms` }}
          >
            <div
              className={`pj-media group relative cursor-pointer overflow-hidden rounded-[26px] shadow-[0_40px_80px_-40px_rgb(60_30_10/.45)] md:col-span-7 ${
                i % 2 ? "md:order-2 md:col-start-6" : ""
              }`}
              onClick={() => openVideo(item.ytId, item.field[lang])}
            >
              <picture>
                <source media="(max-width: 767px)" srcSet={`${item.img}-m.webp`} />
                <img
                  src={`${item.img}.webp`}
                  alt={item.field[lang]}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </picture>
              <video
                data-src={item.film}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"
              />
              <span className=" absolute left-4 top-4 rounded-full bg-[rgb(246_240_230/.92)] px-3.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[rgb(30_24_20)] shadow-md backdrop-blur">
                {item.badge[lang]}
              </span>
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/75 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f6f0e6] backdrop-blur transition group-hover:bg-[rgb(186_104_40)]">
                ▶ {lang === "de" ? "Live-Film" : "Live Film"}
              </span>
            </div>

            <div
              className={`md:col-span-5 ${
                i % 2 ? "md:order-1 md:pr-8" : "md:pl-8"
              }`}
            >
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-[rgb(186_104_40)]">
                {item.field[lang]}
              </p>
              <Kinetic
                as="h3"
                text={item.line[lang]}
                step={11}
                className="mt-3 block font-serif text-[clamp(1.75rem,3.3vw,3rem)] italic leading-[1.08] text-[rgb(30_24_20)]"
              />
              <p className="mt-4 font-sans text-xs font-light leading-relaxed text-[rgb(30_24_20/.75)] sm:text-sm">
                {item.desc[lang]}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => openVideo(item.ytId, item.field[lang])}
                  className="ag-btn ag-btn-solid"
                >
                  {item.ctaVideo[lang]}
                </button>
                <button
                  type="button"
                  onClick={() => onPlayChord(item.freq)}
                  className="ag-btn"
                >
                  ♪ {item.ctaSound[lang]}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 3. Four-Octave Interactive Frequency Lab on Warm Cream */}
      <div
        id="voice"
        className="relative mx-auto mt-12 max-w-[1280px] border-t border-[rgb(30_24_20/.12)] px-5 pt-20 md:px-10 md:pt-28"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="ag-eyebrow">
              {lang === "de"
                ? "05 / Das Vier-Oktaven-Frequenzlabor (E3 — E7)"
                : "05 / The Four-Octave Frequency Lab (E3 — E7)"}
            </p>
            <h2 className="mt-3 font-sans text-[clamp(2rem,4.8vw,4.6rem)] font-light uppercase leading-[0.96] tracking-[-0.035em] text-[rgb(30_24_20)]">
              {lang === "de" ? "VIER OKTAVEN " : "FOUR OCTAVES OF "}
              <em className="font-serif italic font-normal normal-case text-[rgb(186_104_40)]">
                {lang === "de" ? "Stimmgewalt." : "Vocal Gravity."}
              </em>
            </h2>
          </div>
          <p className="max-w-md font-sans text-xs font-light leading-relaxed text-[rgb(30_24_20/.7)] sm:text-sm">
            {lang === "de"
              ? "Tippen Sie auf ein Register, um den jeweiligen Grundton und die Obertöne des Steinway-Flügels in Echtzeit anzuspielen."
              : "Tap any register pad to audition the corresponding Steinway fundamental frequency and vocal overtone spectrum."}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Dark Warm Walnut Acoustic Monitor inside the Cream Salon */}
          <div className="flex flex-col justify-between rounded-[26px] bg-[#18120e] p-6 text-[#f6f0e6] shadow-[0_30px_70px_-30px_rgb(40_20_5/.55)] sm:p-8 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#daa55c]">
                <span className="flex items-center gap-2">
                  <span className="ag-dot" />
                  {lang === "de" ? "Akustischer Spektral-Monitor" : "Acoustic Spectral Monitor"}
                </span>
                <span>{selectedNote.note}</span>
              </div>
              <div className="py-7">
                <VoiceWave
                  fallback={
                    pulse
                      ? selectedNote.energy
                      : soundOn
                      ? selectedNote.energy * 0.85
                      : selectedNote.energy * 0.42
                  }
                  height={105}
                />
              </div>
            </div>
            <div className="border-t border-white/10 pt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#daa55c]">
                {selectedNote.register[lang]}
              </span>
              <p className="mt-1 font-serif text-xl italic text-[#f6f0e6]">
                {selectedNote.work[lang]}
              </p>
              <p className="mt-1.5 font-sans text-xs font-light leading-relaxed text-[#f6f0e6]/70">
                {selectedNote.desc[lang]}
              </p>
            </div>
          </div>

          {/* 4 Register Cards on Cream Glass */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {FOUR_OCTAVES.map((note, idx) => {
              const active = selectedNote.id === note.id;
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => triggerNote(note)}
                  className={`ag-card group flex flex-col justify-between rounded-[22px] p-6 text-left transition-all ${
                    active
                      ? "!border-[rgb(186_104_40)] ring-1 ring-[rgb(186_104_40/.35)]"
                      : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em]">
                      <span className="font-medium text-[rgb(186_104_40)]">
                        {lang === "de" ? `OKTAVE 0${idx + 1}` : `OCTAVE 0${idx + 1}`}
                      </span>
                      <span className="text-[rgb(30_24_20/.55)]">{note.note}</span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl font-normal text-[rgb(30_24_20)] group-hover:text-[rgb(186_104_40)] transition-colors">
                      {note.register[lang]}
                    </h3>
                    <p className="mt-2 font-sans text-xs font-light leading-relaxed text-[rgb(30_24_20/.7)]">
                      {note.desc[lang]}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-[rgb(30_24_20/.1)] pt-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                    <span className="truncate pr-2 text-[rgb(30_24_20/.55)]">
                      {note.work[lang]}
                    </span>
                    <span className="shrink-0 font-medium text-[rgb(186_104_40)]">
                      {active
                        ? lang === "de"
                          ? "● Klingt"
                          : "● Active"
                        : lang === "de"
                        ? "Hören →"
                        : "Play →"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Complete Discography & Live Film Vault on Cream */}
      <div className="relative mx-auto mt-20 max-w-[1280px] border-t border-[rgb(30_24_20/.12)] px-5 pt-20 md:px-10 md:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="ag-eyebrow">
              {lang === "de"
                ? "06 / Vollständige Diskographie & Live-Videos"
                : "06 / Complete Discography & Video Vault"}
            </p>
            <h2 className="mt-3 font-sans text-[clamp(2rem,4.8vw,4.6rem)] font-light uppercase leading-[0.96] tracking-[-0.035em] text-[rgb(30_24_20)]">
              {lang === "de" ? "ALLE " : "SELECTED "}
              <em className="font-serif italic font-normal normal-case text-[rgb(186_104_40)]">
                {lang === "de" ? "Meisterwerke." : "Recordings."}
              </em>
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[rgb(30_24_20/.55)]">
            {lang === "de" ? "6 verifizierte Alben & Singles" : "6 Verified Albums & Singles"}
          </span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DISCOGRAPHY.map((track, idx) => {
            const isSelected = activeTrack.id === track.id;
            return (
              <article
                key={track.id}
                data-pop
                onClick={() => {
                  setActiveTrack(track);
                  onPlayChord(track.fundamentalFreq);
                }}
                className={`pj ag-card group flex cursor-pointer flex-col justify-between rounded-[24px] p-5 ${
                  isSelected ? "!border-[rgb(186_104_40)]" : ""
                }`}
                style={{ ["--d" as string]: `${(idx % 3) * 65}ms` }}
              >
                <div>
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[rgb(30_24_20/.12)] shadow-md">
                      <picture>
                        <source media="(max-width: 767px)" srcSet={`${track.cover}-m.webp`} />
                        <img
                          src={`${track.cover}.webp`}
                          alt={track.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </picture>
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[rgb(186_104_40)]">
                        0{idx + 1} · {track.year}
                      </span>
                      <h3 className="mt-1 truncate font-serif text-2xl font-normal text-[rgb(30_24_20)]">
                        {track.title}
                      </h3>
                      <p className="truncate font-mono text-[10px] text-[rgb(30_24_20/.55)]">
                        {track.genre[lang]}
                      </p>
                    </div>
                  </div>

                  <span className="mt-4 inline-block rounded-full bg-[rgb(186_104_40/.12)] px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-[rgb(186_104_40)]">
                    {track.accolade[lang]}
                  </span>
                  <p className="mt-3 font-sans text-xs font-light leading-relaxed text-[rgb(30_24_20/.72)]">
                    {track.description[lang]}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[rgb(30_24_20/.1)] pt-3.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openVideo(track.ytId, track.title);
                    }}
                    className="ag-btn !px-3.5 !py-1.5 !text-[10px]"
                  >
                    ▶ {lang === "de" ? "Video" : "Video"}
                  </button>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[rgb(186_104_40)]">
                    ♪ {Math.round(track.fundamentalFreq)} Hz · {track.duration}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* 5. World Press Magazine Covers & Authentic Portrait Gallery on Warm Cream */}
      <div
        id="press"
        className="relative mx-auto mt-20 max-w-[1280px] border-t border-[rgb(30_24_20/.12)] px-5 pt-20 md:px-10 md:pt-28"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="ag-eyebrow">
              {lang === "de"
                ? "07 / Internationale Weltpresse & Titelgeschichten"
                : "07 / International Press & Cover Features"}
            </p>
            <h2 className="mt-3 font-sans text-[clamp(2rem,4.8vw,4.6rem)] font-light uppercase leading-[0.96] tracking-[-0.035em] text-[rgb(30_24_20)]">
              {lang === "de" ? "ECHO DER " : "VOICES OF "}
              <em className="font-serif italic font-normal normal-case text-[rgb(186_104_40)]">
                {lang === "de" ? "Weltpresse." : "Acclaim."}
              </em>
            </h2>
          </div>
          <p className="max-w-md font-sans text-xs font-light leading-relaxed text-[rgb(30_24_20/.7)] sm:text-sm">
            {lang === "de"
              ? "Originale Magazin-Cover aus Rolling Stone USA, Harper’s Bazaar USA, Vogue Miami, Vogue Athens und Cosmopolitan UK. Klicken zum Vergrössern."
              : "Authentic magazine covers from Rolling Stone USA, Harper’s Bazaar USA, Vogue Miami, Vogue Athens, and Cosmopolitan UK. Click any cover to inspect."}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PRESS_ARCHIVE.map((item, idx) => (
            <article
              key={item.id}
              data-pop
              onClick={() => setSelectedPress(item)}
              className="pj ag-card group flex cursor-pointer flex-col justify-between rounded-[22px] p-3.5"
              style={{ ["--d" as string]: `${(idx % 3) * 60}ms` }}
            >
              <div>
                <div className="relative aspect-[3/4.1] w-full overflow-hidden rounded-2xl border border-[rgb(30_24_20/.12)] shadow-md">
                  <picture>
                    <source media="(max-width: 767px)" srcSet={`${item.cover}-m.webp`} />
                    <img
                      src={`${item.cover}.webp`}
                      alt={item.publication}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </picture>
                </div>
                <div className="mt-3.5 px-1">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[rgb(186_104_40)]">
                    {item.publication}
                  </span>
                  <h3 className="mt-1 font-serif text-lg font-normal leading-snug text-[rgb(30_24_20)]">
                    {item.headline[lang]}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 font-sans text-xs font-light leading-relaxed text-[rgb(30_24_20/.68)]">
                    {item.quote[lang]}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[rgb(30_24_20/.08)] px-1 pt-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(186_104_40)]">
                <span>{item.issue.split("·")[0]}</span>
                <span>{lang === "de" ? "Lesen →" : "Read →"}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Concert Video Cinema Lightbox Modal */}
      {modalVideoId && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalVideoId(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-[#daa55c]/40 bg-[#140f0b] text-[#f6f0e6] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#daa55c]">
                  Elena Nuzman · Live Concert Cinema
                </span>
                <h4 className="font-serif text-xl">{modalVideoTitle}</h4>
              </div>
              <button
                type="button"
                onClick={() => setModalVideoId(null)}
                className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs uppercase text-[#f6f0e6] hover:border-[#daa55c]"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${modalVideoId}?autoplay=1&rel=0`}
                title={modalVideoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* Magazine Cover Reader Modal */}
      {selectedPress && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPress(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="grid w-full max-w-4xl gap-8 overflow-hidden rounded-3xl border border-[rgb(30_24_20/.15)] bg-[#f6f0e6] p-6 text-[rgb(30_24_20)] shadow-2xl md:grid-cols-12 md:p-10"
          >
            <div className="md:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[rgb(30_24_20/.12)] shadow-lg">
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
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.26em] text-[rgb(186_104_40)]">
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
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[rgb(30_24_20/.5)]">
                  {selectedPress.issue}
                </p>
                <h3 className="mt-5 font-serif text-3xl font-normal leading-tight text-[rgb(30_24_20)] sm:text-4xl">
                  {selectedPress.headline[lang]}
                </h3>
                <blockquote className="mt-6 border-l-2 border-[rgb(186_104_40)] pl-5 font-serif text-xl italic leading-relaxed text-[rgb(30_24_20/.85)]">
                  {selectedPress.quote[lang]}
                </blockquote>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-[rgb(30_24_20/.12)] pt-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgb(30_24_20/.5)]">
                  Verified Cover Feature
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPress(null)}
                  className="ag-btn ag-btn-solid"
                >
                  {lang === "de" ? "Schliessen" : "Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
