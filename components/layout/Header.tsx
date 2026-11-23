"use client";

import { useEffect, useState } from "react";
import Navigation, { NAV_LINKS } from "./Navigation";
import { X } from "lucide-react";

export default function Header({
  soundOn,
  onToggleSound,
}: {
  soundOn: boolean;
  onToggleSound: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 pointer-events-none ${
          scrolled
            ? "bg-background/90 backdrop-blur-md py-4 border-b border-line/40"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-12 pointer-events-auto">
          {/* Left: Round Menu Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="group relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-line bg-surface/60 transition-all duration-500 hover:border-accent hover:scale-105"
              aria-label="Open Navigation Menu"
            >
              <div className="flex flex-col gap-1 items-center">
                <span className="h-[1.5px] w-4 bg-foreground transition-all duration-300 group-hover:w-5 group-hover:bg-accent" />
                <span className="h-[1.5px] w-3 bg-foreground transition-all duration-300 group-hover:w-5 group-hover:bg-accent" />
              </div>
            </button>
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-cinematic text-muted/80">
              Menu
            </span>
          </div>

          {/* Center: Brand Monogram / Identity */}
          <a href="#top" className="group flex flex-col items-center text-center">
            <span className="font-serif text-sm sm:text-base tracking-[0.28em] text-foreground transition-colors group-hover:text-accent">
              ELENA <span className="font-script text-accent text-lg sm:text-xl font-normal lowercase tracking-normal">between</span> NUZMAN
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-cinematic text-muted/60">
              Silence &amp; Sound
            </span>
          </a>

          {/* Right: Round Audio Equalizer Button (Unseen Studio Signature) */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-widest text-muted/70">
              {soundOn ? "432 Hz Active" : "Acoustic Resonance"}
            </span>

            <button
              type="button"
              onClick={onToggleSound}
              className="group relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-line bg-surface/60 transition-all duration-500 hover:border-accent hover:scale-105"
              aria-label={soundOn ? "Mute piano resonance" : "Play piano resonance"}
              title={soundOn ? "Mute audio" : "Harmonic Steinway resonance"}
            >
              <div className="flex items-center gap-[3px] h-3.5">
                <span
                  className={`w-[1.5px] rounded-full transition-all duration-300 ${
                    soundOn
                      ? "h-3.5 bg-accent animate-pulse [animation-duration:600ms]"
                      : "h-1 bg-muted group-hover:bg-foreground"
                  }`}
                />
                <span
                  className={`w-[1.5px] rounded-full transition-all duration-300 ${
                    soundOn
                      ? "h-2 bg-accent animate-pulse [animation-duration:800ms]"
                      : "h-2 bg-muted group-hover:bg-foreground"
                  }`}
                />
                <span
                  className={`w-[1.5px] rounded-full transition-all duration-300 ${
                    soundOn
                      ? "h-3.5 bg-accent animate-pulse [animation-duration:500ms]"
                      : "h-3 bg-muted group-hover:bg-foreground"
                  }`}
                />
                <span
                  className={`w-[1.5px] rounded-full transition-all duration-300 ${
                    soundOn
                      ? "h-2.5 bg-accent animate-pulse [animation-duration:700ms]"
                      : "h-1.5 bg-muted group-hover:bg-foreground"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Editorial Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-background/95 backdrop-blur-2xl p-6 md:p-14 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-line pb-6">
            <div className="font-mono text-xs uppercase tracking-cinematic text-accent">
              Navigation Index · Elena Nuzman
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-accent transition"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>

          <div className="my-auto py-8">
            <nav className="flex flex-col gap-4 md:gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-baseline gap-4 py-2 border-b border-line/30 transition-all duration-300 hover:border-accent"
                >
                  <span className="font-mono text-xs text-accent/60 group-hover:text-accent">
                    {link.chapter}
                  </span>
                  <span className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-foreground group-hover:text-accent group-hover:translate-x-2 transition-transform">
                    {link.label}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div className="border-t border-line pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-muted">
            <span>Robert Schumann Hochschule Düsseldorf</span>
            <span>Acoustic Concert Grand &amp; Vocalist</span>
          </div>
        </div>
      )}
    </>
  );
}
