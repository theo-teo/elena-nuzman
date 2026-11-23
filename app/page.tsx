"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import VoiceWave from "@/components/VoiceWave";
import HarmonicAtmosphere from "@/components/HarmonicAtmosphere";
import {
  Play,
  Volume2,
  VolumeX,
  Sparkles,
  Award,
  Music,
  ArrowRight,
  CheckCircle2,
  Compass,
} from "lucide-react";

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
  mood: string;
}

const DISCOGRAPHY: Track[] = [
  {
    id: "liebestraeume",
    title: "Liebesträume",
    subtitle: "Franz Liszt No. 3 · Vocal & Orchestral Crossover",
    year: "2016 / 2021",
    genre: "Romantic Classical · Symphonic Pop",
    accolade: "IMPALA Silver Award · Over 5M Global Streams",
    duration: "4:12",
    fundamentalFreq: 207.65, // Ab3
    description:
      "A radiant triumph of emotional warmth. Elena transforms Franz Liszt's immortal romantic nocturne into a soaring vocal anthem, uniting the sovereign resonance of the Steinway with four octaves of operatic crescendo.",
    mood: "Lyrical · Passionate · Soaring",
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
    description:
      "Recorded in pure acoustic authenticity. Just Elena, the grand piano, and an unfiltered microphone. Every breath, mechanical hammer release, and rich pedal decay speaks of genuine musical joy.",
    mood: "Intimate · Radiant · Pure Soul",
  },
  {
    id: "here-i-go-again",
    title: "Here I Go Again",
    subtitle: "Live at the Brandenburg Gate · Symphonic Rock",
    year: "Berlin NYE Broadcast",
    genre: "Symphonic Stadium Rock",
    accolade: "Broadcast Live to Millions on National Television",
    duration: "4:35",
    fundamentalFreq: 293.66, // D4
    description:
      "Pure unbridled energy. Elena's celebrated rock interpretation performed live before an audience of millions at Berlin's iconic Brandenburg Gate, marrying classical discipline with rock-and-roll ecstasy.",
    mood: "Triumphant · Electric · Ecstatic",
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
    description:
      "The breakout record that captured European hearts. Voted Album of the Year by RTL and rocketing directly into the Top 10, heralding the arrival of an exceptional dual-threat artist.",
    mood: "Uplifting · Poignant · Majestic",
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
    description:
      "An extraordinary milestone: the legendary ABBA founders granted Elena their rare personal clearance for her German translation and impassioned grand piano arrangement.",
    mood: "Epic · Nostalgic · Grand",
  },
];

