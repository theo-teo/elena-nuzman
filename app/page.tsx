"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import VoiceWave from "@/components/VoiceWave";

export default function Home() {
  const [soundOn, setSoundOn] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
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

  // Web Audio Synthetic Grand Piano Chord (Liszt Liebestraum A-flat chord)
  const toggleSound = () => {
    if (soundOn) {
      setSoundOn(false);
      return;
    }
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();

      // Warm piano chord frequencies (Ab major: Ab2, C3, Eb3, Ab3, C4)
      const freqs = [103.83, 130.81, 155.56, 207.65, 261.63];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12 / (idx + 1), ctx.currentTime + 0.1 + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + 4.0);
      });
      setSoundOn(true);
    } catch {
      setSoundOn(true);
    }
  };

  return (
    <main className="relative min-h-screen bg-ink text-ivory selection:bg-gold selection:text-ink">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 backdrop-blur-md md:px-12">
        <a href="#top" className="font-serif text-xl tracking-wider text-ivory">
          ELENA <span className="text-gold italic">NUZMAN</span>
        </a>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.25em] text-ivory/60 md:flex">
          <a href="#virtuosity" className="transition hover:text-gold">The Craft</a>
          <a href="#voice" className="transition hover:text-gold">Four Octaves</a>
          <a href="#repertoire" className="transition hover:text-gold">Repertoire</a>
          <a href="#booking" className="transition hover:text-gold">Booking</a>
        </nav>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleSound}
            className="inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ink/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-ivory/80 backdrop-blur transition hover:border-gold hover:text-gold"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${soundOn ? "bg-gold animate-pulse" : "bg-ivory/40"}`} />
            {soundOn ? "Sound on" : "Experience sound"}
          </button>
          <a
            href="#booking"
            className="rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-[0.18em] text-ink font-medium transition hover:bg-ivory"
          >
            Inquire
          </a>
        </div>
      </header>

      {/* Hero Section · Prolog */}
      <section id="top" className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-20 pt-32 md:px-12 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ebony via-ink to-ink" />
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-xs uppercase tracking-[0.38em] text-gold">Concert Pianist · Vocalist · Composer</p>
          <h1 className="mt-8 font-serif text-[clamp(2.8rem,8.5vw,9rem)] font-light leading-[0.92] tracking-tight text-ivory">
            A GRAND PIANO.<br />
            <span className="text-gold italic font-normal">Four octaves.</span><br />
            PURE GRAVITY.
          </h1>
          <div className="mt-12 flex flex-col justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-end">
            <p className="max-w-xl font-sans text-sm font-light leading-relaxed text-ivory/60 md:text-base">
              A master graduate of the Robert Schumann University of Music. Merging the sovereign precision of Franz Liszt with the sheer vocal power of a stadium stage.
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-ivory/40">
              Düsseldorf · New York · Worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 1: The Craft */}
      <section id="virtuosity" className="border-t border-line py-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl grid gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <span className="text-xs uppercase tracking-[0.35em] text-gold">01 / The Instrument</span>
            <h2 className="mt-6 font-serif text-4xl font-light leading-tight md:text-6xl">
              88 Keys.<br />
              <em className="text-gold italic">Pure discipline.</em>
            </h2>
            <p className="mt-8 text-sm font-light leading-relaxed text-ivory/65 md:text-base">
              Born into a dynasty of classical musicians in Moldova. Playing melodies by ear at age two; admitted to academies for gifted prodigies at age seven. Trained across Russia, France, and Germany.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 text-xs uppercase tracking-widest text-ivory/50">
              <div>
                <p className="text-gold text-lg font-serif">Diplom</p>
                <p className="mt-1">Konzertpianistin</p>
              </div>
              <div>
                <p className="text-gold text-lg font-serif">Schumann</p>
                <p className="mt-1">Hochschule Düsseldorf</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ebony md:col-span-7">
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
              <span className="font-mono text-xs text-gold/60">STEINWAY & SONS · CONCERT GRAND</span>
              <div>
                <blockquote className="font-serif text-2xl italic leading-relaxed text-ivory/90 md:text-3xl">
                  «The piano is not just an instrument. It is an extension of bone, thought, and breath.»
                </blockquote>
                <p className="mt-4 text-xs uppercase tracking-widest text-ivory/40">— Elena Nuzman</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Four Octaves */}
      <section id="voice" className="border-t border-line bg-ebony/40 py-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.35em] text-gold">02 / The Metamorphosis</span>
            <h2 className="mt-6 font-serif text-4xl font-light leading-tight md:text-7xl">
              When the concert grand<br />
              <em className="text-gold italic">begins to sing.</em>
            </h2>
            <p className="mt-8 text-base font-light leading-relaxed text-ivory/70 md:text-lg">
              Classical concert halls demand restraint. Rock arenas demand surrender. Elena Nuzman commands both simultaneously. With a vocal register spanning four full octaves, she accompanies herself live on the Steinway, shattering the boundary between Liszt and stadium rock.
            </p>

            <div className="mt-10 rounded-2xl border border-gold/20 bg-ink/70 p-6 backdrop-blur">
              <div className="flex items-center justify-between pb-4 border-b border-line text-xs uppercase tracking-widest text-gold/80">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
                  Live Acoustic Resonance & Vocal Wave
                </span>
                <span className="font-mono text-ivory/40">E3 — E7 (4 Octaves)</span>
              </div>
              <div className="py-4">
                <VoiceWave fallback={soundOn ? 0.85 : 0.28} height={80} />
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Impala Silver Award",
                subtitle: "Liebesträume",
                desc: "Millions of global streams for her vocal adaptation of Franz Liszt's Liebestraum No. 3.",
              },
              {
                title: "Broadway Showcase",
                subtitle: "New York City",
                desc: "Headline performer on the legendary stages of Manhattan.",
              },
              {
                title: "Brandenburger Tor",
                subtitle: "Berlin",
                desc: "Performing 'Here I Go Again' live before a television audience of millions on New Year's Eve.",
              },
            ].map((card, i) => (
              <div key={i} className="group relative rounded-xl border border-line bg-ink/80 p-8 transition hover:border-gold/40">
                <span className="text-xs uppercase tracking-widest text-gold/60">0{i + 1} / Stage</span>
                <h3 className="mt-4 font-serif text-2xl font-light text-ivory">{card.title}</h3>
                <p className="text-xs text-gold italic font-serif">{card.subtitle}</p>
                <p className="mt-4 text-sm font-light leading-relaxed text-ivory/60">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 3: Repertoire */}
      <section id="repertoire" className="border-t border-line py-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs uppercase tracking-[0.35em] text-gold">03 / Selected Works</span>
              <h2 className="mt-6 font-serif text-4xl font-light md:text-6xl">
                The Discography.
              </h2>
            </div>
            <p className="text-xs uppercase tracking-widest text-ivory/40">Listen & Explore</p>
          </div>

          <div className="mt-16 space-y-4">
            {[
              {
                title: "Liebesträume",
                year: "2016 / 2021",
                genre: "Classical Crossover · Franz Liszt",
                note: "Over 5 Million Streams · Awarded Impala Silver",
              },
              {
                title: "My Piano And I",
                year: "2025",
                genre: "Studio Album · Solo Piano & Vocal",
                note: "Pure intimate grand piano recordings",
              },
              {
                title: "Here I Go Again",
                year: "Live Brandenburg Gate",
                genre: "Symphonic Rock Adaption",
                note: "Performed live for New Year's Eve broadcast",
              },
              {
                title: "I Believe In You",
                year: "Debut",
                genre: "Album of the Year (RTL Award)",
                note: "Top 10 Newcomer Charts Germany",
              },
            ].map((track, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTrack(activeTrack === track.title ? null : track.title)}
                className="group flex cursor-pointer flex-col justify-between rounded-xl border border-line bg-ebony/30 p-6 transition hover:border-gold/50 md:flex-row md:items-center"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-gold">0{idx + 1}</span>
                    <h3 className="font-serif text-2xl font-light text-ivory group-hover:text-gold transition">
                      {track.title}
                    </h3>
                    <span className="rounded-full border border-line px-2.5 py-0.5 text-[10px] text-ivory/50">
                      {track.year}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-light text-ivory/50">{track.genre} — {track.note}</p>
                </div>
                <div className="mt-4 flex items-center gap-3 md:mt-0">
                  <span className="text-xs uppercase tracking-widest text-gold/80 group-hover:translate-x-1 transition">
                    Listen snippet →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 4: Exclusive Booking */}
      <section id="booking" className="border-t border-line bg-ebony/60 py-32 px-6 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs uppercase tracking-[0.38em] text-gold">Private Salons · Galas · Concert Halls</span>
          <h2 className="mt-8 font-serif text-4xl font-light leading-tight text-ivory md:text-7xl">
            Book an exclusive<br />
            <em className="text-gold italic font-normal">performance.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-ivory/65 md:text-base">
            For bespoke gala engagements, international philharmonic bookings, and confidential private recitals. Direct inquiry to management.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you. Your inquiry has been transmitted to management.");
            }}
            className="mt-12 grid gap-3 text-left md:grid-cols-2"
          >
            <input
              type="text"
              required
              placeholder="Your Name / Institution"
              className="rounded-lg border border-line bg-ink/90 px-5 py-3.5 text-sm font-light text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
            />
            <input
              type="email"
              required
              placeholder="Direct Contact (Email / Phone)"
              className="rounded-lg border border-line bg-ink/90 px-5 py-3.5 text-sm font-light text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
            />
            <input
              type="text"
              placeholder="Occasion / City / Venue"
              className="rounded-lg border border-line bg-ink/90 px-5 py-3.5 text-sm font-light text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none md:col-span-2"
            />
            <textarea
              rows={3}
              required
              placeholder="Desired dates and initial thoughts..."
              className="rounded-lg border border-line bg-ink/90 px-5 py-3.5 text-sm font-light text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none md:col-span-2"
            />
            <button
              type="submit"
              className="mt-4 rounded-full bg-gold py-4 text-xs font-medium uppercase tracking-[0.2em] text-ink transition hover:bg-ivory md:col-span-2"
            >
              Submit Confidential Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line py-12 px-6 text-center text-xs text-ivory/40 md:px-12">
        <p>© {new Date().getFullYear()} Elena Nuzman · All Rights Reserved · Crafted by The Private Studio</p>
      </footer>
    </main>
  );
}
