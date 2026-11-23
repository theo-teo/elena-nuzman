"use client";

import { useEffect, useRef, useState } from "react";
import Kinetic from "@/components/Kinetic";
import type { Lang } from "@/lib/copy";

// Inspiriert von private-studio Office.tsx:
// Heller, warmer Creme-Salon (.cream). Links das 7-Spalten-Video von Elena am Steinway
// mit dem weissen Pillen-Knopf «Hoeren Sie den Fluegel», rechts das 5-Spalten-Formular (.office-form).

export default function SalonFinale({
  lang,
  onPlayChord,
  soundOn,
}: {
  lang: Lang;
  onPlayChord: (freq: number) => void;
  soundOn: boolean;
}) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [refId, setRefId] = useState<string>("");
  const [tier, setTier] = useState<string>("Philharmonic Hall");

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    const mobile = matchMedia("(max-width: 767px)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced) {
          if (!v.src) v.src = `/media/cinema-grand${mobile ? "-m" : ""}.mp4`;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "busy") return;
    setState("busy");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          tier,
          details: fd.get("details"),
          website: fd.get("website"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok) {
        setRefId(data.referenceId || "EN-VIP2026");
        setState("ok");
      } else {
        setState("err");
      }
    } catch {
      setState("err");
    }
  };

  return (
    <section id="booking" className="cream relative overflow-hidden border-t border-[rgb(30_24_20/.1)]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28 lg:px-16">
        {/* Left 7 Columns: Rounded [28px] Cinema Stage */}
        <div className="relative overflow-hidden rounded-[28px] shadow-[0_40px_90px_-35px_rgb(60_30_10/.5)] md:col-span-7">
          <picture>
            <source media="(max-width: 767px)" srcSet="/media/cinema-grand-m.webp" />
            <img
              src="/media/cinema-grand.webp"
              alt="Elena Nuzman at the Steinway Concert Grand"
              loading="lazy"
              className="aspect-[3/2] w-full object-cover object-top"
            />
          </picture>
          <video
            ref={vidRef}
            muted
            loop
            playsInline
            poster="/media/cinema-grand.webp"
            preload="none"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25"
          />

          <button
            type="button"
            onClick={() => onPlayChord(207.65)}
            className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 font-sans text-xs font-medium text-[rgb(30_24_20)] shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4 text-[rgb(186_104_40)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 8v4h3l4 3V5L6 8H3z" />
              <path d="M13 7c1.5 1.5 1.5 4.5 0 6M15.5 5c3 3 3 7 0 10" />
            </svg>
            {soundOn
              ? lang === "de"
                ? "Steinway klingt (As-Dur)"
                : "Steinway Resonating"
              : lang === "de"
              ? "Hören Sie den Flügel"
              : "Hear the Grand"}
          </button>

          <div className="absolute bottom-5 left-5 right-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#daa55c]">
              {lang === "de"
                ? "Düsseldorf · Berlin · New York"
                : "Düsseldorf · Berlin · New York"}
            </span>
            <p className="mt-1 font-serif text-xl italic text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.65)] sm:text-2xl md:text-3xl">
              {lang === "de"
                ? "«Jeder Abend am Flügel ist ein Unikat – gespielt und gesungen für den Augenblick.»"
                : "«Every evening at the concert grand is a one-of-a-kind work—played and sung for the moment.»"}
            </p>
          </div>
        </div>

        {/* Right 5 Columns: Discreet Salon Inquiry Form (.office-form) */}
        <div className="md:col-span-5">
          <p className="ag-eyebrow">
            {lang === "de"
              ? "08 / Diskrete Konzert- & Gala-Anfrage"
              : "08 / Discreet Concert & Gala Inquiry"}
          </p>
          <h2 className="mt-4 text-[clamp(2rem,4.4vw,4.2rem)] leading-[0.98] text-[rgb(30_24_20)]">
            <Kinetic
              text={lang === "de" ? "DER NÄCHSTE ABEND" : "THE NEXT EVENING"}
              className="font-sans font-light uppercase tracking-[-0.035em]"
            />{" "}
            <em className="block font-serif italic font-normal tracking-[-0.02em] text-[rgb(186_104_40)]">
              {lang === "de" ? "gehört Ihrer Bühne." : "belongs to your stage."}
            </em>
          </h2>

          {state === "ok" ? (
            <div className="mt-8 rounded-[22px] border border-[rgb(30_24_20/.12)] bg-white/80 p-8 shadow-lg">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-[rgb(186_104_40)]">
                Dossier · {refId}
              </span>
              <h3 className="mt-2 font-serif text-2xl text-[rgb(30_24_20)]">
                {lang === "de"
                  ? "Anfrage diskret empfangen."
                  : "Inquiry Received With Discretion."}
              </h3>
              <p className="mt-2 font-sans text-xs font-light leading-relaxed text-[rgb(30_24_20/.75)] sm:text-sm">
                {lang === "de"
                  ? `Vielen Dank. Das Management prüft Ihre Anfrage (${tier}) und meldet sich persönlich bei Ihnen.`
                  : `Thank you. Artist management will review your inquiry (${tier}) and respond personally.`}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="office-form mt-8 grid gap-px overflow-hidden rounded-[22px] border border-[rgb(30_24_20/.12)] shadow-[0_25px_60px_-25px_rgb(60_30_10/.2)]"
            >
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />
              <label>
                <span className="sr-only">
                  {lang === "de" ? "Ihr Name oder Haus" : "Your Name or Institution"}
                </span>
                <input
                  name="name"
                  required
                  placeholder={
                    lang === "de"
                      ? "Ihr Name / Konzerthaus / Veranstalter"
                      : "Your Name / Philharmonic Hall / Host"
                  }
                  maxLength={200}
                />
              </label>
              <label>
                <span className="sr-only">
                  {lang === "de" ? "E-Mail oder Telefon" : "Email or Phone"}
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={
                    lang === "de"
                      ? "E-Mail-Adresse für Rückmeldung"
                      : "Email address for direct response"
                  }
                  maxLength={200}
                />
              </label>

              {/* Context Selector Row */}
              <div className="flex flex-wrap gap-1.5 px-4 py-3">
                {[
                  "Philharmonic Hall",
                  "Gala & Festival",
                  "Private Soirée",
                  "Crossover Recital",
                ].map((tItem) => (
                  <button
                    type="button"
                    key={tItem}
                    onClick={() => setTier(tItem)}
                    className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] transition ${
                      tier === tItem
                        ? "bg-[rgb(30_24_20)] text-[#f6f0e6]"
                        : "bg-[rgb(30_24_20/.07)] text-[rgb(30_24_20/.7)] hover:bg-[rgb(30_24_20/.14)]"
                    }`}
                  >
                    {tItem}
                  </button>
                ))}
              </div>

              <label>
                <span className="sr-only">
                  {lang === "de" ? "Vertrauliche Eckdaten" : "Confidential Details"}
                </span>
                <textarea
                  name="details"
                  required
                  rows={3}
                  placeholder={
                    lang === "de"
                      ? "Wunschdatum, Ort, Steinway-Flügel vor Ort und Rahmen des Abends..."
                      : "Preferred date, city/venue, Steinway availability, and evening scope..."
                  }
                  maxLength={1500}
                />
              </label>

              <div className="flex items-center justify-between gap-4 p-4">
                <p
                  role="status"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(30_24_20/.55)]"
                >
                  {state === "err"
                    ? lang === "de"
                      ? "Bitte Eingaben prüfen"
                      : "Please check inputs"
                    : lang === "de"
                    ? "Vertrauliche Direktleitung"
                    : "Confidential Direct Dispatch"}
                </p>
                <button
                  type="submit"
                  disabled={state === "busy"}
                  className="ag-btn ag-btn-solid"
                >
                  {state === "busy"
                    ? lang === "de"
                      ? "Sendet..."
                      : "Sending..."
                    : lang === "de"
                    ? "Anfrage senden →"
                    : "Send Inquiry →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
