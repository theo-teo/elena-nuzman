"use client";

import { useState } from "react";
import VoiceWave from "@/components/VoiceWave";
import { FOUR_OCTAVES, VIDEO_REELS, type Lang, type OctaveNote, type VideoReel } from "@/lib/copy";

export default function VoiceLab({
  lang,
  onPlayChord,
  soundOn,
}: {
  lang: Lang;
  onPlayChord: (freq: number) => void;
  soundOn: boolean;
}) {
  const [selectedNote, setSelectedNote] = useState<OctaveNote>(FOUR_OCTAVES[1]);
  const [activeVideo, setActiveVideo] = useState<VideoReel | null>(null);
  const [pulse, setPulse] = useState(false);

  const triggerNote = (note: OctaveNote) => {
    setSelectedNote(note);
    setPulse(true);
    onPlayChord(note.freq);
    window.setTimeout(() => setPulse(false), 3200);
  };

  return (
    <section
      id="voice"
      className="border-t border-white/[0.08] bg-[#050506] px-5 py-28 md:px-12 md:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37]">
              {lang === "de"
                ? "03 / Vier Oktaven & Live-Konzertfilme"
                : "03 / Four Octaves & Live Concert Films"}
            </span>
            <h2 className="mt-5 text-[clamp(2.2rem,5.5vw,5.6rem)] font-light uppercase leading-[0.95] tracking-[-0.04em] text-[#f2efea]">
              {lang === "de" ? "WENN DER FLÜGEL " : "WHEN THE GRAND "}
              <em className="font-serif italic font-normal normal-case tracking-[-0.02em] text-[#d4af37]">
                {lang === "de" ? "zu singen beginnt." : "begins to sing."}
              </em>
            </h2>
          </div>
          <p className="font-sans text-sm font-light leading-relaxed text-[#f2efea]/65 md:col-span-5 sm:text-base">
            {lang === "de"
              ? "Klassische Konzertsäle verlangen Präzision. Stadion-Rock verlangt bedingungslose Hingabe. Elena Nuzman beherrscht beides gleichzeitig: vier volle Oktaven Stimmumfang (E3 bis E7), live am Steinway begleitet."
              : "Classical concert halls demand discipline. Stadium rock demands total surrender. Elena Nuzman commands both simultaneously: a four-octave vocal range (E3 to E7) accompanied live by her own hands at the Steinway grand."}
          </p>
        </div>

        {/* Interactive 4-Octave Frequency & Acoustic Waveform Lab */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          {/* Left: Live Acoustic Waveform Visualizer */}
          <div className="ag-glass flex flex-col justify-between rounded-3xl p-6 sm:p-8 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[#d4af37]">
                <span className="flex items-center gap-2.5">
                  <span className="ag-dot" />
                  {lang === "de" ? "Akustische Echtzeit-Resonanz" : "Live Acoustic Resonance"}
                </span>
                <span className="text-[#f2efea]/50">{selectedNote.note}</span>
              </div>

              <div className="py-8">
                <VoiceWave
                  fallback={
                    pulse
                      ? selectedNote.energy
                      : soundOn
                      ? selectedNote.energy * 0.85
                      : selectedNote.energy * 0.42
                  }
                  height={110}
                />
              </div>
            </div>

            <div className="border-t border-white/10 pt-5">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-[#d4af37]">
                <span>{selectedNote.register[lang]}</span>
                <span className="text-[#f2efea]/40">E3 — E7</span>
              </div>
              <p className="mt-2 font-serif text-xl italic text-[#f2efea]">
                {selectedNote.work[lang]}
              </p>
              <p className="mt-2 font-sans text-xs font-light leading-relaxed text-[#f2efea]/65">
                {selectedNote.desc[lang]}
              </p>
            </div>
          </div>

          {/* Right: 4 Interactive Octave Register Pads */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {FOUR_OCTAVES.map((note, idx) => {
              const active = selectedNote.id === note.id;
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => triggerNote(note)}
                  className={`ag-card group flex flex-col justify-between rounded-2xl p-6 text-left transition-all ${
                    active
                      ? "border-[#d4af37] shadow-[0_0_35px_-10px_rgba(212,175,55,0.4)]"
                      : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em]">
                      <span className="text-[#d4af37]">
                        {lang === "de" ? `OKTAVE 0${idx + 1}` : `OCTAVE 0${idx + 1}`}
                      </span>
                      <span className="text-[#f2efea]/45">{note.note}</span>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl font-light text-[#f2efea] group-hover:text-[#d4af37] transition-colors">
                      {note.register[lang]}
                    </h3>
                    <p className="mt-2 font-sans text-xs font-light leading-relaxed text-[#f2efea]/65">
                      {note.desc[lang]}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-[10px] uppercase tracking-[0.22em]">
                    <span className="text-[#f2efea]/50">{note.work[lang]}</span>
                    <span className="text-[#d4af37]">
                      {active
                        ? lang === "de"
                          ? "● Klingt"
                          : "● Resonating"
                        : lang === "de"
                        ? "Anspielen →"
                        : "Audition →"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Authentic Live Concert & Performance Video Reels */}
        <div className="mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#d4af37]">
                {lang === "de"
                  ? "Echte Konzertaufnahmen & Musikfilme"
                  : "Authentic Concert Footage & Music Films"}
              </span>
              <h3 className="mt-2 font-serif text-3xl font-light text-[#f2efea] sm:text-4xl">
                {lang === "de"
                  ? "Elena Nuzman Live erleben."
                  : "Experience Elena Nuzman Live."}
              </h3>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#f2efea]/45">
              {lang === "de" ? "Klicken zum Abspielen im Konzertsaal-Player" : "Click any film to launch concert cinema"}
            </span>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VIDEO_REELS.map((reel) => (
              <button
                key={reel.id}
                type="button"
                onClick={() => setActiveVideo(reel)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0d] text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4af37]/60 hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.35)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <picture>
                    <source media="(max-width: 767px)" srcSet={`${reel.thumb}-m.webp`} />
                    <img
                      src={`${reel.thumb}.webp`}
                      alt={reel.title[lang]}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

                  {/* Play Badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/80 bg-black/65 text-[#d4af37] backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-[#050506]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                        <path d="M4 2.5v11l9-5.5-9-5.5z" />
                      </svg>
                    </span>
                  </div>

                  <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4af37] backdrop-blur">
                    {reel.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 font-mono text-[10px] text-[#f2efea]/70">
                    {reel.duration}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h4 className="font-serif text-xl font-light text-[#f2efea] group-hover:text-[#d4af37] transition-colors">
                      {reel.title[lang]}
                    </h4>
                    <p className="mt-2 font-sans text-xs font-light leading-relaxed text-[#f2efea]/60">
                      {reel.subtitle[lang]}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4af37]">
                    <span>{lang === "de" ? "Konzertfilm starten" : "Watch Performance"}</span>
                    <span>→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Zero-Lag Concert Cinema Lightbox Modal */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title[lang]}
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#050506] shadow-[0_25px_90px_rgba(0,0,0,0.95)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
                  {activeVideo.badge}
                </span>
                <h4 className="font-serif text-xl text-[#f2efea]">{activeVideo.title[lang]}</h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="ag-btn !px-4 !py-2"
              >
                {lang === "de" ? "Schliessen ✕" : "Close ✕"}
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.ytId}?autoplay=1&rel=0`}
                title={activeVideo.title[lang]}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
