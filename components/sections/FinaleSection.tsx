"use client";

import { useState } from "react";
import SectionLabel from "../ui/SectionLabel";
import MagneticButton from "../ui/MagneticButton";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function FinaleSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState("Philharmonic Hall Recital");

  return (
    <section id="inquiries" className="relative border-t border-line py-36 px-6 md:px-14 bg-background">
      <div className="mx-auto max-w-[1400px]">
        {/* The Final Statement */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <SectionLabel chapter="Chapter 07" title="The Finale" className="justify-center" />

          <h2 className="font-serif text-[clamp(2.8rem,7vw,7rem)] font-light leading-[0.94] tracking-tight text-foreground">
            “THE MUSIC CONTINUES.”
          </h2>

          <p className="font-serif text-2xl sm:text-3xl italic text-accent font-normal">
            Elena Nuzman
          </p>

          <p className="mx-auto max-w-xl font-sans text-sm font-light leading-relaxed text-foreground/75 md:text-base">
            For concert hall programming, symphonic galas, crossover festival headlines, and private salon engagements.
          </p>

          {/* Core Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="#inquiry-form" variant="primary">
              Book Elena
              <ArrowRight className="h-3.5 w-3.5" />
            </MagneticButton>

            <MagneticButton href="#music" variant="ghost">
              Discover The Music
            </MagneticButton>
          </div>
        </div>

        {/* Private Booking & Engagement Form */}
        <div id="inquiry-form" className="mt-24 max-w-3xl mx-auto">
          <div className="rounded-3xl border border-line bg-surface p-8 md:p-14 shadow-2xl">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent animate-bounce" />
                <h3 className="font-serif text-3xl font-light text-foreground">
                  Inquiry Transmitted With Discretion.
                </h3>
                <p className="mx-auto max-w-md text-sm text-foreground/70">
                  Thank you. Management will review your performance request for{" "}
                  <span className="text-accent font-medium">{inquiryType}</span> and connect with your team promptly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="space-y-8"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">
                    Confidential Inquiry Dossier
                  </span>
                  <h3 className="mt-2 font-serif text-3xl text-foreground font-light">
                    Direct Engagement
                  </h3>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                      Presenter / Institution / Patron
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tonhalle Düsseldorf / Festival Direction"
                      className="mt-2 w-full rounded-xl border border-line bg-background px-4 py-3.5 text-sm text-foreground placeholder-muted/30 focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                      Confidential Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="direction@auditorium.com"
                      className="mt-2 w-full rounded-xl border border-line bg-background px-4 py-3.5 text-sm text-foreground placeholder-muted/30 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Performance Context
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      "Philharmonic Hall Recital",
                      "Symphonic Festival Headline",
                      "Private Salon & Residence",
                      "Crossover Gala Soirée",
                    ].map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setInquiryType(tier)}
                        className={`rounded-xl border p-3 font-mono text-[10px] uppercase tracking-wider transition ${
                          inquiryType === tier
                            ? "border-accent bg-accent/15 text-accent shadow-[0_0_15px_rgba(201,184,154,0.2)]"
                            : "border-line bg-background text-foreground/60 hover:border-accent/40"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Concert Details (Date, Auditorium, Grand Piano Model)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Preferred concert dates, location, instrument available (Steinway D/B preferred), and orchestration scope."
                    className="mt-2 w-full rounded-xl border border-line bg-background px-4 py-3.5 text-sm text-foreground placeholder-muted/30 focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="el-btn-primary w-full sm:w-auto">
                    Transmit Booking Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