export default function Home() {
  const [soundOn, setSoundOn] = useState(false);
  const [activeTrack, setActiveTrack] = useState<Track>(DISCOGRAPHY[0]);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [bookingTier, setBookingTier] = useState("Philharmonic Hall");
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  // Web Audio Synthetic Grand Piano Resonator with Warm Harmonics
  const playChord = (baseFreq = 207.65) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();

      // Warm acoustic grand piano harmonic series (root, 3rd, 5th, octave, 10th)
      const ratios = [1, 1.25, 1.498, 2, 2.5];
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
    <main className="relative min-h-screen bg-ink text-ivory selection:bg-gold selection:text-ink">
      {/* Living Ambient Particle Atmosphere (Gold & Amber Motes) */}
      <HarmonicAtmosphere soundActive={soundOn || isPlayingPreview} />

      {/* Radiant Floating Luxury Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-gold/15 bg-ink/80 px-6 py-5 backdrop-blur-xl md:px-12">
        <a href="#top" className="group flex items-center gap-3">
          <span className="font-serif text-lg tracking-[0.2em] text-ivory group-hover:text-gold transition">
            ELENA <span className="font-normal italic text-gold">NUZMAN</span>
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-gold/60 sm:inline-block">
            / Virtuoso Concert Grand & 4-Octave Vocalist
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-ivory/70 md:flex">
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
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ebony/70 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-gold backdrop-blur transition hover:bg-gold hover:text-ink"
          >
            {soundOn ? (
              <Volume2 className="h-3.5 w-3.5 text-gold animate-pulse" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 opacity-60" />
            )}
            {isPlayingPreview
              ? "Harmonics Resonating..."
              : soundOn
              ? "Re-play Chord"
              : "Experience Sound"}
          </button>
          <a
            href="#booking"
            className="hidden rounded-full bg-gold px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink shadow-[0_0_20px_rgba(212,175,55,0.25)] transition hover:bg-ivory sm:inline-block"
          >
            Private Inquiries
          </a>
        </div>
      </header>

      {/* Act I · The Monolith & Radiance (Hero & Prolog) */}
      <section
        id="top"
        className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-20 pt-36 md:px-12 md:pb-28"
      >
        {/* Dynamic Warm Amber & Golden Radial Stage Backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_15%,_rgba(232,137,58,0.18)_0%,_rgba(212,175,55,0.08)_35%,_#08080a_80%)]" />

        {/* Ambient Warm Golden Flare */}
        <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[140px]" />

        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold shadow-[0_0_8px_#d4af37]" />
            <p className="font-mono text-xs uppercase tracking-[0.38em] text-gold">
              Concert Pianist · 4-Octave Vocalist · Composer
            </p>
          </div>

          <h1 className="mt-8 font-serif text-[clamp(2.9rem,8.2vw,8.8rem)] font-light leading-[0.92] tracking-tight text-ivory">
            THE PASSION OF KEYS.<br />
            <span className="font-normal italic text-gold">Four octaves.</span><br />
            RADIANT GRAVITY.
          </h1>

          <div className="mt-14 grid gap-8 border-t border-gold/20 pt-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-ivory/80 md:text-base">
                Master graduate of the legendary Robert Schumann University of Music Düsseldorf. 
                Infusing the sovereign precision of Franz Liszt with the infectious warmth, charisma, and four-octave vocal power that commands international stadium and philharmonic stages.
              </p>
            </div>
            <div className="flex flex-col items-start gap-1 font-mono text-[11px] uppercase tracking-widest text-ivory/50 md:col-span-5 md:items-end">
              <span className="text-gold">Robert Schumann Hochschule Master Alumni</span>
              <span className="text-ivory/80">IMPALA Silver Award Laureate</span>
              <span>Düsseldorf · New York · Worldwide</span>
            </div>
          </div>

          {/* Hero Emotional Showcase Image */}
          <div className="relative mt-14 overflow-hidden rounded-3xl border border-gold/30 bg-ebony shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
              <Image
                src="/images/hero-radiance.jpg"
                alt="Elena Nuzman at the Steinway Concert Grand Piano"
                fill
                priority
                className="object-cover object-center transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-4 md:bottom-10 md:left-10 md:right-10 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-gold">
                  LIVE CONCERT GRAND EXPERIENCE
                </span>
                <p className="mt-2 font-serif text-2xl font-light text-ivory md:text-3xl">
                  «Music is not silent austerity. It is warmth, ecstasy, and human connection.»
                </p>
              </div>
              <button
                type="button"
                onClick={() => playChord(207.65)}
                className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-ink/80 px-6 py-3 font-mono text-xs uppercase tracking-widest text-gold backdrop-blur transition hover:bg-gold hover:text-ink"
              >
                <Sparkles className="h-4 w-4" />
                Resonate Liszt Chord
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Act II · The Discipline (88 Tasten & Handwerk) */}
      <section id="virtuosity" className="border-t border-gold/15 py-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl grid gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
              01 / The Instrument
            </span>
            <h2 className="mt-6 font-serif text-4xl font-light leading-tight md:text-6xl">
              88 Keys.<br />
              <em className="font-normal italic text-gold">Twelve thousand parts in harmony.</em>
            </h2>
            <p className="mt-8 text-sm font-light leading-relaxed text-ivory/75 md:text-base">
              A master concert grand is a breathing organism of bronze strings, cast iron, and hornbeam action. Under Elena Nuzman’s hands, mechanical friction dissolves: the keyboard responds with liquid warmth, shifting seamlessly from whispered Lisztian lyricism to percussive stadium rock.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-gold/15 pt-6 text-xs uppercase tracking-widest text-ivory/60">
              <div>
                <p className="font-serif text-3xl text-gold">Master</p>
                <p className="mt-1 font-mono text-[11px] tracking-wider text-ivory/70">
                  Diplom-Konzertpianistin
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl text-gold">Düsseldorf</p>
                <p className="mt-1 font-mono text-[11px] tracking-wider text-ivory/70">
                  Robert Schumann Hochschule
                </p>
              </div>
            </div>
          </div>

          {/* Real Emotional Visual: Craft Hands Macro */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/30 bg-ebony shadow-[0_10px_40px_rgba(212,175,55,0.15)] md:col-span-7">
            <Image
              src="/images/craft-hands.jpg"
              alt="Virtuoso hands on Steinway ivory keys"
              fill
              className="object-cover object-center transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-gold">
                  ACOUSTIC VELOCITY & TOUCH
                </p>
                <p className="font-serif text-lg italic text-ivory">
                  From pianissimo whisper to forte fortissimo
                </p>
              </div>
              <span className="font-mono text-xs text-gold/70">88 KEYS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Act III · The Prodigy Roots & Origins (Biografie) */}
      <section id="biography" className="border-t border-gold/15 bg-ebony/30 py-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
                02 / Origins & Dynasty
              </span>
              <h2 className="mt-6 font-serif text-4xl font-light md:text-6xl">
                The Heritage of Musical Joy.
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm font-light text-ivory/60">
              Born into a celebrated lineage in Moldova. Playing melodies by ear at age two; touring international concert halls across Russia, France, and the USA by seventeen.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              {
                year: "Age 2",
                title: "Musical Genesis",
                desc: "Born 1981 in Moldova to concert pianist Nina Kvasowa and violin virtuoso/actor Josef Nuzman. Replicating intricate classical themes strictly by ear.",
              },
              {
                year: "Age 7",
                title: "Elite Academy",
                desc: "Admitted to the renowned state lyceum for gifted prodigies. Steeped in the profound traditions of Chopin, Beethoven, and Rachmaninoff.",
              },
              {
                year: "Düsseldorf",
                title: "Schumann Hochschule",
                desc: "Relocating to Germany, graduating with the coveted Master Diplom-Konzertpianistin under premier European piano pedagogues.",
              },
              {
                year: "Global",
                title: "Worldwide Stages",
                desc: "From Manhattan’s Broadway to Berlin's Brandenburg Gate, captivating millions with her radiant stage presence and four-octave voice.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-gold/15 bg-ink/80 p-8 shadow-lg transition hover:border-gold/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.12)]"
              >
                <span className="font-mono text-xs font-bold text-gold">{card.year}</span>
                <h3 className="mt-4 font-serif text-2xl font-light text-ivory group-hover:text-gold transition">
                  {card.title}
                </h3>
                <p className="mt-4 text-xs font-light leading-relaxed text-ivory/65">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Act IV · The Metamorphosis (Vier Oktaven & Live Wave) */}
      <section id="voice" className="border-t border-gold/15 py-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
                03 / The Metamorphosis
              </span>
              <h2 className="mt-6 font-serif text-4xl font-light leading-tight md:text-7xl">
                When the concert grand<br />
                <em className="font-normal italic text-gold">begins to sing.</em>
              </h2>
              <p className="mt-8 text-base font-light leading-relaxed text-ivory/80 md:text-lg">
                Classical halls demand restraint. Stadium rock demands total surrender. Elena Nuzman commands both simultaneously. With an extraordinary vocal register spanning **four full octaves**, she accompanies herself live on the Steinway, dissolving the wall between Liszt and stadium rock.
              </p>

              {/* Live Gold Acoustic Visualizer */}
              <div className="mt-10 rounded-2xl border border-gold/30 bg-ebony/70 p-6 backdrop-blur shadow-[0_0_40px_rgba(212,175,55,0.1)]">
                <div className="flex items-center justify-between border-b border-gold/15 pb-4 text-xs uppercase tracking-widest text-gold">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
                    Live 4-Octave Acoustic Resonance
                  </span>
                  <span className="font-mono text-ivory/50">E3 — E7 (4 Octaves)</span>
                </div>
                <div className="py-6">
                  <VoiceWave
                    fallback={soundOn || isPlayingPreview ? 0.95 : 0.35}
                    height={85}
                  />
                </div>
                <div className="flex justify-between border-t border-gold/15 pt-3 font-mono text-[10px] uppercase text-ivory/50">
                  <span>Chest Resonance (Warm Alto)</span>
                  <span>Operatic Whistle & Soprano</span>
                </div>
              </div>
            </div>

            {/* Vocal Passion Visual Card */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-gold/40 bg-ebony shadow-[0_15px_50px_rgba(212,175,55,0.2)] md:col-span-6">
              <Image
                src="/images/vocal-passion.jpg"
                alt="Elena Nuzman singing passionately at the concert grand"
                fill
                className="object-cover object-center transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-xs uppercase tracking-widest text-gold">
                  SIMULTANEOUS PIANO & VOCAL MASTERY
                </span>
                <p className="mt-2 font-serif text-2xl font-light text-ivory">
                  Accompanying herself live at full vocal power
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {[
              {
                badge: "IMPALA SILVER",
                title: "Liebesträume",
                desc: "Awarded the prestigious Impala Silver Award for millions of global streams. Her vocal adaptation of Franz Liszt's Liebestraum No. 3.",
              },
              {
                badge: "BROADWAY",
                title: "Manhattan Stages",
                desc: "Celebrated live soloist performances across premier musical showcases and theater stages in New York City.",
              },
              {
                badge: "MILLIONS LIVE",
                title: "Brandenburg Gate",
                desc: "Headlining the national New Year's Eve broadcast with her symphonic rock performance of 'Here I Go Again'.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-gold/15 bg-ink/80 p-8 shadow-lg transition hover:border-gold/40"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-gold">
                  {card.badge}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-light text-ivory">
                  {card.title}
                </h3>
                <p className="mt-4 text-xs font-light leading-relaxed text-ivory/65">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Act V · The Triumphant Stage (Live Concert Energy) */}
      <section className="relative border-t border-gold/15 py-24 px-6 md:px-12 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-ebony shadow-[0_25px_90px_rgba(0,0,0,0.85)]">
            <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
              <Image
                src="/images/stage-triumph.jpg"
                alt="Elena Nuzman triumphant ovation at concert hall"
                fill
                className="object-cover object-center transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
                  THE TRIUMPH OF LIVE PERFORMANCE
                </span>
                <h2 className="mt-2 font-serif text-3xl font-light text-ivory md:text-5xl">
                  An Electric Celebration of Music.
                </h2>
                <p className="mt-3 max-w-xl text-sm font-light text-ivory/70">
                  Whether in a sacred classical auditorium or before a stadium crowd of tens of thousands, Elena Nuzman commands the stage with infectious charisma, sovereign technique, and genuine joy.
                </p>
              </div>

              <a
                href="#booking"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 font-mono text-xs uppercase tracking-widest text-ink font-semibold shadow-[0_0_25px_rgba(212,175,55,0.3)] transition hover:bg-ivory"
              >
                Inquire For Your Stage
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Act VI · The Archive (Diskographie & Track Player) */}
      <section id="repertoire" className="border-t border-gold/15 bg-ebony/40 py-32 px-6 md:px-12">
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
            <p className="font-mono text-xs uppercase tracking-widest text-gold/80">
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
                  className={`group flex cursor-pointer flex-col justify-between rounded-2xl border p-6 transition md:flex-row md:items-center ${
                    isSelected
                      ? "border-gold bg-ink/95 shadow-[0_0_35px_rgba(212,175,55,0.18)]"
                      : "border-gold/15 bg-ebony/40 hover:border-gold/40 hover:bg-ebony/70"
                  }`}
                >
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold text-gold">
                        0{idx + 1}
                      </span>
                      <h3
                        className={`font-serif text-2xl font-light transition ${
                          isSelected ? "text-gold" : "text-ivory group-hover:text-gold"
                        }`}
                      >
                        {track.title}
                      </h3>
                      <span className="hidden font-mono text-[11px] text-ivory/50 sm:inline-block">
                        ({track.year})
                      </span>
                      <span className="font-mono text-[10px] text-gold/80 italic">
                        · {track.mood}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-ivory/80">{track.subtitle}</p>
                    <p className="mt-3 text-xs font-light text-ivory/60 leading-relaxed">
                      {track.description}
                    </p>
                    <span className="mt-3 inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gold">
                      {track.accolade}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-6 md:mt-0">
                    <div className="text-right font-mono text-xs text-ivory/50">
                      <span>{track.genre}</span>
                      <span className="block text-[10px] text-ivory/40">{track.duration}</span>
                    </div>
                    <button
                      type="button"
                      className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
                        isSelected
                          ? "border-gold bg-gold text-ink shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                          : "border-gold/30 text-gold group-hover:border-gold group-hover:bg-gold/10"
                      }`}
                    >
                      {isSelected ? (
                        <Play className="h-5 w-5 fill-current" />
                      ) : (
                        <Music className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Act VII · The Audience (Private Inquiry & Booking) */}
      <section id="booking" className="border-t border-gold/15 py-32 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.38em] text-gold">
              05 / Private Inquiries
            </span>
            <h2 className="mt-6 font-serif text-4xl font-light md:text-7xl">
              Engage the Grand.
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-sm font-light leading-relaxed text-ivory/70 md:text-base">
              Discreet booking engagements for philharmonic halls, international festivals, luxury galas, and private residence concerts worldwide.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFormSubmitted(true);
            }}
            className="mt-16 rounded-3xl border border-gold/25 bg-ebony/50 p-8 shadow-2xl backdrop-blur-md md:p-12"
          >
            {formSubmitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-gold animate-bounce" />
                <h3 className="mt-4 font-serif text-3xl font-light text-ivory">
                  Inquiry Received With Discretion.
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm text-ivory/60">
                  Thank you. Management will review your performance request for{" "}
                  <span className="text-gold font-medium">{bookingTier}</span> and connect with your team shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-widest text-ivory/60">
                      Your Name / Institution
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tonhalle Düsseldorf / Private Client"
                      className="mt-2 w-full rounded-xl border border-gold/20 bg-ink px-4 py-3.5 text-sm text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-widest text-ivory/60">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="management@client.com"
                      className="mt-2 w-full rounded-xl border border-gold/20 bg-ink px-4 py-3.5 text-sm text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-ivory/60">
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
                            ? "border-gold bg-gold/15 text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                            : "border-gold/15 bg-ink text-ivory/60 hover:border-gold/40"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-ivory/60">
                    Confidential Inquiry Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Preferred date, location, concert grand availability (Steinway D/B preferred), and audience scope."
                    className="mt-2 w-full rounded-xl border border-gold/20 bg-ink px-4 py-3.5 text-sm text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-gold px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)] transition hover:bg-ivory sm:w-auto"
                  >
                    Transmit Inquiry
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/15 bg-ink py-16 px-6 text-center text-xs text-ivory/50 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-serif text-lg tracking-wider text-ivory">
            ELENA <span className="text-gold italic">NUZMAN</span>
          </p>
          <p className="font-mono text-[11px] tracking-widest text-ivory/60">
            MASTER GRADUATE ROBERT SCHUMANN HOCHSCHULE · ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-6 font-mono text-[11px] uppercase tracking-widest text-ivory/70">
            <a href="#top" className="hover:text-gold transition">
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
