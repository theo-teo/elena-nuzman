"use client";

// Gemeinsamer Audiograph: Agentenstimme und Mikrofon laufen durch denselben Analyser,
// damit die Stimmkurve echte Frequenzen zeigt und nicht geraten wird.
let ctx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let micSource: MediaStreamAudioSourceNode | null = null;
let micStream: MediaStream | null = null;
let current: HTMLAudioElement | null = null;
export type Source = "agent" | "mic" | null;
let source: Source = null;

function graph() {
  if (!ctx) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new C();
    analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.72;
  }
  if (ctx.state === "suspended") ctx.resume();
  return { ctx, analyser: analyser! };
}

export const getAnalyser = () => analyser;
export const getSource = () => source;

export function stopVoice() {
  if (current) {
    current.pause();
    current = null;
  }
  if (source === "agent") source = null;
}

// Spielt eine Audiodatei durch den Analyser. Löst auf, wenn sie fertig ist.
export function playThrough(blob: Blob): Promise<void> {
  const { ctx, analyser } = graph();
  stopVoice();
  const el = new Audio(URL.createObjectURL(blob));
  current = el;
  const node = ctx.createMediaElementSource(el);
  node.connect(analyser);
  analyser.connect(ctx.destination);
  source = "agent";
  return new Promise((resolve) => {
    const done = () => {
      node.disconnect();
      if (current === el) { current = null; source = null; }
      resolve();
    };
    el.onended = done;
    el.onerror = done;
    el.play().catch(done);
  });
}

export async function startMic() {
  const { ctx, analyser } = graph();
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    micSource = ctx.createMediaStreamSource(micStream);
    try { analyser.disconnect(); } catch {}
    micSource.connect(analyser);
    source = "mic";
  } catch {
    source = null;
  }
}

export function stopMic() {
  micSource?.disconnect();
  micStream?.getTracks().forEach((t) => t.stop());
  micSource = null;
  micStream = null;
  if (source === "mic") source = null;
}

// Lautheit 0..1 aus dem aktuellen Signal, für Auge und Logo
export function level() {
  if (!analyser || !source) return 0;
  const buf = new Uint8Array(analyser.fftSize);
  analyser.getByteTimeDomainData(buf);
  let sum = 0;
  for (let i = 0; i < buf.length; i++) {
    const v = (buf[i] - 128) / 128;
    sum += v * v;
  }
  return Math.min(1, Math.sqrt(sum / buf.length) * 4);
}
