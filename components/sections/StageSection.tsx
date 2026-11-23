"use client";

import Image from "next/image";
import SectionLabel from "../ui/SectionLabel";
import { PAST_HIGHLIGHTS, UPCOMING_CONCERTS } from "@/content/concerts";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function StageSection() {
  return (
    <section id="stage" className="relative border-t border-line py-36 px-6 md:px-14 bg-surface/30">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel chapter="Chapter 06" title="The Stage" />
            <h2 className="mt-6 font-serif text-3xl font-light sm:text-5xl md:text-6xl text-foreground">
              The Story <em className="italic text-accent">Comes Alive.</em>
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Live Performance History &amp; Tour Schedule
          </p>
        </div>

        {/* Full-width Panoramic Stage Visual */}
        <div className="relative mt-16 aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-3xl border border-line shadow-2xl">
          <Image
            src="/images/real/elena-brandenburger-tor.jpg"
            alt="Elena Nuzman live at the Brandenburg Gate"
            fill
            className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Historic Headline Performance
              </span>
              <p className="mt-2 font-serif text-2xl sm:text-4xl text-foreground font-light">
                Brandenburger Tor · Silvester Live Broadcast
              </p>
              <p className="mt-2 font-sans text-xs sm:text-sm text-foreground/70 max-w-xl">
                Performing live before millions of television viewers, uniting the classical concert grand with symphonic arena rock.
              </p>
            </div>
            <a href="#inquiries" className="el-btn-primary self-start md:self-auto shrink-0">
              Book Elena For Your Stage
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Concert Program & Tour Season */}
        <div className="mt-24 grid gap-12 lg:grid-cols-12">
          {/* Left: Historic Performances Archive */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl text-foreground font-light">
              Notable Concert Milestones
            </h3>
            <p className="font-sans text-xs text-muted max-w-md">
              Selected historic live concert engagements across European and American auditoriums.
            </p>

            <div className="divide-y divide-line border-y border-line">
              {PAST_HIGHLIGHTS.map((c) => (
                <div key={c.id} className="py-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-accent">
                      <Calendar className="h-3 w-3" />
                      <span>{c.date}</span>
                    </div>
                    <h4 className="mt-1 font-serif text-xl text-foreground font-light">{c.venue}</h4>
                    <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] text-muted">
                      <MapPin className="h-3 w-3" />
                      <span>{c.city}, {c.country} · {c.program}</span>
                    </p>
                  </div>
                  <span className="self-start sm:self-auto rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase text-accent bg-surface">
                    {c.ticketStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Verified Tour Season & Empty State */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-line bg-surface p-8 md:p-10 shadow-2xl flex flex-col justify-between h-full">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  Concert Season 2026 / 2027
                </span>
                <h3 className="mt-4 font-serif text-3xl font-light text-foreground">
                  Upcoming Tour Dates
                </h3>

                {UPCOMING_CONCERTS.length > 0 ? (
                  <div className="mt-6 divide-y divide-line">
                    {UPCOMING_CONCERTS.map((c) => (
                      <div key={c.id} className="py-4">
                        <p className="font-serif text-xl">{c.venue}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Data-driven authentic empty state (No fabricated dates) */
                  <div className="mt-6 rounded-2xl border border-line/60 bg-background/50 p-6 space-y-4">
                    <div className="h-2 w-2 rounded-full bg-accent animate-ping" />
                    <h4 className="font-serif text-xl text-foreground font-light">
                      Season Schedule in Curation
                    </h4>
                    <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                      Upcoming philharmonic recitals, international festival dates, and chamber appearances for the 2026/2027 season are currently being finalized with concert direction.
                    </p>
                    <p className="font-mono text-[11px] text-muted">
                      Patrons and presenters may submit private engagement inquiries directly below.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-line flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-muted">
                  Booking Management
                </span>
                <a href="#inquiries" className="el-btn-ghost text-xs">
                  Request Performance Dossier
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
