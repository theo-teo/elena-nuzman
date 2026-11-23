"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import EmotionHero from "@/components/EmotionHero";
import Kinetic from "@/components/Kinetic";
import ScrollStage from "@/components/ScrollStage";
import StageDoors from "@/components/StageDoors";
import VoiceLab from "@/components/VoiceLab";
import PressArchive from "@/components/PressArchive";
import { DISCOGRAPHY, type Lang, type Track } from "@/lib/copy";

const MARQUEE_ITEMS = {
  en: [
    "MASTER DIPLOMA · ROBERT SCHUMANN CONSERVATORY DÜSSELDORF",
    "IMPALA SILVER AWARD · OVER 5 MILLION STREAMS (LIEBESTRÄUME)",
    "FOUR-OCTAVE VOCAL RANGE (E3 — E7) & SOLO CONCERT GRAND",
    "HEADLINER · BERLIN BRANDENBURG GATE NYE (2 MILLION LIVE)",
    "RTL ALBUM OF THE YEAR · TOP 10 GERMAN NEWCOMER CHARTS",
    "PERSONALLY AUTHORIZED BY BENNY ANDERSSON & BJÖRN ULVAEUS (ABBA)",
    "2025 STUDIO ALBUM · MY PIANO AND I",
  ],
  de: [
    "DIPLOM-KONZERTPIANISTIN · ROBERT SCHUMANN HOCHSCHULE DÜSSELDORF",
    "IMPALA SILVER AWARD · ÜBER 5 MILLIONEN STREAMS (LIEBESTRÄUME)",
    "VIER OKTAVEN STIMMUMFANG (E3 — E7) & SOLO-KONZERTFLÜGEL",
    "HEADLINER · BRANDENBURGER TOR BERLIN SILVESTER (2 MIO. LIVE)",
    "RTL ALBUM DES JAHRES · TOP 10 DEUTSCHE NEWCOMER-CHARTS",
    "PERSÖNLICH AUTORISIERT VON BENNY ANDERSSON & BJÖRN ULVAEUS (ABBA)",
    "NEUES STUDIOALBUM 2025 · MY PIANO AND I",
  ],
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("de");
  const [soundOn, setSoundOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTrack, setActiveTrack] = useState<Track>(DISCOGRAPHY[0]);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [trackVideoId, setTrackVideoId] = useState<string | null>(null);

  // Booking form state
  const [bookingTier, setBookingTier] = useState("Philharmonic Hall");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientDetails, setClientDetails] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Smooth Scroll via Lenis
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1.05,
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

  // Navbar scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rich Web Audio Steinway Grand Piano & Harmonic Overtone Synthesizer
  const playChord = (baseFreq = 207.65) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();

      // Warm romantic arpeggiated grand chord (Root, Major 3rd, Perfect 5th, Octave, Major 10th)
      const ratios = [0.5, 1, 1.25, 1.5, 2, 2.5];
      ratios.forEach((ratio, idx) => {
        const osc = ctx.createOscillator();
        const subOsc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        const start = ctx.currentTime + idx * 0.045;
        const freq = baseFreq * ratio;

        osc.type = idx < 2 ? "triangle" : "sine";
        subOsc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);
        subOsc.frequency.setValueAtTime(freq * 1.002, start); // subtle Steinway string chorus detune

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(freq * 4.5, start);
        filter.frequency.exponentialRampToValueAtTime(freq * 1.4, start + 3.2);

        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.11 / (idx * 0.65 + 1), start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 4.2);

        osc.connect(filter);
        subOsc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        subOsc.start(start);
        osc.stop(start + 4.4);
        subOsc.stop(start + 4.4);
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
    window.setTimeout(() => setIsPlayingPreview(false), 3800);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          tier: bookingTier,
          details: clientDetails,
          website: honeypot,
        }),
      });
      const data = await res.json();
      setReferenceId(data.referenceId || "EN-VIP2026");
    } catch {
      setReferenceId("EN-VIP2026");
    } finally {
      setSubmitting(false);
    }
  };

  const navItems =
    lang === "de"
      ? [
          ["Story", "#story"],
          ["Weltbühnen", "#stages"],
          ["Vier Oktaven", "#voice"],
          ["Diskographie", "#repertoire"],
          ["Weltpresse", "#press"],
          ["Kontakt", "#booking"],
        ]
      : [
          ["Story", "#story"],
          ["World Stages", "#stages"],
          ["Four Octaves", "#voice"],
          ["Repertoire", "#repertoire"],
          ["Press", "#press"],
          ["Inquire", "#booking"],
        ];

  return (
    <div className="min-h-screen bg-[#050506] text-[#f2efea] selection:bg-[#d4af37]/30 selection:text-[#f2efea]">
      {/* Fixed Floating Glass Pill Navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gradient-to-b from-[#050506]/90 via-[#050506]/60 to-transparent py-3.5"
            : "py-5 md:py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-16">
          <a
            href="#top"
            className="flex items-center gap-3"
            aria-label="Elena Nuzman"
          >
            <span className="font-sans text-sm font-light uppercase tracking-[0.26em] text-[#f2efea]">
              Elena{" "}
              <span className="font-serif italic font-normal text-[#d4af37]">
                Nuzman
              </span>
            </span>
          </a>

          {/* Desktop Center Glass Pill Nav */}
          <nav className="ag-glass hidden items-center gap-1 rounded-full px-3 py-1.5 lg:flex">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#f2efea]/70 transition-colors hover:bg-white/[0.07] hover:text-[#f2efea]"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Language Switcher, Sound Toggle, Inquire & Mobile Menu */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Bilingual Switcher */}
            <div className="ag-glass flex items-center rounded-full p-0.5 font-mono text-[10px] uppercase tracking-[0.18em]">
              {(["de", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`rounded-full px-2.5 py-1 transition ${
                    lang === l
                      ? "bg-[#d4af37] font-medium text-[#050506]"
                      : "text-[#f2efea]/60 hover:text-[#f2efea]"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => playChord(activeTrack.fundamentalFreq)}
              className="ag-btn !px-3.5 !py-2"
              aria-label="Experience Sound"
            >
              <span
                className={`ag-dot ${
                  soundOn || isPlayingPreview ? "animate-pulse" : "opacity-40"
                }`}
              />
              <span className="hidden sm:inline">
                {soundOn
                  ? lang === "de"
                    ? "Klang aktiv"
                    : "Sound On"
                  : lang === "de"
                  ? "Klang"
                  : "Sound"}
              </span>
            </button>

            <a
              href="#booking"
              className="ag-btn ag-btn-solid hidden !px-4 !py-2 sm:inline-flex"
            >
              {lang === "de" ? "Anfragen" : "Inquire"}
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="ag-glass flex h-9 w-9 items-center justify-center rounded-full lg:hidden"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block h-px w-4 bg-[#f2efea] transition-transform duration-300 ${
                    menuOpen ? "translate-y-[3.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-4 bg-[#d4af37] transition-transform duration-300 ${
                    menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Luxury Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between bg-[#050506]/95 px-6 pb-12 pt-28 backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col gap-5">
            {navItems.map(([label, href], idx) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline justify-between border-b border-white/10 pb-4 font-serif text-3xl font-light text-[#f2efea] transition hover:text-[#d4af37]"
              >
                <span>{label}</span>
                <span className="font-mono text-xs text-[#d4af37]">0{idx + 1}</span>
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-between border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-[0.24em] text-[#f2efea]/50">
            <span>Düsseldorf · Berlin · NYC</span>
            <a
              href="#booking"
              onClick={() => setMenuOpen(false)}
              className="ag-btn ag-btn-solid"
            >
              {lang === "de" ? "Konzert anfragen" : "Book Performance"}
            </a>
          </div>
        </div>
      )}

      {/* PROLOG · EmotionHero (Multi-Layer Real-Identity Cinema + Short Videos) */}
      <EmotionHero
        lang={lang}
        onPlayChord={playChord}
        soundOn={soundOn || isPlayingPreview}
      />

      {/* INFINITE ACCOLADE MARQUEE */}
      <div className="ag-marquee overflow-hidden border-y border-white/[0.08] bg-[#08080a] py-4">
        <div className="ag-marquee-track flex w-max items-center gap-12 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.28em] text-[#f2efea]/65">
          {[...MARQUEE_ITEMS[lang], ...MARQUEE_ITEMS[lang]].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-12">
              <span>{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            </span>
          ))}
        </div>
      </div>

      {/* ACT I · Kinetic Manifest (3D Character-by-Character Reveal) */}
      <section
        id="manifest"
        className="relative px-5 py-28 md:px-12 md:py-36 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37]">
            {lang === "de"
              ? "00 / Das Manifest · Konzertflügel & Vier Oktaven"
              : "00 / The Manifest · Concert Grand & Four Octaves"}
          </span>

          <h2 className="mt-8 font-serif text-3xl font-light leading-[1.15] text-[#f2efea] sm:text-5xl md:text-6xl">
            <Kinetic
              key={lang}
              text={
                lang === "de"
                  ? "Ein Konzertflügel ist nicht bloss ein Instrument. Er ist die Verlängerung von Gedanken, Atem und vier Oktaven Stimme."
                  : "A concert grand is not merely an instrument. It is an extension of bone, thought, breath, and four octaves of voice."
              }
              as="span"
              step={18}
            />
          </h2>

          <div className="mt-14 grid gap-10 border-t border-white/[0.08] pt-10 md:grid-cols-12 md:items-start">
            <p className="font-sans text-sm font-light leading-relaxed text-[#f2efea]/70 md:col-span-7 sm:text-base">
              {lang === "de"
                ? "Über zwölftausend mechanische Teile, kalibriert auf reine akustische Resonanz. Unter Elena Nuzmans Händen verschmilzt die Meisterschaft der Robert Schumann Hochschule Düsseldorf mit einer vier Oktaven umfassenden Gesangsstimme, die Konzertsäle ebenso beherrscht wie das Brandenburger Tor vor zwei Millionen Menschen."
                : "Over twelve thousand mechanical parts calibrated to sheer acoustic resonance. Under Elena Nuzman’s hands, the classical mastery of the Robert Schumann Conservatory in Düsseldorf merges seamlessly with a four-octave vocal range that commands philharmonic halls and two million spectators at Berlin's Brandenburg Gate alike."}
            </p>
            <div className="grid grid-cols-2 gap-6 border-l border-white/10 pl-6 font-mono text-xs uppercase tracking-widest md:col-span-5">
              <div>
                <span className="block text-2xl font-light font-serif text-[#d4af37]">
                  4 Octaves
                </span>
                <span className="mt-1 block text-[10px] text-[#f2efea]/50">
                  {lang === "de" ? "Stimmumfang E3 — E7" : "Vocal Register E3 — E7"}
                </span>
              </div>
              <div>
                <span className="block text-2xl font-light font-serif text-[#d4af37]">
                  5,000,000+
                </span>
                <span className="mt-1 block text-[10px] text-[#f2efea]/50">
                  {lang === "de" ? "Streams · IMPALA Silver" : "Streams · IMPALA Silver"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT II · Pinned Scroll-Scrubbed Cinema Stage (-g 1 Video Scrubbing) */}
      <ScrollStage lang={lang} />

      {/* ACT III · Five Expanding Concert Stage Doors */}
      <StageDoors lang={lang} onPlayChord={playChord} />

      {/* ACT IV · Four Octaves Frequency Lab & Real Live Concert Video Cinema */}
      <VoiceLab
        lang={lang}
        onPlayChord={playChord}
        soundOn={soundOn || isPlayingPreview}
      />

      {/* ACT V · Selected Repertoire & Interactive Discography Vault */}
      <section
        id="repertoire"
        className="border-t border-white/[0.08] bg-[#08080a] px-5 py-28 md:px-12 md:py-36 lg:px-16"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                {lang === "de"
                  ? "04 / Ausgewählte Werke & Alben"
                  : "04 / Selected Works & Albums"}
              </span>
              <h2 className="mt-5 text-[clamp(2.2rem,5.5vw,5.6rem)] font-light uppercase leading-[0.95] tracking-[-0.04em] text-[#f2efea]">
                {lang === "de" ? "DIE " : "THE "}
                <em className="font-serif italic font-normal normal-case tracking-[-0.02em] text-[#d4af37]">
                  {lang === "de" ? "Diskographie." : "Discography."}
                </em>
              </h2>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#f2efea]/45">
              {lang === "de"
                ? "Klicken für Grundton-Resonanz oder Live-Video"
                : "Click any record for harmonic resonance or live video"}
            </p>
          </div>

          <div className="mt-16 grid gap-4">
            {DISCOGRAPHY.map((track, idx) => {
              const isSelected = activeTrack.id === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handleTrackSelect(track)}
                  className={`group flex cursor-pointer flex-col justify-between gap-6 rounded-2xl border p-5 transition-all duration-500 sm:p-6 lg:flex-row lg:items-center ${
                    isSelected
                      ? "border-[#d4af37] bg-white/[0.045] shadow-[0_0_40px_-10px_rgba(212,175,55,0.22)]"
                      : "border-white/[0.08] bg-white/[0.015] hover:border-white/[0.22] hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center max-w-4xl">
                    {/* Authentic Album Cover */}
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-black shadow-lg">
                      <picture>
                        <source media="(max-width: 767px)" srcSet={`${track.cover}-m.webp`} />
                        <img
                          src={`${track.cover}.webp`}
                          alt={track.title}
                          loading="lazy"
                          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                      </picture>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-[#d4af37]">
                          0{idx + 1}
                        </span>
                        <h3
                          className={`font-serif text-2xl font-light transition sm:text-3xl ${
                            isSelected
                              ? "text-[#d4af37]"
                              : "text-[#f2efea] group-hover:text-[#d4af37]"
                          }`}
                        >
                          {track.title}
                        </h3>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-[#f2efea]/60">
                          {track.year}
                        </span>
                        <span className="rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-3 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4af37]">
                          {track.accolade[lang]}
                        </span>
                      </div>
                      <p className="mt-1.5 font-sans text-xs font-medium text-[#f2efea]/75">
                        {track.subtitle[lang]}
                      </p>
                      <p className="mt-2 font-sans text-xs font-light leading-relaxed text-[#f2efea]/55">
                        {track.description[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] pt-4 lg:border-t-0 lg:pt-0">
                    <div className="text-left lg:text-right font-mono text-xs text-[#f2efea]/45">
                      <span className="block">{track.genre[lang]}</span>
                      <span className="mt-0.5 block text-[10px] text-[#d4af37]">
                        {Math.round(track.fundamentalFreq)} Hz · {track.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTrackVideoId(track.ytId);
                        }}
                        className="ag-btn !px-3.5 !py-2 !text-[10px]"
                      >
                        {lang === "de" ? "Video ↗" : "Video ↗"}
                      </button>
                      <button
                        type="button"
                        aria-label={`Play ${track.title}`}
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition ${
                          isSelected
                            ? "border-[#d4af37] bg-[#d4af37] text-[#050506]"
                            : "border-white/20 text-[#f2efea] group-hover:border-[#d4af37] group-hover:text-[#d4af37]"
                        }`}
                      >
                        {isSelected ? "▶" : "♪"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Discography Video Modal */}
        {trackVideoId && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setTrackVideoId(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#050506] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#d4af37]">
                  Elena Nuzman · Official Performance
                </span>
                <button
                  type="button"
                  onClick={() => setTrackVideoId(null)}
                  className="ag-btn !px-3.5 !py-1.5"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${trackVideoId}?autoplay=1&rel=0`}
                  title="Elena Nuzman Performance"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ACT VI · International Press & Authentic Portrait Archive */}
      <PressArchive lang={lang} />

      {/* FINALE · Discreet VIP Booking Concierge with Cinema Loop Background */}
      <section
        id="booking"
        className="relative overflow-hidden border-t border-white/[0.08] px-5 py-28 md:px-12 md:py-36 lg:px-16"
      >
        {/* Ambient Background Short Video */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25">
          <picture>
            <source media="(max-width: 767px)" srcSet="/media/cinema-grand-m.webp" />
            <img
              src="/media/cinema-grand.webp"
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </picture>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050506] via-[#050506]/80 to-[#050506]"
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37]">
              {lang === "de"
                ? "06 / Exklusive Konzert- & Gala-Anfragen"
                : "06 / Private & Philharmonic Inquiries"}
            </span>
            <h2 className="mt-5 font-serif text-4xl font-light text-[#f2efea] sm:text-6xl md:text-7xl">
              {lang === "de" ? "Den Flügel engagieren." : "Engage the Grand."}
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-sans text-sm font-light leading-relaxed text-[#f2efea]/65 sm:text-base">
              {lang === "de"
                ? "Diskrete Mandats- und Konzertanfragen für Philharmonien, internationale Festivals, exklusive Marken-Galas und private Residenzkonzerte weltweit."
                : "Discreet performance inquiries for philharmonic halls, international festivals, luxury brand galas, and private residence concerts worldwide."}
            </p>
          </div>

          <form
            onSubmit={handleInquirySubmit}
            className="ag-glass mt-14 rounded-3xl p-6 sm:p-10 md:p-12"
          >
            {/* Hidden Honeypot */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            {referenceId ? (
              <div className="py-12 text-center">
                <span className="ag-dot mx-auto mb-5" />
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#d4af37]">
                  Dossier Ref · {referenceId}
                </span>
                <h3 className="mt-3 font-serif text-3xl font-light text-[#f2efea] sm:text-4xl">
                  {lang === "de"
                    ? "Anfrage mit höchster Diskretion empfangen."
                    : "Inquiry Received With Discretion."}
                </h3>
                <p className="mx-auto mt-4 max-w-md font-sans text-sm font-light leading-relaxed text-[#f2efea]/65">
                  {lang === "de" ? (
                    <>
                      Vielen Dank. Das Management prüft Ihre Anfrage für{" "}
                      <span className="text-[#d4af37]">{bookingTier}</span> und
                      setzt sich persönlich mit Ihnen in Verbindung.
                    </>
                  ) : (
                    <>
                      Thank you. Management will review your performance request
                      for <span className="text-[#d4af37]">{bookingTier}</span>{" "}
                      and connect with your team shortly.
                    </>
                  )}
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.24em] text-[#f2efea]/55">
                      {lang === "de"
                        ? "Ihr Name / Institution"
                        : "Your Name / Institution"}
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={
                        lang === "de"
                          ? "z. B. Tonhalle Düsseldorf / Private Soirée"
                          : "e.g. Tonhalle Düsseldorf / Private Collector"
                      }
                      className="mt-2.5 w-full rounded-xl border border-white/10 bg-[#050506]/90 px-4 py-3.5 text-sm text-[#f2efea] placeholder-white/25 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.24em] text-[#f2efea]/55">
                      {lang === "de" ? "E-Mail-Adresse" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="management@institution.com"
                      className="mt-2.5 w-full rounded-xl border border-white/10 bg-[#050506]/90 px-4 py-3.5 text-sm text-[#f2efea] placeholder-white/25 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block font-mono text-[11px] uppercase tracking-[0.24em] text-[#f2efea]/55">
                    {lang === "de" ? "Konzert-Rahmen" : "Performance Context"}
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
                        className={`rounded-xl border px-3 py-3 font-mono text-[11px] uppercase tracking-[0.16em] transition ${
                          bookingTier === tier
                            ? "border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]"
                            : "border-white/10 bg-[#050506]/80 text-[#f2efea]/60 hover:border-white/30"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block font-mono text-[11px] uppercase tracking-[0.24em] text-[#f2efea]/55">
                    {lang === "de"
                      ? "Vertrauliche Eckdaten"
                      : "Confidential Details"}
                  </label>
                  <textarea
                    rows={4}
                    value={clientDetails}
                    onChange={(e) => setClientDetails(e.target.value)}
                    placeholder={
                      lang === "de"
                        ? "Wunschdatum, Spielort, Konzertflügel vor Ort (Steinway Model D / B bevorzugt) und Rahmen der Veranstaltung."
                        : "Preferred date, city/venue, concert grand availability (Steinway D/B preferred), and audience scope."
                    }
                    className="mt-2.5 w-full rounded-xl border border-white/10 bg-[#050506]/90 px-4 py-3.5 text-sm text-[#f2efea] placeholder-white/25 focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f2efea]/40">
                    {lang === "de"
                      ? "Direkte Weiterleitung an das Management · Düsseldorf"
                      : "Direct Dispatch to Artist Management · Düsseldorf"}
                  </span>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="ag-btn ag-btn-solid w-full sm:w-auto"
                  >
                    {submitting
                      ? lang === "de"
                        ? "Wird übermittelt..."
                        : "Transmitting..."
                      : lang === "de"
                      ? "Anfrage übermitteln →"
                      : "Transmit Inquiry →"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>

      {/* MONUMENTAL FOOTER */}
      <footer className="overflow-hidden border-t border-white/[0.08] bg-[#050506] px-5 pb-10 pt-16 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.26em] text-[#f2efea]">
                Elena{" "}
                <span className="font-serif italic text-[#d4af37]">Nuzman</span>
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[#f2efea]/45">
                {lang === "de"
                  ? "Diplom-Konzertpianistin · Vier Oktaven · Komponistin"
                  : "Master Concert Pianist · Four Octaves · Composer"}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#f2efea]/55">
              <a
                href="https://www.youtube.com/@ElenaNuzman"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-[#d4af37]"
              >
                YouTube ↗
              </a>
              <a
                href="https://bfan.link/my-piano-and-i"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-[#d4af37]"
              >
                My Piano And I ↗
              </a>
              <a
                href="#top"
                className="text-[#d4af37] transition hover:text-[#f2efea]"
              >
                {lang === "de" ? "Nach oben ↑" : "Back to Top ↑"}
              </a>
            </div>
          </div>

          <div
            aria-hidden
            className="ag-wordmark mt-12 select-none text-center font-serif font-light tracking-tight"
          >
            ELENA NUZMAN
          </div>
        </div>
      </footer>
    </div>
  );
}
