"use client";

import { useState } from "react";
import Image from "next/image";
import ChapterCard from "../ui/ChapterCard";
import AcousticContour from "../ui/AcousticContour";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function FinaleSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState("Philharmonic Hall Recital");

  return (
    <section
      id="inquiries"
      className="relative w-full border-t border-line/40 py-24 sm:py-32 md:py-40 px-5 md:px-12 bg-background overflow-hidden"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line/40 pb-8">
          <ChapterCard
            chapter="Chapter 07"
            italicPrefix="The"
            title="Continuing Resonance"
            subtitle="Engagements, philharmonic recitals, symphonic galas, and private salon concerts."
          />
          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted/70">
            Artist Management &amp; Inquiries
          </div>
        </div>

        {/* The Final Grand Statement */}
        <div className="my-16 md:my-24 text-center max-w-4xl mx-auto space-y-6">
          <span className="font-script text-4xl sm:text-6xl md:text-7xl text-accent/90 block select-none">
            The
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,7.5vw,6.5rem)] font-light uppercase tracking-tight text-foreground leading-[0.94]">
            Music Continues
          </h2>
          <p className="font-mono text-xs sm:text-sm uppercase tracking-cinematic text-accent">
            Elena Nuzman · Concert Pianist &amp; Vocalist
          </p>
          <p className="font-sans text-xs sm:text-sm md:text-base font-light text-foreground/75 leading-relaxed max-w-xl mx-auto">
            Music does not cease when the final hammer rests against the string. Its resonance echoes in memory, in vibration, and in the silence that follows.
          </p>
        </div>

        {/* Dual Layout: Curated Epilogue Visual + Discrete Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Authentic Uncropped Portrait Frame */}
          <div className="lg:col-span-5">
            <div className="relative border border-line/60 bg-surface/30 p-4 sm:p-6 backdrop-blur-sm mx-auto max-w-md lg:max-w-none">
              <span className="absolute -top-1 -left-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
              <span className="absolute -top-1 -right-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
              <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-accent/60 leading-none">+</span>
              <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-accent/60 leading-none">+</span>

              <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
                <Image
                  src="/images/real/elena-grand-5.jpg"
                  alt="Elena Nuzman epilogue portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-line/40 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-muted">
                <span>Epilogue · Silence &amp; Sound</span>
                <span className="text-accent">Finis Opus</span>
              </div>
            </div>
          </div>

          {/* Right: Bespoke Confidential Inquiry Form (Clean, Stacked, 100% Mobile Responsive) */}
          <div className="lg:col-span-7">
            <div className="border border-line/60 bg-surface/30 p-6 sm:p-10 backdrop-blur-sm">
              <div className="border-b border-line/40 pb-4 mb-6">
                <span className="font-mono text-[10px] uppercase tracking-cinematic text-accent block">
                  Confidential Transmission
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-foreground mt-1">
                  Performance &amp; Engagement Request
                </h3>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
                  <h4 className="font-serif text-2xl font-light text-foreground">
                    Inquiry Received With Discretion
                  </h4>
                  <p className="mx-auto max-w-md font-sans text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    Thank you. Artist management will review your request for{" "}
                    <span className="text-accent">{inquiryType}</span> and contact your team promptly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
                        Your Name / Institution *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Festival Director / Patron"
                        className="w-full rounded-none border border-line/60 bg-surface/50 px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
                        Direct Contact *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. office@orchestra.com"
                        className="w-full rounded-none border border-line/60 bg-surface/50 px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
                        Engagement Category
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full rounded-none border border-line/60 bg-surface px-4 py-3 font-sans text-sm text-foreground focus:border-accent focus:outline-none transition"
                      >
                        <option>Philharmonic Hall Recital</option>
                        <option>Symphonic Orchestra Soloist</option>
                        <option>Festival Headline Performance</option>
                        <option>Private Concert &amp; Salon Recital</option>
                        <option>Media &amp; Masterclass Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
                        Auditorium / City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Zurich, Berlin, London, New York"
                        className="w-full rounded-none border border-line/60 bg-surface/50 px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
                      Engagement Notes &amp; Desired Timeframe
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please indicate proposed dates, acoustic venue specifications, or musical repertoire direction..."
                      className="w-full rounded-none border border-line/60 bg-surface/50 p-4 font-sans text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none transition resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                      Direct transmission to artist management
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-accent bg-accent px-8 py-3.5 font-mono text-[10px] md:text-[11px] font-semibold uppercase tracking-widest text-background hover:bg-foreground hover:border-foreground transition"
                    >
                      <span>Transmit Confidential Inquiry</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <AcousticContour className="mt-20" />
      </div>
    </section>
  );
}
