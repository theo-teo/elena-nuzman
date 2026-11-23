"use client";

import Image from "next/image";
import ChapterCard from "../ui/ChapterCard";
import AcousticContour from "../ui/AcousticContour";
import { PAST_HIGHLIGHTS, UPCOMING_CONCERTS } from "@/content/concerts";
import { Calendar, MapPin, ArrowRight, Radio } from "lucide-react";

export default function StageSection() {
  return (
    <section
      id="stage"
      className="relative w-full border-t border-line/40 py-24 sm:py-32 md:py-40 px-5 md:px-12 bg-background"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line/40 pb-8">
          <ChapterCard
            chapter="Chapter 06"
            italicPrefix="The"
            title="Live Stage"
            subtitle="The story comes alive in resonance. Historic auditoriums, open air broadcasts, and philharmonic halls."
          />
          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted/70">
            Concert Record &amp; Broadcast Archive
          </div>
        </div>

        {/* Featured Live Milestone: Brandenburger Tor (Fitted, Uncropped) */}
        <div className="mt-16 border border-line/60 bg-surface/30 p-5 sm:p-8 md:p-12 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* The Authentic Photo - Natural Framing with Matting, NEVER CUT OFF */}
            <div className="lg:col-span-6 relative aspect-square max-w-md mx-auto w-full overflow-hidden border border-line/60 bg-surface">
              <Image
                src="/images/real/elena-brandenburger-tor.jpg"
                alt="Elena Nuzman live at the Brandenburg Gate New Year's Eve Broadcast"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 border border-line/80 bg-background/80 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-accent backdrop-blur-md">
                <Radio className="h-3 w-3 text-red-400 animate-pulse" />
                <span>Live Broadcast</span>
              </div>
            </div>

            {/* Narrative & Performance Context */}
            <div className="lg:col-span-6 space-y-6">
              <div className="font-mono text-[10px] uppercase tracking-cinematic text-accent">
                Historic Headline Performance
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground">
                Brandenburger Tor · Silvester Broadcast
              </h3>

              <p className="font-sans text-sm sm:text-base font-light text-foreground/80 leading-relaxed">
                Before millions of television viewers, Elena took the stage in front of the historic Brandenburg Gate in Berlin, uniting the classical concert grand with symphonic arena rock for a landmark national broadcast.
              </p>

              <div className="pt-4 border-t border-line/30 space-y-2 font-mono text-xs text-muted">
                <div className="flex justify-between py-1 border-b border-line/20">
                  <span>Location</span>
                  <span className="text-foreground">Brandenburger Tor, Berlin</span>
                </div>
                <div className="flex justify-between py-1 border-b border-line/20">
                  <span>Audience</span>
                  <span className="text-foreground">Millions live &amp; broadcast</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Repertoire</span>
                  <span className="text-accent font-serif">Here I Go Again (Symphonic Crossover)</span>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="#inquiries"
                  className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent/15 px-6 py-3 font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-foreground hover:bg-accent hover:text-background transition"
                >
                  <span>Book Elena For Your Auditorium</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Historic Milestones & Tour Season Schedule */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Historic Concert Milestones */}
          <div className="lg:col-span-6 space-y-6">
            <h4 className="font-serif text-2xl font-light text-foreground">
              Selected Concert Engagements
            </h4>
            <div className="divide-y divide-line/30">
              {PAST_HIGHLIGHTS.map((item, idx) => (
                <div key={idx} className="py-4 space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-accent">{item.date}</span>
                    <span className="text-muted text-[10px] uppercase tracking-wider">
                      {item.city}, {item.country}
                    </span>
                  </div>
                  <p className="font-serif text-base text-foreground font-light">
                    {item.venue}
                  </p>
                  <p className="font-sans text-xs text-muted font-light">
                    {item.program} · <span className="text-accent/90">{item.ticketStatus}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Upcoming Season / Tour Inquiries */}
          <div className="lg:col-span-6 space-y-6">
            <h4 className="font-serif text-2xl font-light text-foreground">
              Current Tour Season &amp; Inquiries
            </h4>
            <div className="border border-line/60 bg-surface/30 p-6 md:p-8 space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-cinematic text-accent block">
                Booking Status · 2025/2026 Season
              </span>
              <p className="font-serif text-xl sm:text-2xl text-foreground font-light">
                Private recitals, philharmonic hall bookings, and symphonic galas.
              </p>
              <p className="font-sans text-xs sm:text-sm text-foreground/75 leading-relaxed font-light">
                Elena Nuzman accepts a curated number of international solo recitals, orchestral collaborations, and exclusive private salon performances per season. All engagements are coordinated directly with artist management.
              </p>
              <div className="pt-4 border-t border-line/40">
                <a
                  href="#inquiries"
                  className="font-mono text-xs uppercase tracking-widest text-accent hover:text-foreground inline-flex items-center gap-2 transition"
                >
                  <span>Submit Venue or Gala Request</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <AcousticContour className="mt-16" />
      </div>
    </section>
  );
}
