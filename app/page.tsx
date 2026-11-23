"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";

/* ---------- Data: The Works & Program ---------- */
interface ProgramMovement {
  number: string;
  title: string;
  opus: string;
  movement: string;
  year: string;
  accolade: string;
  duration: string;
  freq: number;
  cover: string;
  character: string;
  notes: string;
}

const MOVEMENTS: ProgramMovement[] = [
  {
    number: "I",
    title: "Liebesträume",
    opus: "Op. 62 / No. 3",
    movement: "Andante espressivo con voce",
    year: "2016 / 2021",
    accolade: "IMPALA Silver Award · Over 5M Streams",
    duration: "4:12",
    freq: 207.65, // Ab3
    cover: "/images/real/album-liebestraum.jpg",
    character: "Romantic Transmutation",
    notes:
      "A monumental crossover milestone. Elena transmutes Franz Liszt’s legendary piano nocturne into an operatic vocal tour-de-force, accompanying herself live at the Steinway.",
  },
  {
    number: "II",
    title: "My Piano And I",
    opus: "Studio Master 2025",
    movement: "Largo intimo e rubato",
    year: "2025 Release",
    accolade: "Featured Masterpiece 2025",
    duration: "3:48",
    freq: 174.61, // F3
    cover: "/images/real/album-my-piano-and-i.jpg",
    character: "Pure Acoustic Intimacy",
    notes:
      "Recorded in pure acoustic authenticity. Just the concert grand, Elena’s voice, and zero digital pitch correction. Every mechanical hammer release and harmonic pedal decay speaks.",
  },
  {
    number: "III",
    title: "Here I Go Again",
    opus: "Symphonic Arena Edition",
    movement: "Allegro feroce con fuoco",
    year: "Live Brandenburg Gate",
    accolade: "Broadcast Live to Millions on National TV",
    duration: "4:35",
    freq: 293.66, // D4
    cover: "/images/real/elena-brandenburger-tor.jpg",
    character: "Stadium Crossover",
    notes:
      "Her celebrated Whitesnake interpretation performed live at Berlin’s Brandenburg Gate on New Year's Eve, marrying classical piano rigor with the sheer explosive electricity of arena rock.",
  },
  {
    number: "IV",
    title: "I Believe In You",
    opus: "Debut Opus 2009",
    movement: "Moderato maestoso",
    year: "Debut Release",
    accolade: "RTL Album of the Year · Top 10 Charts",
    duration: "3:56",
    freq: 261.63, // C4
    cover: "/images/real/elena-press-portrait.jpg",
    character: "The Breakthrough",
    notes:
      "Voted Album of the Year by RTL and rocketing directly into the Top 10 German newcomer charts, marking the arrival of a rare dual-talent virtuosic phenomenon.",
  },
  {
    number: "V",
    title: "Nur die Sieger steh'n im Licht",
    opus: "The Winner Takes It All",
    movement: "Grave drammatico",
    year: "Official Clearance",
    accolade: "Personally Authorized by Benny Andersson & Björn Ulvaeus (ABBA)",
    duration: "4:24",
    freq: 220.0, // A3
    cover: "/images/real/elena-stage-live.jpg",
    character: "Official Masterwork Clearance",
    notes:
      "An exceptionally rare honor: the legendary ABBA founders granted Elena their direct, personal clearance for her German translation and impassioned grand piano arrangement.",
  },
];

