"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import EmotionHero from "@/components/EmotionHero";
import Kinetic from "@/components/Kinetic";
import VoiceWave from "@/components/VoiceWave";

interface Track {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  genre: string;
  accolade: string;
  duration: string;
  fundamentalFreq: number;
  cover: string;
  description: string;
}

const DISCOGRAPHY: Track[] = [
  {
    id: "liebestraeume",
    title: "Liebesträume",
    subtitle: "Franz Liszt No. 3 · Vocal & Orchestral Crossover",
    year: "2016 / 2021",
    genre: "Romantic Classical · Crossover",
    accolade: "IMPALA Silver Award · Over 5M Streams",
    duration: "4:12",
    fundamentalFreq: 207.65, // Ab3
    cover: "/images/real/album-liebestraum.jpg",
    description:
      "A soaring crossover milestone. Elena transforms Liszt’s legendary nocturne into an emotionally charged vocal anthem, uniting the sovereign resonance of the Steinway with her four-octave operatic register.",
  },
  {
    id: "my-piano-and-i",
    title: "My Piano And I",
    subtitle: "Solo Concert Grand & Intimate Live Vocals",
    year: "2025 Studio Album",
    genre: "Pure Acoustic Grand & Voice",
    accolade: "Featured Masterpiece 2025",
    duration: "3:48",
    fundamentalFreq: 174.61, // F3
    cover: "/images/real/album-my-piano-and-i.jpg",
    description:
      "Captured in pure acoustic intimacy. Just Elena, the Steinway grand, and a studio microphone. Every breath, felt hammer lift, and harmonic pedal decay speaks of unfiltered truth.",
  },
  {
    id: "here-i-go-again",
    title: "Here I Go Again",
    subtitle: "Live at the Brandenburg Gate · Symphonic Rock",
    year: "Berlin NYE Live",
    genre: "Symphonic Stadium Rock",
    accolade: "Broadcast Live to Millions on National Television",
    duration: "4:35",
    fundamentalFreq: 293.66, // D4
    cover: "/images/real/elena-brandenburger-tor.jpg",
    description:
      "Elena’s acclaimed Whitesnake interpretation performed live before an audience of millions at Berlin's iconic Brandenburg Gate, marrying classical discipline with rock-and-roll ecstasy.",
  },
  {
    id: "i-believe-in-you",
    title: "I Believe In You",
    subtitle: "Debut Studio Album & Breakthrough Ballads",
    year: "Debut Album",
    genre: "Classical Crossover Ballads",
    accolade: "RTL Album of the Year · Top 10 German Newcomer Charts",
    duration: "3:56",
    fundamentalFreq: 261.63, // C4
    cover: "/images/real/elena-press-portrait.jpg",
    description:
      "The album that heralded Elena Nuzman onto the European stage. Voted Album of the Year by RTL and rocketing directly into the Top 10 German newcomer charts.",
  },
  {
    id: "sieger-im-licht",
    title: "Nur die Sieger steh'n im Licht",
    subtitle: "The Winner Takes It All · Official German Adaption",
    year: "Special Release",
    genre: "Dramatic Chamber Grand",
    accolade: "Personally Authorized by Benny Andersson & Björn Ulvaeus (ABBA)",
    duration: "4:24",
    fundamentalFreq: 220.0, // A3
    cover: "/images/real/elena-stage-live.jpg",
    description:
      "An exceptionally rare honor: the legendary ABBA founders granted Elena their direct, personal clearance for her German translation and impassioned grand piano arrangement.",
  },
];

