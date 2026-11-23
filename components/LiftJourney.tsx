"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "@/lib/copy";

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

interface Floor {
  id: string;
  dial: string;
  img: string;
  film: string;
  place: Record<Lang, string>;
  story: Record<Lang, string>;
  sub: Record<Lang, string>;
}

const FLOORS: Floor[] = [
  {
    id: "chisinau",
    dial: "1988 · CHISINAU",
    img: "/media/cinema-keys",
    film: "/media/cinema-keys",
    place: {
      de: "Station 01 · Moldawien & Elite-Lyzeum",
      en: "Station 01 · Moldova & Prodigy Academy",
    },
    story: {
      de: "«Mit zwei Jahren spielte sie Melodien nach Gehör. Mit sieben öffnete sich das Spezial-Lyzeum für Hochbegabte.»",
      en: "«At age two she played melodies strictly by ear. At seven, the elite academy for musical prodigies opened its doors.»",
    },
    sub: {
      de: "Tochter der Konzertpianistin Nina Kvasowa und des Geigenvirtuosen Josef Nuzman. Erste internationale Tourneen durch Russland, Frankreich und die USA mit siebzehn.",
      en: "Daughter of concert pianist Nina Kvasowa and violin virtuoso Josef Nuzman. International concert tours across Russia, France, and the USA by age seventeen.",
    },
  },
  {
    id: "dusseldorf",
    dial: "2006 · DÜSSELDORF",
    img: "/media/cinema-grand",
    film: "/media/cinema-grand",
    place: {
      de: "Station 02 · Robert Schumann Hochschule",
      en: "Station 02 · Robert Schumann Conservatory",
    },
    story: {
      de: "«Das Meisterdiplom am Konzertflügel – und die plötzliche Entdeckung einer Stimme über vier volle Oktaven.»",
      en: "«The Master Diploma at the concert grand—and the sudden discovery of a voice spanning four full octaves.»",
    },
    sub: {
      de: "Staatsexamen als Diplom-Konzertpianistin in Düsseldorf und 1. Preis beim nationalen Rock-Pop-Gesangswettbewerb.",
      en: "Graduating with her Master Degree as Concert Pianist in Düsseldorf while winning first prize in a premier national vocal competition.",
    },
  },
  {
    id: "berlin",
    dial: "2020 · BERLIN",
    img: "/media/cinema-stage",
    film: "/media/cinema-stage",
    place: {
      de: "Station 03 · Brandenburger Tor Silvester",
      en: "Station 03 · Brandenburg Gate New Year's Eve",
    },
    story: {
      de: "«Zwei Millionen Menschen am Brandenburger Tor. Wenn klassische Disziplin mit Stadion-Rock verschmilzt.»",
      en: "«Two million spectators at the Brandenburg Gate. Where classical discipline ignites into stadium rock.»",
    },
    sub: {
      de: "Live-Übertragung vor Millionenpublikum mit ihrer symphonischen Flügel-Adaption von Whitesnakes «Here I Go Again».",
      en: "Broadcast live to millions with her symphonic grand piano and four-octave rendition of Whitesnake’s 'Here I Go Again'.",
    },
  },
  {
    id: "world",
    dial: "2026 · WELTBÜHNE",
    img: "/media/cinema-vocal",
    film: "/media/cinema-vocal",
    place: {
      de: "Station 04 · Broadway, IMPALA Silver & My Piano And I",
      en: "Station 04 · Broadway, IMPALA Silver & My Piano And I",
    },
    story: {
      de: "«Über fünf Millionen Streams für Franz Liszts Liebesträume – und die Rückkehr zur reinen Essenz: My Piano And I.»",
      en: "«Over five million streams for Franz Liszt’s Liebesträume—and the return to pure acoustic intimacy: My Piano And I.»",
    },
    sub: {
      de: "IMPALA Silver Award, RTL Album des Jahres, persönliche ABBA-Autorisierung und Titelgeschichten von Rolling Stone bis Vogue.",
      en: "IMPALA Silver Award, RTL Album of the Year, personal ABBA composer authorization, and cover stories from Rolling Stone to Vogue.",
    },
  },
];

