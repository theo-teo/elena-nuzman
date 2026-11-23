"use client";

import { useState } from "react";
import Image from "next/image";
import ChapterCard from "../ui/ChapterCard";
import AcousticContour from "../ui/AcousticContour";
import { ALBUMS, type Album } from "@/content/albums";
import { Play, ExternalLink, Disc3, Music2 } from "lucide-react";

export default function MusicSection({
  onPlayTrack,
}: {
  onPlayTrack: (freq: number) => void;
}) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album>(ALBUMS[0]);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  const handlePlay = (album: Album) => {
    setSelectedAlbum(album);
    setActivePreviewId(album.id);
    onPlayTrack(album.fundamentalFreq);
    setTimeout(() => setActivePreviewId(null), 3800);
  };

  return (
    <section
      id="music"
      className="relative w-full border-t border-line/40 py-24 sm:py-32 md:py-40 px-5 md:px-12 bg-background"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line/40 pb-8">
          <ChapterCard
            chapter="Chapter 05"
            italicPrefix="The"
            title="Recorded Works"
            subtitle="One instrument. Infinite emotions. Verified studio and live discography."
          />
          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted/70">
            Authorized Master Tapes · 2008 — 2025
          </div>
        </div>

        {/* Featured Album Hero (Uncut 1:1 Studio Artwork Presentation) */}
        <div className="mt-16 border border-line/60 bg-surface/30 p-5 sm:p-8 md:p-12 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Square Album Cover (Naturally 1:1, Never Cropped) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square w-full max-w-sm sm:max-w-md mx-auto overflow-hidden border border-line/60 bg-surface shadow-2xl">
                <Image
                  src={selectedAlbum.coverImage}
                  alt={selectedAlbum.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Right: Album Metadata & Selected Tracks */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-cinematic text-accent">
                <Disc3 className="h-3.5 w-3.5 animate-spin [animation-duration:10s]" />
                <span>{selectedAlbum.accolade}</span>
              </div>

              <div>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground">
                  {selectedAlbum.title}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted mt-1">
                  {selectedAlbum.subtitle} · Release {selectedAlbum.year}
                </p>
              </div>

              <p className="font-sans text-sm font-light leading-relaxed text-foreground/80 max-w-xl">
                {selectedAlbum.description}
              </p>

              {/* Movement Track Listing */}
              <div className="border-t border-line/30 pt-5 space-y-2.5">
                <p className="font-mono text-[9px] uppercase tracking-cinematic text-accent">
                  Featured Movement Tracks
                </p>
                <div className="divide-y divide-line/20">
                  {selectedAlbum.tracks.map((tr) => (
                    <div
                      key={tr.number}
                      className="py-2 flex items-center justify-between font-mono text-xs text-foreground/85"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-accent text-[11px]">{tr.number}</span>
                        <span className="font-serif text-sm sm:text-base text-foreground font-light">
                          {tr.title}
                        </span>
                      </div>
                      <span className="text-muted text-[10px]">{tr.timing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Triggers */}
              <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-line/30">
                <button
                  type="button"
                  onClick={() => handlePlay(selectedAlbum)}
                  className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent/15 px-5 py-2.5 font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-foreground hover:bg-accent hover:text-background transition"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>
                    {activePreviewId === selectedAlbum.id
                      ? "Harmonics Resonating..."
                      : "Preview Piano Resonance"}
                  </span>
                </button>

                {selectedAlbum.streamingUrl && (
                  <a
                    href={selectedAlbum.streamingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line/60 px-5 py-2.5 font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-muted hover:text-foreground hover:border-accent transition"
                  >
                    <span>Stream on Spotify</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Discography Archive Gallery */}
        <div className="mt-14 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-cinematic text-accent">
            Select Archive Opus
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {ALBUMS.map((album) => {
              const isSelected = selectedAlbum.id === album.id;
              return (
                <button
                  key={album.id}
                  type="button"
                  onClick={() => handlePlay(album)}
                  className={`group relative text-left p-3 border transition-all duration-300 ${
                    isSelected
                      ? "border-accent bg-surface/80"
                      : "border-line/40 bg-surface/20 hover:border-accent/50"
                  }`}
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-surface">
                    <Image
                      src={album.coverImage}
                      alt={album.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 space-y-0.5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-accent block">
                      {album.year}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base text-foreground font-light truncate group-hover:text-accent transition-colors">
                      {album.title}
                    </h4>
                    <p className="font-sans text-[10px] text-muted truncate font-light">
                      {album.genre}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <AcousticContour className="mt-16" />
      </div>
    </section>
  );
}
