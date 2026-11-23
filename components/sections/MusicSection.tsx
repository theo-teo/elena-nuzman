"use client";

import { useState } from "react";
import Image from "next/image";
import SectionLabel from "../ui/SectionLabel";
import { ALBUMS, type Album } from "@/content/albums";
import { Play, ExternalLink, Disc3 } from "lucide-react";

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
    <section id="music" className="relative border-t border-line py-36 px-6 md:px-14 bg-background">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel chapter="Chapter 05" title="The Music" />
            <h2 className="mt-6 font-serif text-3xl font-light sm:text-5xl md:text-6xl text-foreground">
              One Instrument. <em className="italic text-accent">Infinite Emotions.</em>
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Discography &amp; Authorized Tapes
          </p>
        </div>

        {/* Featured Album Hero (My Piano And I / Liebesträume) */}
        <div className="mt-16 rounded-3xl border border-line bg-surface p-8 md:p-12 shadow-2xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left: Big Cover Presentation */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-line shadow-2xl">
                <Image
                  src={selectedAlbum.coverImage}
                  alt={selectedAlbum.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Right: Album Metadata & Tracks */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                <Disc3 className="h-4 w-4 animate-spin [animation-duration:8s]" />
                <span>{selectedAlbum.accolade}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground">
                {selectedAlbum.title}
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {selectedAlbum.subtitle} · {selectedAlbum.year}
              </p>

              <p className="font-sans text-sm font-light leading-relaxed text-foreground/75 md:text-base max-w-xl">
                {selectedAlbum.description}
              </p>

              {/* Track Listing */}
              <div className="border-t border-line pt-6 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Featured Movement Tracks
                </p>
                <div className="divide-y divide-line/60">
                  {selectedAlbum.tracks.map((tr) => (
                    <div key={tr.number} className="py-2.5 flex items-center justify-between font-mono text-xs text-foreground/80">
                      <div className="flex items-center gap-3">
                        <span className="text-accent">{tr.number}</span>
                        <span className="font-serif text-base font-light text-foreground">{tr.title}</span>
                      </div>
                      <span className="text-muted text-[11px]">{tr.timing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={() => handlePlay(selectedAlbum)}
                  className="el-btn-primary"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  {activePreviewId === selectedAlbum.id ? "Harmonics Resonating..." : "Preview Piano Resonance"}
                </button>

                {selectedAlbum.streamingUrl && (
                  <a
                    href={selectedAlbum.streamingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="el-btn-ghost inline-flex items-center gap-2"
                  >
                    <span>Stream on Spotify</span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Discography Grid Selector */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {ALBUMS.map((album) => {
            const isSelected = selectedAlbum.id === album.id;
            return (
              <button
                key={album.id}
                type="button"
                onClick={() => handlePlay(album)}
                className={`group relative text-left rounded-2xl border p-4 transition-all duration-300 ${
                  isSelected
                    ? "border-accent bg-surface/90 shadow-[0_0_20px_rgba(201,184,154,0.25)] scale-[1.02]"
                    : "border-line bg-surface/30 hover:border-accent/40"
                }`}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-line">
                  <Image
                    src={album.coverImage}
                    alt={album.title}
                    fill
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-accent">
                    {album.year}
                  </span>
                  <h4 className="font-serif text-lg text-foreground group-hover:text-accent transition mt-0.5">
                    {album.title}
                  </h4>
                  <p className="font-mono text-[10px] text-muted truncate mt-1">
                    {album.genre}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
