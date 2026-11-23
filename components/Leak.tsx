"use client";
import { useMemo, useState } from "react";
import { num } from "@/lib/fmt";

function Row({ label, value, set, min, max, step, fmt }: { label: string; value: number; set: (v: number) => void; min: number; max: number; step: number; fmt: (v: number) => string }) {
  return (
    <label className="block">
      <span className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-white/50">
        {label}
        <span className="text-ember-200">{fmt(value)}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="mt-3 w-full accent-[#e8893a]" />
    </label>
  );
}

// Provisions-Leck: was ein Betrieb jedes Jahr an Portale abgibt, und was davon zurückkommt.
export default function Leak() {
  const [mode, setMode] = useState<"firma" | "hotel" | "gastro">("firma");
  const [visits, setVisits] = useState(2500);
  const [conv, setConv] = useState(1.2);
  const [deal, setDeal] = useState(2400);
  const [units, setUnits] = useState(40);
  const [price, setPrice] = useState(180);
  const [occ, setOcc] = useState(70);
  const [share, setShare] = useState(80);
  const [fee, setFee] = useState(17);
  const [covers, setCovers] = useState(120);
  const [check, setCheck] = useState(48);
  const [delivery, setDelivery] = useState(20);
  const [dfee, setDfee] = useState(28);

  const r = useMemo(() => {
    if (mode === "firma") {
      const revenue = visits * 12 * (conv / 100) * deal;
      const lost = revenue * 0.6;
      const back = lost * 0.5;
      return { revenue, lost, back, line: `${num(visits)} Besucher pro Monat, ${conv} % werden Kunden, CHF ${num(deal)} pro Auftrag` };
    }
    if (mode === "hotel") {
      const revenue = units * 365 * (occ / 100) * price;
      const lost = revenue * (share / 100) * (fee / 100);
      const back = revenue * Math.min(share / 100, 0.3) * (fee / 100);
      return { revenue, lost, back, line: `${units} Einheiten, ${occ} % belegt, CHF ${price} pro Nacht` };
    }
    const revenue = covers * 360 * check;
    const lost = revenue * (delivery / 100) * (dfee / 100);
    const back = lost * 0.5;
    return { revenue, lost, back, line: `${covers} Gäste pro Tag, CHF ${check} pro Kopf` };
  }, [mode, units, price, occ, share, fee, covers, check, delivery, dfee, visits, conv, deal]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-7">
        <div className="inline-flex border border-white/15 text-[10px] uppercase tracking-[0.3em]">
          {(["firma", "hotel", "gastro"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`px-4 py-3 transition-colors sm:px-5 ${mode === m ? "bg-ember-400 text-ink" : "text-white/50"}`}>{{ firma: "Unternehmen", hotel: "Hotel", gastro: "Restaurant" }[m]}</button>
          ))}
        </div>
        {mode === "firma" ? (
          <>
            <Row label="Website-Besucher pro Monat" value={visits} set={setVisits} min={200} max={50000} step={100} fmt={(v) => num(v)} />
            <Row label="Davon werden Kunden" value={conv} set={setConv} min={0.2} max={5} step={0.1} fmt={(v) => `${v.toFixed(1)} %`} />
            <Row label="Ø Wert eines Auftrags" value={deal} set={setDeal} min={50} max={50000} step={50} fmt={(v) => `CHF ${num(v)}`} />
          </>
        ) : mode === "hotel" ? (
          <>
            <Row label="Zimmer oder Apartments" value={units} set={setUnits} min={5} max={300} step={1} fmt={(v) => `${v}`} />
            <Row label="Ø Preis pro Nacht" value={price} set={setPrice} min={80} max={600} step={5} fmt={(v) => `CHF ${v}`} />
            <Row label="Belegung" value={occ} set={setOcc} min={30} max={95} step={1} fmt={(v) => `${v} %`} />
            <Row label="Anteil über Portale" value={share} set={setShare} min={10} max={100} step={1} fmt={(v) => `${v} %`} />
            <Row label="Ø Provision" value={fee} set={setFee} min={10} max={25} step={0.5} fmt={(v) => `${v} %`} />
          </>
        ) : (
          <>
            <Row label="Gäste pro Tag" value={covers} set={setCovers} min={20} max={600} step={5} fmt={(v) => `${v}`} />
            <Row label="Ø Umsatz pro Kopf" value={check} set={setCheck} min={15} max={150} step={1} fmt={(v) => `CHF ${v}`} />
            <Row label="Anteil über Lieferplattformen" value={delivery} set={setDelivery} min={0} max={60} step={1} fmt={(v) => `${v} %`} />
            <Row label="Ø Plattform-Gebühr" value={dfee} set={setDfee} min={10} max={35} step={1} fmt={(v) => `${v} %`} />
          </>
        )}
      </div>
      <div className="relative overflow-hidden border border-ember-500/30 bg-gradient-to-br from-ember-600/20 via-ink to-ink p-8 sm:p-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 animate-glow rounded-full bg-ember-500/20 blur-3xl" />
        <p className="text-[10px] uppercase tracking-ultra text-ember-300">{mode === "firma" ? "Ungenutztes Potenzial pro Jahr" : "Ihr Provisions-Leck pro Jahr"}</p>
        <p className="mt-6 font-display text-6xl font-light tabular-nums text-fire sm:text-8xl">CHF {num(r.lost)}</p>
        <p className="mt-3 text-sm text-white/50">{r.line}. Umsatz ca. CHF {num(r.revenue)}.</p>
        <div className="hairline my-8" />
        <p className="text-[10px] uppercase tracking-ultra text-white/50">Realistisch zurückholbar</p>
        <p className="mt-3 font-display text-4xl font-light tabular-nums text-ember-100">CHF {num(r.back)} <span className="text-base text-white/40">pro Jahr</span></p>
        <p className="mt-3 max-w-md text-xs leading-relaxed text-white/40">
          {mode === "firma" ? "Annahme: Eine Seite, die überzeugt, führt, berät und rund um die Uhr antwortet, steigert die Abschlussquote um rund 60 %. Davon realistisch die Hälfte im ersten Jahr." : mode === "hotel" ? "Annahme: rund 30 % der Portal-Buchungen werden zu Direktbuchungen, mit eigener Buchungsstrecke, Bestpreis und Gästekonto." : "Annahme: die Hälfte der Plattform-Bestellungen läuft künftig über die eigene Bestellung."} Unverbindliche Schätzung.
        </p>
        <a href="#kontakt" onClick={() => sessionStorage.setItem("anka-leak", `Potenzial ca. CHF ${num(r.lost)} pro Jahr (${r.line})`)} className="mt-8 inline-block bg-ember-400 px-8 py-4 text-[10px] uppercase tracking-ultra text-ink hover:bg-ember-300">
          Dieses Potenzial heben
        </a>
      </div>
    </div>
  );
}
