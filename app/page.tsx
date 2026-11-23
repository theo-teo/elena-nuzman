"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import VoiceWave from "@/components/VoiceWave";

interface Track {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  genre: string;
  accolade: string;
  duration: string;
  fundamentalFreq: number; // Hz for Web Audio preview
  description: string;
}

const DISCOGRAPHY: Track[] = [
  {
    id: "liebestraeume",
    title: "Liebesträume",
    subtitle: "Franz Liszt No. 3 · Vocal & Orchestral Crossover",
    year: "2016 / 2021",
    genre: "Romantic Classical · Crossover",
    accolade: "IMPALA Silver Award · Over 5M Global Streams",
    duration: "4:12",
    fundamentalFreq: 207.65, // Ab3
    description:
      "A monumental crossover milestone. Elena transforms Liszt's legendary nocturne into an emotionally soaring vocal piece, blending the sovereign touch of the Steinway with her four-octave vocal crescendo.",
  },
  {
    id: "my-piano-and-i",
    title: "My Piano And I",
    subtitle: "Solo Concert Grand & Intimate Vocals",
    year: "2025 Release",
    genre: "Pure Acoustic Studio Album",
    accolade: "Featured Studio Release 2025",
    duration: "3:48",
    fundamentalFreq: 174.61, // F3
    description:
      "Recorded in pure analog warmth without synthesis or artificial layers. Elena accompanies herself live on the concert grand, capturing every breath, mechanical damper lift, and harmonic decay.",
  },
  {
    id: "here-i-go-again",
    title: "Here I Go Again",
    subtitle: "Live at the Brandenburg Gate · Symphonic Rock",
    year: "New Year's Eve Live",
    genre: "Symphonic Rock & Classical Grand",
    accolade: "Broadcast Live to Millions on National Television",
    duration: "4:35",
    fundamentalFreq: 293.66, // D4
    description:
      "Her legendary Whitesnake interpretation performed live before an audience of millions at Berlin's Brandenburg Gate. Classical concert hall discipline meets the sheer explosive power of stadium rock.",
  },
  {
    id: "i-believe-in-you",
    title: "I Believe In You",
    subtitle: "Debut Album & Breakthrough Pop-Rock Ballads",
    year: "Debut",
    genre: "Classical Crossover & Pop",
    accolade: "RTL Album of the Year · Top 10 German Newcomer Charts",
    duration: "3:56",
    fundamentalFreq: 261.63, // C4
    description:
      "The album that launched Elena Nuzman onto the international radar. Awarded Album of the Year by RTL and rocketing directly into the Top 10 of Germany's newcomer charts.",
  },
  {
    id: "sieger-im-licht",
    title: "Nur die Sieger steh'n im Licht",
    subtitle: "The Winner Takes It All · Official German Adaption",
    year: "Special Release",
    genre: "Chamber Grand & Dramatic Vocal",
    accolade: "Authorized Personally by Benny Andersson & Björn Ulvaeus (ABBA)",
    duration: "4:24",
    fundamentalFreq: 220.0, // A3
    description:
      "An exceptionally rare honor: the legendary ABBA composers granted their direct, personal clearance for Elena Nuzman's German translation and grand piano interpretation.",
  },
];

