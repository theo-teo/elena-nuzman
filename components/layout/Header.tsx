"use client";

import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { NAV_LINKS } from "./Navigation";

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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-line bg-background/85 backdrop-blur-xl py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
          {/* Brand Monogram */}
          <a href="#top" className="group flex flex-col">
            <span className="font-serif text-lg tracking-[0.22em] text-foreground transition-colors group-hover:text-accent">
              ELENA <span className="italic text-accent font-normal">NUZMAN</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-cinematic text-muted/70">
              Concert Grand & Vocalist
            </span>
          </a>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Action Hub */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSound}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-accent hover:border-accent transition"
              aria-label={soundOn ? "Mute audio preview" : "Experience audio resonance"}
            >
              {soundOn ? (
                <Volume2 className="h-3.5 w-3.5 text-accent animate-pulse" />
              ) : (
                <VolumeX className="h-3.5 w-3.5 text-muted" />
              )}
              <span className="hidden sm:inline">
                {soundOn ? "Sound Active" : "Experience Sound"}
              </span>
            </button>

            <a
              href="#inquiries"
              className="hidden sm:inline-flex rounded-full bg-accent px-5 py-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-background hover:bg-foreground transition"
            >
              Inquire
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col justify-center px-10 pt-20">
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-foreground hover:text-accent transition flex items-center justify-between border-b border-line pb-4"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-accent">0{idx + 1}</span>
              </a>
            ))}
            <div className="pt-6">
              <a
                href="#inquiries"
                onClick={() => setMobileMenuOpen(false)}
                className="el-btn-primary w-full text-center"
              >
                Booking & Inquiries
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
