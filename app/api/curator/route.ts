import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { ARTIST } from "@/content/artist";
import { ALBUMS } from "@/content/albums";
import { PAST_HIGHLIGHTS } from "@/content/concerts";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the artistic dramaturg and private concierge for the internationally acclaimed concert pianist and 4-octave vocalist Elena Nuzman.
Your role is to converse discreetly, eloquently, and accurately with concert promoters, festival directors, orchestral conductors, and private salon patrons.

TONE & MANNER:
- Discrete luxury, quiet confidence, sovereign warmth, cultured precision.
- No emojis, no sales cliches, no exclamation marks.
- Language: Swiss High German ("ss" instead of "ß", formal "Sie") or elegant British English depending on the user's language.

VERIFIED FACTS ABOUT ELENA NUZMAN:
- Academic Master: Master of Music (Diplom-Konzertpianistin) from the Robert Schumann Hochschule Düsseldorf.
- Heritage: Born 1981 in Moldova to Nina Kvasowa (celebrated concert pianist) and Josef Nuzman (violinist/actor). Played piano melodies by ear at age 2; admitted to elite prodigy lyceum at age 7; international solo touring at 17.
- Instrument: Steinway & Sons D-274 Concert Grand Piano.
- Vocal Compass: Extraordinary 4-octave range (E3 to E7), spanning contralto chest depths, mezzo-soprano lyrical core, dramatic soprano belting, to flageolet/whistle stratosphere.
- Key Recordings & Accolades:
  * "Liebesträume" (IMPALA Silver Award, 5M+ streams)
  * "My Piano And I" (2025 acoustic studio album)
  * "I Believe In You" (RTL Album of the Year)
  * Historic live performance of Whitesnake's "Here I Go Again" at the Brandenburg Gate for the national New Year's Eve broadcast before millions.
  * Official authorization from ABBA (Björn Ulvaeus & Benny Andersson) for the German symphonic adaption "Nur die Sieger steh'n im Licht" (The Winner Takes It All).
- Engagements: Elena accepts a strictly curated number of solo recitals, philharmonic orchestral engagements, and exclusive private salon performances per season. All booking inquiries are transmitted directly to artist management.

Answer concisely, beautifully, and never invent unverified dates or facts.`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // 1. Try Anthropic Claude 3.5 Sonnet if available
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (anthropicKey && anthropicKey.startsWith("sk-ant")) {
      try {
        const anthropic = new Anthropic({ apiKey: anthropicKey });
        const response = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 600,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: message }],
        });

        const reply = response.content
          .filter((c) => c.type === "text")
          .map((c) => (c as { text: string }).text)
          .join("\n");

        return NextResponse.json({ reply, provider: "Anthropic Claude 3.5 Sonnet" });
      } catch (err) {
        console.warn("Anthropic API call fallback to OpenAI/Gemini:", err);
      }
    }

    // 2. Try OpenAI GPT-4o if available
    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey && openaiKey.startsWith("sk-")) {
      try {
        const openai = new OpenAI({ apiKey: openaiKey });
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          max_tokens: 600,
          temperature: 0.7,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
          ],
        });

        const reply = response.choices[0]?.message?.content || "";
        return NextResponse.json({ reply, provider: "OpenAI GPT-4o" });
      } catch (err) {
        console.warn("OpenAI API call fallback:", err);
      }
    }

    // 3. Fallback: Curated Dramaturg Responses
    const lower = message.toLowerCase();
    let curatedReply =
      "Elena Nuzman verbindet das klassische Repertoire von Franz Liszt und Frédéric Chopin mit einer unvergleichlichen Vier-Oktaven-Stimme. Für detaillierte Programmanfragen, Orchester-Engagements oder private Salon-Konzerte steht Ihnen das Management über das vertrauliche Anfrageformular gerne zur Verfügung.";

    if (lower.includes("steinway") || lower.includes("flügel") || lower.includes("piano")) {
      curatedReply =
        "Elena Nuzman konzertiert bevorzugt auf dem Steinway & Sons D-274 Konzertflügel. Die akustische Feinabstimmung auf den Raum und die Nuancen der Mechanik sind elementarer Bestandteil ihrer klanglichen Interpretation.";
    } else if (lower.includes("oktav") || lower.includes("stimme") || lower.includes("vocal") || lower.includes("voice")) {
      curatedReply =
        "Elenas Stimmumfang reicht von E3 (Kontralt) bis E7 (Flageolett-Register). Diese seltene Vier-Oktaven-Spannweite entdeckte sie während ihres Meisterstudiums an der Robert Schumann Hochschule Düsseldorf und kultivierte sie parallel zur Klaviervirtuosität.";
    } else if (lower.includes("repertoire") || lower.includes("programm") || lower.includes("liszt")) {
      curatedReply =
        "Das Repertoire umfasst zentrale romantische Meisterwerke (Liszt Liebesträume, Chopin Nocturnes, Rachmaninoff) bis hin zu cineastischen Crossover-Kompositionen des aktuellen Albums «My Piano And I».";
    }

    return NextResponse.json({ reply: curatedReply, provider: "Curated Dramaturgy" });
  } catch (error) {
    console.error("Curator API error:", error);
    return NextResponse.json(
      { error: "Internal Concierge Error" },
      { status: 500 }
    );
  }
}