export default function LiftJourney({ lang }: { lang: Lang }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const mobile = matchMedia("(max-width: 767px)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doorL = el.querySelector<HTMLElement>("[data-l]")!;
    const doorR = el.querySelector<HTMLElement>("[data-r]")!;
    const dial = el.querySelector<HTMLElement>("[data-dial]")!;
    const needle = el.querySelector<HTMLElement>("[data-needle]")!;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-floor]"));
    const stories = Array.from(el.querySelectorAll<HTMLElement>("[data-story]"));
    const vids = layers.map((l) => l.querySelector("video") as HTMLVideoElement);
    const N = layers.length;
    let cur = -1;
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) {
        vids.forEach((v) => v?.pause());
        return;
      }
      const p = Math.min(0.9999, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      const f = p * N;
      const i = Math.floor(f);
      const q = f - i;

      // Brass doors close at transition between eras and glide open inside each era
      const open = smooth(0.08, 0.25, q) * (1 - smooth(0.82, 0.98, q));
      const first = i === 0 ? Math.max(open, 1 - smooth(0, 0.02, p)) : open;
      const o = i === 0 && p < 0.02 ? 0 : first;
      doorL.style.transform = `translate3d(${-o * 100}%, 0, 0)`;
      doorR.style.transform = `translate3d(${o * 100}%, 0, 0)`;

      // Art Deco brass needle rotates across the 4 stations
      const ang = -60 + ((i + smooth(0.84, 1, q)) / (N - 1 || 1)) * 120;
      needle.style.transform = `rotate(${Math.min(60, ang)}deg)`;

      if (i !== cur) {
        cur = i;
        layers.forEach((l, k) => (l.style.opacity = k === i ? "1" : "0"));
        dial.textContent = FLOORS[i].dial;
        vids.forEach((v, k) => {
          if (!v) return;
          if (k === i && !reduced) {
            const target = `${v.dataset.src}${mobile ? "-m" : ""}.mp4`;
            if (!v.src.endsWith(target)) v.src = target;
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      }

      stories.forEach((s, k) => {
        const on = k === i ? smooth(0.24, 0.38, q) * (1 - smooth(0.76, 0.88, q)) : 0;
        s.style.opacity = String(on);
        s.style.transform = `translate3d(0, ${(1 - on) * 18}px, 0)`;
      });
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [lang]);

  return (
    <section
      id="journey"
      ref={rootRef}
      className="lift relative"
      style={{ height: `${FLOORS.length * 165}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#120e0b]">
        {FLOORS.map((f, k) => (
          <div
            key={f.id}
            data-floor
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: k === 0 ? 1 : 0 }}
          >
            <picture aria-hidden>
              <source media="(max-width: 767px)" srcSet={`${f.img}-m.webp`} />
              <img
                src={`${f.img}.webp`}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
              />
            </picture>
            <video
              data-src={f.film}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
            />
          </div>
        ))}

        {/* Warm Espresso-Amber Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120e0b]/90 via-[#120e0b]/25 to-[#120e0b]/60"
        />

        {/* Brass Elevator Doors & Frame */}
        <div aria-hidden className="lift-frame pointer-events-none absolute inset-0 z-20">
          <div
            data-l
            className="lift-door lift-door-l absolute inset-y-0 left-0 w-1/2 will-change-transform"
          />
          <div
            data-r
            className="lift-door lift-door-r absolute inset-y-0 right-0 w-1/2 will-change-transform"
          />
        </div>

        {/* Art Deco Brass Floor Dial */}
        <div className="absolute left-1/2 top-20 z-30 -translate-x-1/2 text-center md:top-24">
          <div className="lift-dial relative mx-auto h-14 w-28 overflow-hidden md:h-20 md:w-40">
            <svg viewBox="0 0 160 80" className="absolute inset-0 h-full w-full" aria-hidden>
              <path
                d="M10 78 A70 70 0 0 1 150 78"
                fill="none"
                stroke="rgb(255 205 135 / 0.6)"
                strokeWidth="1.3"
              />
              {FLOORS.map((_, k) => {
                const a = (-60 + (k / (FLOORS.length - 1)) * 120) * (Math.PI / 180);
                return (
                  <circle
                    key={k}
                    cx={80 + Math.sin(a) * 62}
                    cy={78 - Math.cos(a) * 62}
                    r="2.6"
                    fill="rgb(255 205 135)"
                  />
                );
              })}
            </svg>
            <span
              data-needle
              className="absolute bottom-0 left-1/2 h-12 w-0.5 origin-bottom bg-[rgb(255_205_135)] shadow-[0_0_8px_rgb(255_205_135)] md:h-[68px]"
              style={{ transform: "rotate(-60deg)" }}
            />
          </div>
          <p
            data-dial
            className="mt-2 rounded-full border border-[rgb(255_205_135/.3)] bg-[#120e0b]/80 px-3.5 py-1 font-mono text-[11px] font-light tracking-[0.32em] text-[rgb(255_215_155)] backdrop-blur-md"
          >
            {FLOORS[0].dial}
          </p>
        </div>

        {/* Story Caption per Floor */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-12 md:px-12 md:pb-20 lg:px-16">
          <p className="ag-eyebrow">
            {lang === "de" ? "02 / Die Zeitreise · Vier Epochen" : "02 / The Time Journey · Four Eras"}
          </p>
          <div className="relative mt-4 min-h-[12.5rem] sm:min-h-[11rem] md:min-h-[12rem]">
            {FLOORS.map((f) => (
              <div
                key={f.id}
                data-story
                className="absolute inset-x-0 bottom-0"
                style={{ opacity: 0 }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[rgb(255_210_150)]">
                  {f.place[lang]}
                </p>
                <p className="mt-3 max-w-3xl font-serif text-[clamp(1.45rem,3.6vw,3.3rem)] italic leading-[1.12] text-[#f6f0e6]">
                  {f.story[lang]}
                </p>
                <p className="mt-3 max-w-2xl font-sans text-xs font-light leading-relaxed text-[#f6f0e6]/75 sm:text-sm">
                  {f.sub[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
