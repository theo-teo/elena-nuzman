"use client";

import { useState } from "react";

interface MusicalScoreStaveProps {
  tempoMarking?: string;
  clef?: "treble" | "bass";
  measure?: string;
  notes?: Array<{
    name: string;
    freq: number;
    position: number; // 0 to 100 percentage along stave
    label: string;
  }>;
  onPlayNote?: (freq: number) => void;
  className?: string;
}

export default function MusicalScoreStave({
  tempoMarking = "Largo misterioso · ♩ = 48",
  clef = "treble",
  measure = "4/4",
  notes = [],
  onPlayNote,
  className = "",
}: MusicalScoreStaveProps) {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const handleNoteClick = (name: string, freq: number) => {
    setActiveNote(name);
    if (onPlayNote) onPlayNote(freq);
    setTimeout(() => setActiveNote(null), 1800);
  };

  return (
    <div className={`w-full py-4 relative select-none ${className}`}>
      {/* Top Tempo & Measure Meta (Maria Vasilyeva Style) */}
      <div className="flex items-center justify-between pb-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-cinematic text-accent/80 border-b border-line/20">
        <span className="italic font-serif tracking-normal text-xs sm:text-sm text-foreground/90">
          {tempoMarking}
        </span>
        <span className="tracking-widest">
          Measure {measure} · 432 Hz Chamber Tuning
        </span>
      </div>

      {/* 5 Architectural Stave Lines */}
      <div className="relative py-4">
        <div className="space-y-2 relative">
          <div className="h-[1px] w-full bg-accent/25" />
          <div className="h-[1px] w-full bg-accent/25" />
          <div className="h-[1px] w-full bg-accent/25" />
          <div className="h-[1px] w-full bg-accent/25" />
          <div className="h-[1px] w-full bg-accent/25" />
        </div>

        {/* Clef Indicator */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 font-serif text-3xl text-accent/60 pointer-events-none select-none">
          {clef === "treble" ? "𝄞" : "𝄢"}
        </div>

        {/* Interactive Notes Positioned on the Stave */}
        {notes.map((note) => {
          const isActive = activeNote === note.name;
          return (
            <button
              key={note.name}
              type="button"
              onClick={() => handleNoteClick(note.name, note.freq)}
              style={{ left: `${note.position}%` }}
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group transition-all duration-300 ${
                isActive ? "scale-125 text-accent" : "text-foreground/80 hover:text-accent hover:scale-110"
              }`}
              title={`Play ${note.name} (${note.freq} Hz)`}
            >
              <span className="font-serif text-2xl leading-none">𝅘𝅥</span>
              <span className="font-mono text-[8px] uppercase tracking-widest text-muted/80 opacity-0 group-hover:opacity-100 transition-opacity">
                {note.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