export default function Home() {
  const [soundOn, setSoundOn] = useState(false);
  const [activeTrack, setActiveTrack] = useState<Track>(DISCOGRAPHY[0]);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [bookingTier, setBookingTier] = useState("Philharmonic Hall");
  const [submitted, setSubmitted] = useState(false);
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
  const playChord = (baseFreq = 207.65) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();

      const ratios = [1, 1.25, 1.5, 2, 2.5];
      ratios.forEach((ratio, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(
          baseFreq * ratio,
          ctx.currentTime + idx * 0.04
        );

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.16 / (idx + 1),
          ctx.currentTime + 0.06 + idx * 0.04
        );
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.04);
        osc.stop(ctx.currentTime + 4.0);
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
    <div className="min-h-screen bg-[#050506] text-[#f2efea] selection:bg-[#d4af37]/30 selection:text-[#f2efea]">
      {/* Floating Glass Pill Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-700">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12 md:py-6">
          <a href="#top" className="flex items-center gap-3" aria-label="Elena Nuzman">
            <span className="font-sans text-sm tracking-widest uppercase text-paper font-light">
              Elena <span className="text-[#d4af37] italic font-serif">Nuzman</span>
            </span>
          </a>

          <nav className="ag-glass hidden items-center gap-1 rounded-full px-3 py-1.5 md:flex">
            {[
              ["Virtuosity", "#manifest"],
              ["Origins", "#origins"],
              ["Four Octaves", "#voice"],
              ["Repertoire", "#repertoire"],
              ["Inquiries", "#booking"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-4 py-1.5 font-sans text-xs uppercase tracking-widest text-paper/70 transition-colors hover:text-paper hover:bg-white/[0.06]"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => playChord(activeTrack.fundamentalFreq)}
              className="ag-btn"
            >
              <span className={`ag-dot ${soundOn ? "animate-pulse" : "opacity-40"}`} />
              <span className="hidden sm:inline">
                {soundOn ? "Sound On" : "Experience Sound"}
              </span>
            </button>
            <a href="#booking" className="ag-btn ag-btn-solid">
              Inquire
            </a>
          </div>
        </div>
      </header>

      {/* Act I · EmotionHero (Interactive Layer Stack) */}
      <EmotionHero onPlayChord={playChord} soundOn={soundOn || isPlayingPreview} />

      {/* Act II · Kinetic Manifest (Word for Word Scroll Reveal) */}
      <section id="manifest" className="relative py-36 px-6 md:px-16 border-t border-white/[0.08]">
        <div className="mx-auto max-w-5xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37]">
            01 / The Instrument & Virtuosity
          </span>

          <h2 className="mt-8 font-serif text-3xl font-light leading-snug sm:text-5xl md:text-6xl text-paper">
            <Kinetic
              text="A concert grand is not merely an instrument. It is an extension of bone, thought, and breath."
              as="span"
              step={24}
            />
          </h2>

          <div className="mt-14 grid gap-10 border-t border-white/[0.08] pt-10 md:grid-cols-12 md:items-start">
            <p className="font-sans text-sm font-light leading-relaxed text-paper/70 md:col-span-8 md:text-base">
              Over twelve thousand mechanical parts calibrated to sheer acoustic resonance. Under Elena Nuzman’s touch, classical rigor and romantic lyricism merge seamlessly with the unbridled vocal power of a stadium stage.
            </p>
            <div className="font-mono text-xs uppercase tracking-widest text-paper/40 md:col-span-4 md:text-right">
              <span className="text-[#d4af37] block">Robert Schumann Hochschule</span>
              <span className="block mt-1">Diplom-Konzertpianistin</span>
            </div>
          </div>
        </div>
      </section>

      {/* Act III · The Origins & Heritage (Stationen als Lichtkarten) */}
      <section id="origins" className="py-36 px-6 md:px-16 border-t border-white/[0.08] bg-[#08080a]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                02 / Origins & Dynasty
              </span>
              <h2 className="mt-6 text-3xl font-light sm:text-5xl md:text-6xl text-paper">
                The Heritage of Virtuosity.
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm font-light text-paper/50">
              Born 1981 in Moldova to concert pianist Nina Kvasowa and violin virtuoso Josef Nuzman. Playing melodies by ear at age two; touring international concert halls by seventeen.
            </p>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                idx: "01",
                year: "Age 2",
                title: "Musical Genesis",
                desc: "Replicating intricate classical themes strictly by ear. Admitted to the prestigious elite academy for musical prodigies at age seven.",
              },
              {
                idx: "02",
                year: "Academy",
                title: "European Touring",
                desc: "Intensive training across Russian, French, and German classical traditions. Solo performances in concert halls across Russia, France, and the USA by seventeen.",
              },
              {
                idx: "03",
                year: "Düsseldorf",
                title: "Schumann Hochschule",
                desc: "Graduating with the highest academic honor: Master Degree / Diplom-Konzertpianistin under premier European pedagogues.",
              },
              {
                idx: "04",
                year: "Global",
                title: "World Stages",
                desc: "From Manhattan’s Broadway to Berlin’s Brandenburg Gate, commanding audiences of millions with simultaneous piano & vocal mastery.",
              },
            ].map((card) => (
              <div key={card.idx} className="ag-card rounded-2xl p-8 flex flex-col justify-between min-h-[300px]">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-paper/40">
                    <span>{card.idx}</span>
                    <span className="text-[#d4af37]">{card.year}</span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-light text-paper">
                    {card.title}
                  </h3>
                  <p className="mt-4 font-sans text-xs font-light leading-relaxed text-paper/60">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-8 border-t border-white/[0.08] pt-4 font-mono text-[10px] uppercase tracking-widest text-paper/30">
                  Verified Milestone
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Act IV · The Metamorphosis (Four Octaves & Live Acoustic Wave) */}
      <section id="voice" className="py-36 px-6 md:px-16 border-t border-white/[0.08]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                03 / The Metamorphosis
              </span>
              <h2 className="mt-6 text-4xl font-light leading-tight sm:text-6xl text-paper">
                When the grand<br />
                <em className="font-serif italic font-normal text-[#d4af37]">
                  begins to sing.
                </em>
              </h2>
              <p className="mt-8 font-sans text-sm font-light leading-relaxed text-paper/70 sm:text-base">
                Classical concert halls demand restraint. Stadium rock demands total surrender. Elena Nuzman commands both simultaneously. With an extraordinary vocal register spanning **four full octaves**, she accompanies herself live on the Steinway, dissolving the wall between Franz Liszt and stadium rock.
              </p>

              {/* Live Gold Acoustic Waveform */}
              <div className="mt-12 rounded-2xl border border-white/[0.1] bg-white/[0.02] p-6 backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                  <span className="flex items-center gap-2">
                    <span className="ag-dot" />
                    Live Acoustic Waveform
                  </span>
                  <span className="text-paper/40">E3 — E7 (4 Octaves)</span>
                </div>
                <div className="py-6">
                  <VoiceWave
                    fallback={soundOn || isPlayingPreview ? 0.95 : 0.3}
                    height={85}
                  />
                </div>
                <div className="flex justify-between border-t border-white/[0.08] pt-3 font-mono text-[10px] uppercase text-paper/40">
                  <span>Chest Voice (Alto)</span>
                  <span>Operatic Whistle (Soprano)</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:col-span-6">
              {[
                {
                  badge: "IMPALA SILVER",
                  title: "Liebesträume",
                  desc: "Awarded the international Impala Silver Award for millions of global streams. Her vocal adaptation of Franz Liszt's Liebestraum No. 3.",
                },
                {
                  badge: "BROADWAY",
                  title: "Manhattan Showcases",
                  desc: "Celebrated live soloist performances across premier musical showcases and theater stages in New York City.",
                },
                {
                  badge: "MILLIONS LIVE",
                  title: "Brandenburg Gate",
                  desc: "Headlining the national New Year's Eve broadcast with her symphonic rock performance of 'Here I Go Again'.",
                },
              ].map((item, i) => (
                <div key={i} className="ag-card rounded-2xl p-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#d4af37]">
                    {item.badge}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-light text-paper">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-sans text-xs font-light leading-relaxed text-paper/60">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Act V · Selected Repertoire & Interactive Sound Stage */}
      <section id="repertoire" className="py-36 px-6 md:px-16 border-t border-white/[0.08] bg-[#08080a]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                04 / Selected Works
              </span>
              <h2 className="mt-6 text-3xl font-light sm:text-5xl md:text-6xl text-paper">
                The Discography.
              </h2>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
              Click to preview harmonic resonance
            </p>
          </div>

          <div className="mt-16 space-y-4">
            {DISCOGRAPHY.map((track, idx) => {
              const isSelected = activeTrack.id === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handleTrackSelect(track)}
                  className={`group flex cursor-pointer flex-col justify-between rounded-2xl border p-6 transition md:flex-row md:items-center ${
                    isSelected
                      ? "border-[#d4af37] bg-white/[0.04] shadow-[0_0_35px_rgba(212,175,55,0.15)]"
                      : "border-white/[0.08] bg-white/[0.015] hover:border-white/[0.2]"
                  }`}
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center max-w-3xl">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/[0.1]">
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-[#d4af37]">0{idx + 1}</span>
                        <h3
                          className={`font-serif text-2xl font-light transition ${
                            isSelected ? "text-[#d4af37]" : "text-paper group-hover:text-[#d4af37]"
                          }`}
                        >
                          {track.title}
                        </h3>
                        <span className="hidden font-mono text-[11px] text-paper/40 sm:inline">
                          ({track.year})
                        </span>
                      </div>
                      <p className="mt-2 font-sans text-xs text-paper/70">{track.subtitle}</p>
                      <p className="mt-3 font-sans text-xs font-light text-paper/50 leading-relaxed">
                        {track.description}
                      </p>
                      <span className="mt-3 inline-block rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#d4af37]">
                        {track.accolade}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-6 md:mt-0">
                    <div className="text-right font-mono text-xs text-paper/40">
                      <span>{track.genre}</span>
                      <span className="block text-[10px] text-paper/30">{track.duration}</span>
                    </div>
                    <button
                      type="button"
                      className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
                        isSelected
                          ? "border-[#d4af37] bg-[#d4af37] text-[#050506]"
                          : "border-white/20 text-paper group-hover:border-[#d4af37] group-hover:text-[#d4af37]"
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

      {/* Act VI · Discreet Inquiries (Booking Concierge) */}
      <section id="booking" className="py-36 px-6 md:px-16 border-t border-white/[0.08]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37]">
              05 / Private Inquiries
            </span>
            <h2 className="mt-6 font-serif text-4xl font-light md:text-7xl text-paper">
              Engage the Grand.
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-sm font-light leading-relaxed text-paper/60">
              Discreet booking engagements for philharmonic halls, international festivals, luxury galas, and private residence concerts worldwide.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="ag-card mt-16 rounded-3xl p-8 md:p-12"
          >
            {submitted ? (
              <div className="py-12 text-center">
                <span className="ag-dot mx-auto mb-4" />
                <h3 className="font-serif text-3xl font-light text-paper">
                  Inquiry Received With Discretion.
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm text-paper/60">
                  Thank you. Management will review your performance request for{" "}
                  <span className="text-[#d4af37]">{bookingTier}</span> and connect with your team shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-widest text-paper/50">
                      Your Name / Institution
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tonhalle Düsseldorf / Private Client"
                      className="mt-2 w-full rounded-xl border border-white/[0.1] bg-[#050506] px-4 py-3.5 text-sm text-paper placeholder-paper/20 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-widest text-paper/50">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="management@client.com"
                      className="mt-2 w-full rounded-xl border border-white/[0.1] bg-[#050506] px-4 py-3.5 text-sm text-paper placeholder-paper/20 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-paper/50">
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
                        className={`rounded-xl border px-3 py-3 font-mono text-[11px] uppercase tracking-wider transition ${
                          bookingTier === tier
                            ? "border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]"
                            : "border-white/[0.1] bg-[#050506] text-paper/60 hover:border-white/30"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-paper/50">
                    Confidential Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Preferred date, location, concert grand availability (Steinway D/B preferred), and audience scope."
                    className="mt-2 w-full rounded-xl border border-white/[0.1] bg-[#050506] px-4 py-3.5 text-sm text-paper placeholder-paper/20 focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <button type="submit" className="ag-btn ag-btn-solid w-full sm:w-auto">
                    Transmit Inquiry
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-16 px-6 md:px-16 text-center text-xs text-paper/40">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-sans text-sm tracking-widest uppercase text-paper">
            Elena <span className="text-[#d4af37] italic font-serif">Nuzman</span>
          </p>
          <p className="font-mono text-[11px] tracking-widest">
            MASTER GRADUATE ROBERT SCHUMANN HOCHSCHULE · ALL RIGHTS RESERVED
          </p>
          <a href="#top" className="font-mono text-[11px] uppercase tracking-widest hover:text-[#d4af37] transition">
            Back to Top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