export default function Home() {
  const [soundOn, setSoundOn] = useState(false);
  const [activeTrack, setActiveTrack] = useState<Track>(DISCOGRAPHY[0]);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [bookingTier, setBookingTier] = useState("Philharmonic Hall");
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Smooth Scroll via Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.1,
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

  // Web Audio Synthetic Grand Piano Resonator
  const playChord = (baseFreq = 103.83) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();

      // Harmonics ratios for warm acoustic grand piano feel
      const intervals = [1, 1.25, 1.5, 2, 2.5];
      intervals.forEach((ratio, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(
          baseFreq * ratio,
          ctx.currentTime + idx * 0.06
        );

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.14 / (idx + 1),
          ctx.currentTime + 0.08 + idx * 0.06
        );
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + 3.8);
      });
      setSoundOn(true);
    } catch {
      setSoundOn(true);
    }
  };

  const handleTrackSelect = (track: Track) => {
    setActiveTrack(track);
    setIsPlayingPreview(true);
    playChord(track.fundamentalFreq);
    setTimeout(() => setIsPlayingPreview(false), 3800);
  };

  return (
    <main className="relative min-h-screen bg-ink text-ivory selection:bg-gold selection:text-ink">
      {/* Top Floating Luxury Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-ivory/5 bg-ink/75 px-6 py-5 backdrop-blur-md md:px-12">
        <a href="#top" className="group flex items-center gap-3">
          <span className="font-serif text-lg tracking-[0.18em] text-ivory">
            ELENA <span className="font-normal italic text-gold">NUZMAN</span>
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ivory/40 sm:inline-block">
            / Concert Grand & Vocal
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-ivory/60 md:flex">
          <a href="#virtuosity" className="transition hover:text-gold">
            The Craft
          </a>
          <a href="#biography" className="transition hover:text-gold">
            Origins
          </a>
          <a href="#voice" className="transition hover:text-gold">
            Four Octaves
          </a>
          <a href="#repertoire" className="transition hover:text-gold">
            Repertoire
          </a>
          <a href="#booking" className="transition hover:text-gold">
            Inquiries
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => playChord(activeTrack.fundamentalFreq)}
            className="inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ebony/60 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-ivory/80 backdrop-blur transition hover:border-gold hover:text-gold"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                soundOn || isPlayingPreview
                  ? "bg-gold animate-ping"
                  : "bg-ivory/30"
              }`}
            />
            {isPlayingPreview
              ? "Resonating..."
              : soundOn
              ? "Re-play Chord"
              : "Experience Sound"}
          </button>
          <a
            href="#booking"
            className="hidden rounded-full bg-gold px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition hover:bg-ivory sm:inline-block"
          >
            Private Inquiries
          </a>
        </div>
      </header>

      {/* Act I · The Monolith (Prolog & Hero) */}
      <section
        id="top"
        className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-20 pt-36 md:px-12 md:pb-28"
      >
        {/* Chiaroscuro Atmospheric Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_15%,_rgba(212,175,55,0.08)_0%,_rgba(18,18,22,0.6)_45%,_#08080a_85%)]" />

        {/* Ambient Subtle Geometric Soundboard Silhouette */}
        <div className="pointer-events-none absolute right-4 top-24 -z-10 h-[65vw] max-h-[700px] w-[65vw] max-w-[700px] opacity-15">
          <svg viewBox="0 0 500 500" className="h-full w-full stroke-gold/40 fill-none" strokeWidth="0.8">
            <circle cx="250" cy="250" r="240" strokeDasharray="3 6" />
            <circle cx="250" cy="250" r="180" />
            <circle cx="250" cy="250" r="110" strokeDasharray="2 4" />
            <path d="M 50 250 C 150 100, 350 100, 450 250 C 350 400, 150 400, 50 250" />
            <path d="M 120 180 L 380 320" />
            <path d="M 120 320 L 380 180" />
          </svg>
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <p className="font-mono text-xs uppercase tracking-[0.38em] text-gold">
              Concert Pianist · 4-Octave Vocalist · Composer
            </p>
          </div>

          <h1 className="mt-8 font-serif text-[clamp(2.9rem,8.2vw,8.8rem)] font-light leading-[0.92] tracking-tight text-ivory">
            A CONCERT GRAND.<br />
            <span className="font-normal italic text-gold">Four octaves.</span><br />
            PURE GRAVITY.
          </h1>

          <div className="mt-14 grid gap-8 border-t border-line pt-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-ivory/65 md:text-base">
                Master graduate of the prestigious Robert Schumann University of Music Düsseldorf. 
                Shattering the classical divide by merging the sovereign touch of Franz Liszt with four octaves of stadium vocal power.
              </p>
            </div>
            <div className="flex flex-col items-start gap-1 font-mono text-[11px] uppercase tracking-widest text-ivory/40 md:col-span-5 md:items-end">
              <span>Robert Schumann Hochschule Alumni</span>
              <span className="text-gold/80">Impala Silver Award Laureate</span>
              <span>Düsseldorf · New York · Worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Act II · The Discipline (88 Tasten & Handwerk) */}
      <section id="virtuosity" className="border-t border-line py-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl grid gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
              01 / The Instrument
            </span>
            <h2 className="mt-6 font-serif text-4xl font-light leading-tight md:text-6xl">
              88 Keys.<br />
              <em className="font-normal italic text-gold">Uncompromising discipline.</em>
            </h2>
            <p className="mt-8 text-sm font-light leading-relaxed text-ivory/70 md:text-base">
              A concert grand piano harbors over twelve thousand individual mechanical components. 
              Under Elena Nuzman’s hands, it becomes an instrument of telepathic precision—every felt hammer strike calibrated to evoke sheer emotional vulnerability.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 text-xs uppercase tracking-widest text-ivory/50">
              <div>
                <p className="font-serif text-2xl text-gold">Master</p>
                <p className="mt-1 font-sans text-[11px] tracking-wider text-ivory/60">Diplom-Konzertpianistin</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-gold">Schumann</p>
                <p className="mt-1 font-sans text-[11px] tracking-wider text-ivory/60">Hochschule Düsseldorf</p>
              </div>
            </div>
          </div>

          {/* Luxury Visual Stage Card · Piano Macro Visual Placeholder */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold/20 bg-ebony md:col-span-7">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.06)_0%,_transparent_70%)]" />
            
            {/* Elegant Wireframe Schematic Placeholder */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-gold/60">
                <span>STEINWAY & SONS · CONCERT GRAND</span>
                <span>88 KEYS · 243 STRINGS</span>
              </div>

              {/* Graphic Representation of Piano Action & Strings */}
              <div className="my-auto space-y-3 py-6 opacity-40">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
                <div className="h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-ivory/30 to-transparent" />
                <div className="h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                <div className="flex justify-center gap-2 pt-4">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-16 w-3 rounded-b-sm transition-all duration-300 ${
                        i % 2 === 0 ? "bg-ivory/80" : "bg-ink border border-ivory/30 h-10 -mt-0.5"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <blockquote className="font-serif text-2xl italic leading-relaxed text-ivory/90 md:text-3xl">
                  «The piano is not just an instrument. It is an extension of bone, thought, and breath.»
                </blockquote>
                <p className="mt-4 font-mono text-xs uppercase tracking-widest text-gold/70">
                  — Elena Nuzman · Concert Pianist
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Act III · The Prodigy Roots & Origins (Biografie) */}
      <section id="biography" className="border-t border-line bg-ebony/30 py-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
                02 / Origins & Dynasty
              </span>
              <h2 className="mt-6 font-serif text-4xl font-light md:text-6xl">
                The Heritage of Virtuosity.
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm font-light text-ivory/50">
              Born into a celebrated lineage of classical musicians in Moldova. Playing melodies by ear at age two; touring international concert halls by seventeen.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              {
                year: "Age 2",
                title: "Musical Genesis",
                desc: "Born 1981 in Moldova to concert pianist Nina Kvasowa and violin virtuoso/actor Josef Nuzman. Began playing complex classical themes strictly by ear.",
              },
              {
                year: "Age 7",
                title: "Elite Lyceum",
                desc: "Admitted to the renowned state academy for prodigies. Rigorous training across Russian, French, and German classical traditions.",
              },
              {
                year: "Düsseldorf",
                title: "Schumann Hochschule",
                desc: "Relocated to Germany to complete her Master of Music / Diplom-Konzertpianistin under premier European piano pedagogues.",
              },
              {
                year: "Global",
                title: "Worldwide Stages",
                desc: "From Manhattan’s Broadway to Berlin's Brandenburg Gate, commanding audiences of millions with simultaneous piano & vocal mastery.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group relative rounded-xl border border-line bg-ink/70 p-8 transition hover:border-gold/40"
              >
                <span className="font-mono text-xs text-gold">{card.year}</span>
                <h3 className="mt-4 font-serif text-2xl font-light text-ivory group-hover:text-gold transition">
                  {card.title}
                </h3>
                <p className="mt-4 text-xs font-light leading-relaxed text-ivory/60">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Act IV · The Metamorphosis (Vier Oktaven & Live Wave) */}
      <section id="voice" className="border-t border-line py-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
              03 / The Metamorphosis
            </span>
            <h2 className="mt-6 font-serif text-4xl font-light leading-tight md:text-7xl">
              When the concert grand<br />
              <em className="font-normal italic text-gold">begins to sing.</em>
            </h2>
            <p className="mt-8 text-base font-light leading-relaxed text-ivory/70 md:text-lg">
              Classical concert halls demand restraint. Stadium rock demands surrender. Elena Nuzman commands both simultaneously. With an extraordinary vocal register spanning **four full octaves**, she accompanies herself live on the Steinway, shattering the boundary between Franz Liszt and epic rock.
            </p>

            {/* Live Gold Acoustic Visualizer */}
            <div className="mt-12 rounded-2xl border border-gold/30 bg-ebony/60 p-6 backdrop-blur">
              <div className="flex items-center justify-between border-b border-line pb-4 text-xs uppercase tracking-widest text-gold/80">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
                  Live Acoustic Resonance & Vocal Wave
                </span>
                <span className="font-mono text-ivory/40">E3 — E7 (4 Octaves)</span>
              </div>
              <div className="py-6">
                <VoiceWave fallback={soundOn || isPlayingPreview ? 0.9 : 0.3} height={85} />
              </div>
              <div className="flex justify-between border-t border-line pt-3 font-mono text-[10px] uppercase text-ivory/40">
                <span>Bass Register: Chest Resonance</span>
                <span>Head Register: Whistle / Operatic Soprano</span>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {[
              {
                badge: "IMPALA SILVER",
                title: "Liebesträume",
                desc: "Awarded the international Impala Silver Award for millions of global streams. Her vocal adaptation of Franz Liszt's Liebestraum No. 3.",
              },
              {
                badge: "BROADWAY",
                title: "Manhattan Stages",
                desc: "Celebrated live soloist performances across premier musical showcases in New York City.",
              },
              {
                badge: "MILLIONS LIVE",
                title: "Brandenburg Gate",
                desc: "Headlining the national New Year's Eve broadcast with her symphonic rock performance of 'Here I Go Again'.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group relative rounded-xl border border-line bg-ink/80 p-8 transition hover:border-gold/40"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-gold/70">
                  {card.badge}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-light text-ivory">
                  {card.title}
                </h3>
                <p className="mt-4 text-xs font-light leading-relaxed text-ivory/60">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Act V · The Archive (Diskographie & Track Player) */}
      <section id="repertoire" className="border-t border-line bg-ebony/40 py-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
                04 / Selected Works
              </span>
              <h2 className="mt-6 font-serif text-4xl font-light md:text-6xl">
                The Discography.
              </h2>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-ivory/40">
              Click Any Track for Harmonic Resonance
            </p>
          </div>

          <div className="mt-16 space-y-4">
            {DISCOGRAPHY.map((track, idx) => {
              const isSelected = activeTrack.id === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handleTrackSelect(track)}
                  className={`group flex cursor-pointer flex-col justify-between rounded-xl border p-6 transition md:flex-row md:items-center ${
                    isSelected
                      ? "border-gold bg-ink/90 shadow-[0_0_30px_rgba(212,175,55,0.12)]"
                      : "border-line bg-ebony/30 hover:border-gold/40"
                  }`}
                >
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-gold">0{idx + 1}</span>
                      <h3
                        className={`font-serif text-2xl font-light transition ${
                          isSelected ? "text-gold" : "text-ivory group-hover:text-gold"
                        }`}
                      >
                        {track.title}
                      </h3>
                      <span className="hidden font-mono text-[11px] text-ivory/40 sm:inline-block">
                        ({track.year})
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-ivory/70">{track.subtitle}</p>
                    <p className="mt-3 text-xs font-light text-ivory/50">{track.description}</p>
                    <span className="mt-3 inline-block rounded-full border border-gold/30 bg-gold/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gold">
                      {track.accolade}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-6 md:mt-0">
                    <div className="text-right font-mono text-xs text-ivory/40">
                      <span>{track.genre}</span>
                    </div>
                    <button
                      type="button"
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                        isSelected
                          ? "border-gold bg-gold text-ink"
                          : "border-ivory/20 text-ivory group-hover:border-gold group-hover:text-gold"
                      }`}
                    >
                      {isSelected ? "▶" : "♪"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Act VI · The Audience (Private Inquiry & Booking) */}
      <section id="booking" className="border-t border-line py-32 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.38em] text-gold">
              05 / Private Inquiries
            </span>
            <h2 className="mt-6 font-serif text-4xl font-light md:text-7xl">
              Engage the Grand.
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-sm font-light leading-relaxed text-ivory/60 md:text-base">
              Discreet booking engagements for philharmonic halls, international festivals, luxury galas, and private residence concerts.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                `Thank you for your inquiry. Elena Nuzman's management will review your request for: ${bookingTier}.`
              );
            }}
            className="mt-16 rounded-2xl border border-line bg-ebony/40 p-8 md:p-12"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-ivory/50">
                  Your Name / Institution
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tonhalle Düsseldorf / Private Client"
                  className="mt-2 w-full rounded-lg border border-line bg-ink px-4 py-3 text-sm text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-ivory/50">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="management@client.com"
                  className="mt-2 w-full rounded-lg border border-line bg-ink px-4 py-3 text-sm text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block font-mono text-[11px] uppercase tracking-widest text-ivory/50">
                Performance Context
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  "Philharmonic Hall",
                  "Gala & Festival",
                  "Private Soirée",
                  "Crossover Recital",
                ].map((tier) => (
                  <button
                    type="button"
                    key={tier}
                    onClick={() => setBookingTier(tier)}
                    className={`rounded-lg border px-3 py-3 font-mono text-[11px] uppercase tracking-wider transition ${
                      bookingTier === tier
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-line bg-ink text-ivory/60 hover:border-ivory/40"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="block font-mono text-[11px] uppercase tracking-widest text-ivory/50">
                Confidential Inquiry Details
              </label>
              <textarea
                rows={4}
                placeholder="Preferred date, location, concert grand availability (Steinway D/B preferred), and audience scope."
                className="mt-2 w-full rounded-lg border border-line bg-ink px-4 py-3 text-sm text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="w-full rounded-full bg-gold px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink font-medium transition hover:bg-ivory sm:w-auto"
              >
                Transmit Inquiry
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-ink py-16 px-6 text-center text-xs text-ivory/40 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-serif text-lg tracking-wider text-ivory">
            ELENA <span className="text-gold italic">NUZMAN</span>
          </p>
          <p className="font-mono text-[11px] tracking-widest">
            MASTER GRADUATE ROBERT SCHUMANN HOCHSCHULE · ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-6 font-mono text-[11px] uppercase tracking-widest text-ivory/60">
            <a href="#top" className="hover:text-gold transition">
              Back to Top
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