export default function Home() {
  const [activeMovement, setActiveMovement] = useState<ProgramMovement>(MOVEMENTS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [faderPosition, setFaderPosition] = useState(35); // 0 = Pure Liszt, 100 = Pure Stadium Rock
  const [selectedOctave, setSelectedOctave] = useState<number | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [inquiryType, setInquiryType] = useState("Philharmonic Hall Recital");
  const [transmitted, setTransmitted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Smooth Lenis Scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Web Audio Synthetic Piano Resonator with Crossover Fader
  const playHarmonics = (baseFreq = 207.65, distortion = 0) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();

      const ratios = [1, 1.25, 1.5, 2, 2.5, 3];
      const isRock = distortion > 50;

      ratios.forEach((ratio, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Waveform morphs from warm pure sine/triangle to rich sawtooth based on fader
        osc.type = isRock ? (idx % 2 === 0 ? "sawtooth" : "square") : (idx === 0 ? "triangle" : "sine");
        osc.frequency.setValueAtTime(baseFreq * ratio, ctx.currentTime + idx * 0.03);

        const peak = isRock ? 0.08 / (idx + 1) : 0.16 / (idx + 1);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(peak, ctx.currentTime + 0.05 + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.03);
        osc.stop(ctx.currentTime + 3.8);
      });
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3800);
    } catch {
      setIsPlaying(false);
    }
  };

  const REAL_PHOTOS = [
    {
      src: "/images/real/elena-grand-1.jpg",
      caption: "Elena Nuzman seated at the Steinway Concert Grand",
      sub: "Concert Hall Series · Steinway D-274",
    },
    {
      src: "/images/real/elena-grand-2.jpg",
      caption: "Virtuoso touch and simultaneous vocal projection",
      sub: "Robert Schumann Hochschule Master Discipline",
    },
    {
      src: "/images/real/elena-brandenburger-tor.jpg",
      caption: "Headlining the Brandenburg Gate NYE broadcast",
      sub: "Broadcast Live to Millions of Television Viewers",
    },
    {
      src: "/images/real/elena-impala-award.jpg",
      caption: "Elena Nuzman with the IMPALA Silver Award",
      sub: "For over 5 Million Global Streams of Liebesträume",
    },
  ];

  const OCTAVES = [
    {
      octave: "1st Octave",
      range: "E3 — B3",
      register: "Contralto / Chest Resonance",
      vibe: "Warm, dark, velvety chest timber. The foundation where acoustic piano bass notes and chest voice intertwine.",
      hz: "164 Hz — 246 Hz",
    },
    {
      octave: "2nd Octave",
      range: "C4 — B4",
      register: "Mezzo-Soprano / Speech Level",
      vibe: "Lyrical storytelling register. Clear Lisztian text articulation and melodic purity.",
      hz: "261 Hz — 493 Hz",
    },
    {
      octave: "3rd Octave",
      range: "C5 — B5",
      register: "Full Dramatic Soprano",
      vibe: "The crossover explosion. Power belting and stadium rock dynamics cutting over full orchestral fortissimos.",
      hz: "523 Hz — 987 Hz",
    },
    {
      octave: "4th Octave",
      range: "C6 — E7",
      register: "Flageolet & Whistle Register",
      vibe: "Operatic stratosphere. Piercing, crystalline high frequencies reaching beyond the traditional concert soprano limit.",
      hz: "1046 Hz — 2637 Hz",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070606] text-[#f4efe8] selection:bg-[#c5a059] selection:text-[#070606]">
      {/* ---------- Architectural Top Header (Philharmonic Arch) ---------- */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#c5a059]/20 bg-[#070606]/90 px-6 py-4 backdrop-blur-md md:px-14">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <a href="#top" className="flex flex-col">
            <span className="font-serif text-xl tracking-[0.25em] text-[#f4efe8]">
              ELENA <span className="italic text-[#c5a059]">NUZMAN</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#c5a059]/70">
              Konzertpianistin · 4-Oktaven Sängerin
            </span>
          </a>

          {/* Minimalist Concert Navigation */}
          <nav className="hidden items-center gap-10 font-mono text-[11px] uppercase tracking-[0.22em] text-[#f4efe8]/70 md:flex">
            <a href="#overture" className="hover:text-[#c5a059] transition">
              01 / Ouvertüre
            </a>
            <a href="#dual-soul" className="hover:text-[#c5a059] transition">
              02 / Dualität
            </a>
            <a href="#four-octaves" className="hover:text-[#c5a059] transition">
              03 / Das 4-Oktaven-Spektrum
            </a>
            <a href="#program" className="hover:text-[#c5a059] transition">
              04 / Programmheft
            </a>
            <a href="#patronage" className="hover:text-[#c5a059] transition">
              05 / Audienz
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => playHarmonics(activeMovement.freq, faderPosition)}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#c5a059]/40 bg-[#14100c] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#c5a059] hover:bg-[#c5a059] hover:text-[#070606] transition"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? "bg-[#c5a059] animate-ping" : "bg-[#c5a059]/50"}`} />
              {isPlaying ? "Klang Resoniert..." : "Klang Erleben"}
            </button>
            <a
              href="#patronage"
              className="hidden rounded-full bg-[#c5a059] px-5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#070606] hover:bg-[#f4efe8] transition sm:inline-block"
            >
              Engagement
            </a>
          </div>
        </div>
      </header>

      {/* ---------- ACT I · THE OVERTURE (Asymmetric Editorial Stage) ---------- */}
      <section
        id="overture"
        className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-14 md:pb-24"
      >
        {/* Architectural Stage Halo Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,_rgba(197,160,89,0.12)_0%,_rgba(10,9,8,0.85)_55%,_#070606_90%)]" />

        <div className="mx-auto w-full max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            {/* Left Column: Monographic Editorial Typography */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 border border-[#c5a059]/30 bg-[#120f0c] px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c5a059]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
                  Absolventin der Robert Schumann Hochschule Düsseldorf
                </span>
              </div>

              <h1 className="mt-8 font-serif text-[clamp(2.8rem,7vw,7.4rem)] font-light leading-[0.92] tracking-tight text-[#f4efe8]">
                DAS CHIAROSCURO<br />
                <span className="italic text-[#c5a059]">des Konzertflügels.</span><br />
                VIER OKTAVEN GEWALT.
              </h1>

              <div className="mt-10 max-w-xl border-l-2 border-[#c5a059]/40 pl-6">
                <p className="font-sans text-sm font-light leading-relaxed text-[#f4efe8]/75 md:text-base">
                  Wenn die strenge Meisterschaft der klassischen Romantik auf die ungezähmte Wucht von vier Oktaven Stimmumfang trifft, entsteht keine bloße Musik – es entsteht eine Naturgewalt. Elena Nuzman begleitet sich selbst live am Steinway-Flügel.
                </p>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-8 font-mono text-xs text-[#c5a059]">
                <div>
                  <span className="block text-2xl font-serif text-[#f4efe8]">88</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#f4efe8]/40">Tasten Mechanik</span>
                </div>
                <div className="h-8 w-px bg-[#c5a059]/20" />
                <div>
                  <span className="block text-2xl font-serif text-[#f4efe8]">4.0</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#f4efe8]/40">Oktaven Umfang</span>
                </div>
                <div className="h-8 w-px bg-[#c5a059]/20" />
                <div>
                  <span className="block text-2xl font-serif text-[#f4efe8]">5M+</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#f4efe8]/40">Streams · Impala Silver</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Editorial Frame with Interactive Gallery */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-[#c5a059]/30 bg-[#0e0c0a] p-3 shadow-2xl">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                  <Image
                    src={REAL_PHOTOS[activePhoto].src}
                    alt={REAL_PHOTOS[activePhoto].caption}
                    fill
                    priority
                    className="object-cover object-center transition-all duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070606] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-4 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#c5a059]">
                      Dokument 0{activePhoto + 1} / 04
                    </span>
                    <span className="font-mono text-[10px] text-[#f4efe8]/40">
                      {REAL_PHOTOS[activePhoto].sub}
                    </span>
                  </div>
                  <p className="mt-2 font-serif text-lg italic text-[#f4efe8]">
                    {REAL_PHOTOS[activePhoto].caption}
                  </p>

                  {/* Thumbnail Selector */}
                  <div className="mt-4 flex gap-2 border-t border-[#c5a059]/15 pt-3">
                    {REAL_PHOTOS.map((photo, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActivePhoto(i)}
                        className={`relative h-12 w-12 overflow-hidden rounded-lg border transition ${
                          activePhoto === i
                            ? "border-[#c5a059] shadow-[0_0_12px_rgba(197,160,89,0.5)]"
                            : "border-white/10 opacity-50 hover:opacity-100"
                        }`}
                      >
                        <Image src={photo.src} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ACT II · THE DUALITY (Liszt vs. Rock Slider) ---------- */}
      <section id="dual-soul" className="relative border-t border-[#c5a059]/20 bg-[#0a0807] py-32 px-6 md:px-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#c5a059]">
              02 / Das künstlerische Spannungsfeld
            </span>
            <h2 className="mt-4 font-serif text-3xl font-light sm:text-5xl md:text-6xl text-[#f4efe8]">
              Zwei Seelen. <em className="italic text-[#c5a059]">Ein Instrument.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm font-light text-[#f4efe8]/70 md:text-base">
              Verstellen Sie den interaktiven Regler: Erleben Sie, wie sich die Identität von Elena Nuzman von der puristischen Strenge der Robert Schumann Hochschule in die explosive Energie der Rock-Bühne am Brandenburger Tor verwandelt.
            </p>
          </div>

          {/* Interactive Duality Fader */}
          <div className="mt-16 rounded-3xl border border-[#c5a059]/30 bg-[#0f0c0a] p-8 md:p-12 shadow-2xl">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              {/* Left Pole: Classical Rigor */}
              <div
                className={`transition-opacity duration-500 ${
                  faderPosition <= 50 ? "opacity-100" : "opacity-40"
                }`}
              >
                <span className="font-mono text-xs uppercase tracking-widest text-[#c5a059]">
                  Pol I · Die Klassische Virtuosin
                </span>
                <h3 className="mt-2 font-serif text-3xl text-[#f4efe8]">
                  Franz Liszt & Schumann Tradition
                </h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-[#f4efe8]/70">
                  Studium an der renommierten Robert Schumann Hochschule Düsseldorf. Abschluss als Diplom-Konzertpianistin. Höchste pianistische Fingerfertigkeit, millimetergenaue Anschlagskultur und die Fähigkeit, selbst die komplexesten Liszt-Transkriptionen mit federleichter Eleganz zu spielen.
                </p>
                <div className="mt-6 flex gap-4 font-mono text-[11px] text-[#c5a059]">
                  <span className="border border-[#c5a059]/30 px-3 py-1">Master Diplom</span>
                  <span className="border border-[#c5a059]/30 px-3 py-1">Steinway D-274</span>
                </div>
              </div>

              {/* Right Pole: Stadium Rock Power */}
              <div
                className={`border-t border-[#c5a059]/20 pt-6 md:border-l md:border-t-0 md:pl-8 transition-opacity duration-500 ${
                  faderPosition > 50 ? "opacity-100" : "opacity-40"
                }`}
              >
                <span className="font-mono text-xs uppercase tracking-widest text-[#e8893a]">
                  Pol II · Das Stadium-Crossover
                </span>
                <h3 className="mt-2 font-serif text-3xl text-[#f4efe8]">
                  4 Oktaven Rock & Broadway
                </h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-[#f4efe8]/70">
                  Live vor Millionen Menschen am Brandenburger Tor (Whitesnakes «Here I Go Again»). Gesangliche Auszeichnung von RTL (Album des Jahres). Ein Stimmregister, das mühelos vom warmen Alt-Brustton in die Stratosphäre des Koloratur-Pfeifregisters wechselt.
                </p>
                <div className="mt-6 flex gap-4 font-mono text-[11px] text-[#e8893a]">
                  <span className="border border-[#e8893a]/30 px-3 py-1">Silvester Live</span>
                  <span className="border border-[#e8893a]/30 px-3 py-1">E3 bis E7</span>
                </div>
              </div>
            </div>

            {/* The Physical Fader Controller */}
            <div className="mt-12 border-t border-[#c5a059]/20 pt-8">
              <div className="flex justify-between font-mono text-xs uppercase tracking-widest text-[#f4efe8]/60">
                <span className={faderPosition < 40 ? "text-[#c5a059] font-bold" : ""}>
                  ← Klassische Kontemplation
                </span>
                <span className="text-center font-bold text-[#c5a059]">
                  {faderPosition}% Crossover-Balance
                </span>
                <span className={faderPosition > 60 ? "text-[#e8893a] font-bold" : ""}>
                  Stadium-Power →
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={faderPosition}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setFaderPosition(val);
                  playHarmonics(activeMovement.freq, val);
                }}
                className="mt-4 w-full h-2 cursor-pointer appearance-none rounded-lg bg-[#201a14] accent-[#c5a059]"
              />
              <p className="mt-3 text-center font-mono text-[11px] text-[#f4efe8]/40">
                Ziehen Sie den Regler, um die klangliche Färbung in Echtzeit zu transformieren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ACT III · THE 4-OCTAVE SPECTRUM (Acoustic Compass) ---------- */}
      <section id="four-octaves" className="relative border-t border-[#c5a059]/20 py-32 px-6 md:px-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#c5a059]">
                03 / Akustische Anatomie
              </span>
              <h2 className="mt-4 font-serif text-3xl font-light sm:text-5xl md:text-6xl text-[#f4efe8]">
                Der 4-Oktaven-Kompass.
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm font-light text-[#f4efe8]/60">
              Ein Stimmumfang, der im klassischen Konzertbetrieb eine absolute Rarität darstellt: Von tiefen Kontra-Alt-Frequenzen bis in die unerreichte Höhe des Pfeifregisters.
            </p>
          </div>

          {/* Interactive Octave Spectrum Ribbon */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OCTAVES.map((oct, idx) => {
              const isSelected = selectedOctave === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedOctave(idx);
                    playHarmonics(164 * Math.pow(1.5, idx), faderPosition);
                  }}
                  className={`group cursor-pointer rounded-2xl border p-8 transition-all duration-300 ${
                    isSelected
                      ? "border-[#c5a059] bg-[#1a140e] shadow-[0_0_30px_rgba(197,160,89,0.25)] scale-[1.02]"
                      : "border-[#c5a059]/20 bg-[#0e0b08] hover:border-[#c5a059]/50 hover:bg-[#130f0b]"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs text-[#c5a059]">
                    <span>0{idx + 1} / 04</span>
                    <span>{oct.hz}</span>
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-light text-[#f4efe8] group-hover:text-[#c5a059] transition">
                    {oct.octave}
                  </h3>
                  <p className="font-mono text-xs text-[#c5a059]/80 mt-1">{oct.range}</p>
                  <p className="mt-2 text-xs font-semibold text-[#f4efe8]/90">{oct.register}</p>
                  <p className="mt-4 text-xs font-light leading-relaxed text-[#f4efe8]/60">
                    {oct.vibe}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[#c5a059]/20 pt-4 font-mono text-[10px] text-[#c5a059]">
                    <span>Frequenz-Resonanz</span>
                    <span>{isSelected ? "▶ AKTIV" : "♪ ANHÖREN"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- ACT IV · THE PROGRAMME PLAYBILL (Das Konzert-Programm) ---------- */}
      <section id="program" className="relative border-t border-[#c5a059]/20 bg-[#090807] py-32 px-6 md:px-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#c5a059]">
                04 / Tondokumente & Repertoire
              </span>
              <h2 className="mt-4 font-serif text-3xl font-light sm:text-5xl md:text-6xl text-[#f4efe8]">
                Das Programmheft.
              </h2>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#c5a059]">
              Ausgewählte Sätze aus ihrem Schaffen
            </p>
          </div>

          {/* Curated Movement List */}
          <div className="mt-16 divide-y divide-[#c5a059]/15 border-y border-[#c5a059]/20">
            {MOVEMENTS.map((mov) => {
              const isCurrent = activeMovement.number === mov.number;
              return (
                <div
                  key={mov.number}
                  onClick={() => {
                    setActiveMovement(mov);
                    playHarmonics(mov.freq, faderPosition);
                  }}
                  className={`group flex cursor-pointer flex-col justify-between py-8 transition-colors md:flex-row md:items-center ${
                    isCurrent ? "bg-[#14100c]/60 px-6 rounded-xl" : "hover:bg-[#0f0c09] px-2"
                  }`}
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center max-w-4xl">
                    {/* Real Album Cover Thumbnail */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#c5a059]/30 shadow-lg">
                      <Image
                        src={mov.cover}
                        alt={mov.title}
                        fill
                        className="object-cover object-center transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-xl italic text-[#c5a059]">
                          Satz {mov.number}
                        </span>
                        <h3 className="font-serif text-2xl font-light text-[#f4efe8] group-hover:text-[#c5a059] transition">
                          {mov.title}
                        </h3>
                        <span className="hidden font-mono text-[11px] text-[#f4efe8]/40 sm:inline">
                          ({mov.opus})
                        </span>
                      </div>
                      <p className="mt-1 font-serif text-xs italic text-[#c5a059]/80">
                        {mov.movement}
                      </p>
                      <p className="mt-2 text-xs font-light text-[#f4efe8]/65 leading-relaxed">
                        {mov.notes}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] text-[#c5a059]">
                        <span className="h-1 w-1 rounded-full bg-[#c5a059]" />
                        {mov.accolade}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-6 md:mt-0">
                    <span className="font-mono text-xs text-[#f4efe8]/40">{mov.duration}</span>
                    <button
                      type="button"
                      className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
                        isCurrent
                          ? "border-[#c5a059] bg-[#c5a059] text-[#070606] shadow-[0_0_20px_rgba(197,160,89,0.4)]"
                          : "border-[#c5a059]/30 text-[#c5a059] group-hover:border-[#c5a059] group-hover:bg-[#c5a059]/10"
                      }`}
                    >
                      {isCurrent ? "▶" : "♪"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- ACT V · THE SALON INQUIRY (Patronage & Engagement) ---------- */}
      <section id="patronage" className="relative border-t border-[#c5a059]/20 py-32 px-6 md:px-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#c5a059]">
              05 / Konzertdirektion & Privatresidenzen
            </span>
            <h2 className="mt-4 font-serif text-4xl font-light sm:text-6xl text-[#f4efe8]">
              Die Audienz am Flügel.
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-sm font-light text-[#f4efe8]/70 md:text-base">
              Diskrete Buchungsanfragen für internationale Philharmonien, Festival-Headlines, festliche Galas und private Salon-Konzerte weltweit.
            </p>
          </div>

          {/* Luxury Debossed Inscription Card */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setTransmitted(true);
            }}
            className="mt-16 rounded-3xl border border-[#c5a059]/40 bg-[#0e0b08] p-8 md:p-14 shadow-2xl"
          >
            {transmitted ? (
              <div className="py-12 text-center">
                <span className="inline-block h-3 w-3 rounded-full bg-[#c5a059] animate-ping" />
                <h3 className="mt-4 font-serif text-3xl font-light text-[#f4efe8]">
                  Anfrage mit Diskretion übermittelt.
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm text-[#f4efe8]/60">
                  Vielen Dank. Das Management von Elena Nuzman wird Ihre Konzertanfrage für{" "}
                  <span className="text-[#c5a059] font-medium">{inquiryType}</span> vertraulich prüfen und sich mit Ihnen in Verbindung setzen.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#c5a059]">
                      Veranstalter / Institution / Patron
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="z. B. Tonhalle Düsseldorf / Stiftung / Privat"
                      className="mt-2 w-full rounded-xl border border-[#c5a059]/20 bg-[#14100c] px-4 py-3.5 text-sm text-[#f4efe8] placeholder-[#f4efe8]/20 focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#c5a059]">
                      Vertrauliche E-Mail-Adresse
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="direktion@konzerthaus.de"
                      className="mt-2 w-full rounded-xl border border-[#c5a059]/20 bg-[#14100c] px-4 py-3.5 text-sm text-[#f4efe8] placeholder-[#f4efe8]/20 focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#c5a059]">
                    Konzert- & Aufführungsrahmen
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      "Philharmonic Hall Recital",
                      "Symphonic Festival Headline",
                      "Private Salon & Residence",
                      "Crossover Gala Soirée",
                    ].map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setInquiryType(tier)}
                        className={`rounded-xl border p-3 font-mono text-[10px] uppercase tracking-wider transition ${
                          inquiryType === tier
                            ? "border-[#c5a059] bg-[#c5a059]/20 text-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.2)]"
                            : "border-white/10 bg-[#14100c] text-[#f4efe8]/60 hover:border-[#c5a059]/40"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#c5a059]">
                    Vertrauliche Details (Termin, Flügelmodell, Rahmen)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Gewünschter Aufführungstermin, Konzertort, Flügel vor Ort (Steinway D/B bevorzugt), Orchesterbegleitung oder Solo."
                    className="mt-2 w-full rounded-xl border border-[#c5a059]/20 bg-[#14100c] px-4 py-3.5 text-sm text-[#f4efe8] placeholder-[#f4efe8]/20 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#c5a059] px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#070606] shadow-[0_0_25px_rgba(197,160,89,0.3)] hover:bg-[#f4efe8] transition sm:w-auto"
                  >
                    Anfrage Vertraulich Übermitteln
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>

      {/* ---------- Architectural Footer ---------- */}
      <footer className="border-t border-[#c5a059]/20 py-16 px-6 md:px-14 text-center text-xs text-[#f4efe8]/40">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-serif text-lg tracking-widest text-[#f4efe8]">
            ELENA <span className="italic text-[#c5a059]">NUZMAN</span>
          </p>
          <p className="font-mono text-[10px] tracking-widest">
            MASTER GRADUATE ROBERT SCHUMANN HOCHSCHULE DÜSSELDORF · ALL RIGHTS RESERVED
          </p>
          <a
            href="#top"
            className="font-mono text-[10px] uppercase tracking-widest text-[#c5a059] hover:underline"
          >
            Zurück zur Ouvertüre ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
