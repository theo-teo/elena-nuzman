"use client";

import { useState } from "react";
import { MessageSquare, Send, Sparkles, Loader2 } from "lucide-react";

export default function CuratorDialogue() {
  const [messages, setMessages] = useState<
    Array<{ role: "curator" | "user"; text: string; provider?: string }>
  >([
    {
      role: "curator",
      text: "Willkommen im Dramaturgie-Archiv von Elena Nuzman. Ich stehe Konzertveranstaltern, Festivalleitungen und Patrons für vertrauliche Fragen zu Repertoire, Bühnenanforderungen und Engagements zur Verfügung.",
      provider: "Archival Concierge",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const SUGGESTED_QUERIES = [
    "Wie verbindet Elena Liszt mit modernem Crossover?",
    "Welche Akustik benötigt der Steinway D-274?",
    "Wie wurde die 4-Oktaven-Stimme entdeckt?",
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: textToSend }]);
    setLoading(true);

    try {
      const res = await fetch("/api/curator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "curator", text: data.reply, provider: data.provider },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "curator",
            text: "Für dieses Anliegen kontaktieren Sie bitte direkt das Künstler-Management über das Anfrageformular.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "curator",
          text: "Die Verbindung zum Archiv-Concierge wird wiederhergestellt. Bitte senden Sie Ihre Nachricht über das Buchungsformular.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 border border-line/60 bg-surface/30 p-5 sm:p-8 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-line/40 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-cinematic text-accent block">
              Curator's Salon Dialogue
            </span>
            <p className="font-serif text-sm sm:text-base text-foreground font-light">
              Diskretionäre Archiv-Auskunft
            </p>
          </div>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted/70 hidden sm:inline">
          AI Concierge · Real-time
        </span>
      </div>

      {/* Suggested Questions */}
      <div className="mb-6 flex flex-wrap gap-2">
        {SUGGESTED_QUERIES.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => handleSend(q)}
            disabled={loading}
            className="rounded-full border border-line/50 bg-surface/40 px-3.5 py-1.5 font-mono text-[9px] sm:text-[10px] text-muted hover:text-foreground hover:border-accent transition disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              m.role === "user" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            <div
              className={`max-w-xl rounded-none p-4 text-xs sm:text-sm font-light leading-relaxed border ${
                m.role === "user"
                  ? "border-accent/40 bg-accent/15 text-foreground"
                  : "border-line/40 bg-surface/60 text-foreground/85"
              }`}
            >
              <p>{m.text}</p>
              {m.provider && (
                <span className="mt-2 block font-mono text-[8px] uppercase tracking-widest text-accent/60">
                  {m.provider}
                </span>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Kuratoren-Archiv konsultiert...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-6 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Fragen Sie nach Repertoire, Orchester-Besetzung, Akustik..."
          className="flex-1 rounded-none border border-line/60 bg-surface/50 px-4 py-3 font-sans text-xs sm:text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none transition"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-background hover:bg-foreground hover:border-foreground transition disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Senden</span>
        </button>
      </form>
    </div>
  );
}
