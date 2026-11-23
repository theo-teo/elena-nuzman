import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = "/Users/jonkay/Projects/elena-nuzman";
const RAW = path.join(ROOT, "media-raw");
const REAL_RAW = path.join(RAW, "real");
const REAL_PUBLIC = path.join(ROOT, "public/images/real");
const OUT = path.join(ROOT, "public/media");

fs.mkdirSync(RAW, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

// Read FAL_KEY from private-studio/.env.local
const envText = fs.readFileSync("/Users/jonkay/Desktop/private-studio/.env.local", "utf8");
const getEnv = (key) => {
  for (const line of envText.split("\n")) {
    const m = line.match(new RegExp(`^${key}=(.+)$`));
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  return "";
};

const FAL = getEnv("FAL_KEY");
if (!FAL) {
  console.error("Missing FAL_KEY");
  process.exit(1);
}

// Helper: convert image to desktop + mobile webp
function toWebp(src, name, maxW = 1600, mobW = 800, vf = "") {
  const tmpDesk = path.join(RAW, `${name}-tmp-d.jpg`);
  const tmpMob = path.join(RAW, `${name}-tmp-m.jpg`);
  const filterDesk = [vf, `scale='min(${maxW},iw)':-2`].filter(Boolean).join(",");
  const filterMob = [vf, `scale='min(${mobW},iw)':-2`].filter(Boolean).join(",");
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", src, "-vf", filterDesk, "-q:v", "2", tmpDesk]);
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", src, "-vf", filterMob, "-q:v", "3", tmpMob]);
  execFileSync("cwebp", ["-quiet", "-q", "85", tmpDesk, "-o", path.join(OUT, `${name}.webp`)]);
  execFileSync("cwebp", ["-quiet", "-q", "80", tmpMob, "-o", path.join(OUT, `${name}-m.webp`)]);
  fs.rmSync(tmpDesk, { force: true });
  fs.rmSync(tmpMob, { force: true });
  console.log(`WebP ready: ${name}.webp & ${name}-m.webp`);
}

function toDataUri(imgPath) {
  const tmpJpg = `${imgPath}.k.jpg`;
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", imgPath, "-vf", "scale='min(1536,iw)':-2", "-q:v", "3", tmpJpg]);
  const uri = `data:image/jpeg;base64,${fs.readFileSync(tmpJpg).toString("base64")}`;
  fs.rmSync(tmpJpg, { force: true });
  return uri;
}

// Step 1: Process authentic real photos & magazine covers & album covers
export async function processRealAssets() {
  console.log("=== Processing Authentic Real Photos, Magazine Covers & Album Covers ===");

  // Exact edge-to-edge magazine cover crops (no white borders)
  const pressCovers = [
    ["Rollingstoneusa-com_October2026.jpg", "press-rollingstone", "crop=720:1010:40:145"],
    ["Harpersbazaarus-co_October2026.jpg", "press-bazaar", "crop=720:980:40:140"],
    ["Voguemiami-com_Maerz_2026_0.jpg", "press-vogue-miami", "crop=710:935:35:125"],
    ["Vogueathens-com_Februar_2026_0.jpg", "press-vogue-athens", "crop=710:945:35:120"],
    ["Cosmopolitanuk-co_September2026.jpg", "press-cosmopolitan", "crop=720:1000:40:200"],
  ];

  for (const [file, outName, cropFilter] of pressCovers) {
    const src = path.join(REAL_RAW, file);
    if (fs.existsSync(src)) {
      toWebp(src, outName, 900, 600, cropFilter);
    }
  }

  // Real authentic portraits of Elena Nuzman
  const realPhotos = [
    [path.join(REAL_RAW, "P1014188_pp_0.jpg"), "real-portrait-gold", 1600, 800, ""],
    [path.join(REAL_RAW, "P1014111_pp_0.jpg"), "real-portrait-crimson", 1600, 800, ""],
    [path.join(REAL_RAW, "P1014041_pp_0.jpg"), "real-portrait-closeup", 1600, 800, ""],
    [path.join(REAL_RAW, "Elena_KleidFeder_Edit_0.jpg"), "real-portrait-noir", 1200, 700, ""],
    [path.join(REAL_RAW, "Elena_Schloss_Burg_61rgb.jpg"), "real-schloss-strings", 1200, 700, ""],
    [path.join(REAL_RAW, "Elena_Schloss_Burg_45rgb.jpg"), "real-schloss-grand", 1200, 700, ""],
    [path.join(REAL_PUBLIC, "elena-portrait-schloss.jpg"), "real-schloss-standing", 1200, 700, ""],
    [path.join(REAL_RAW, "IMG_0673_Edit_0.jpg"), "real-impala-ceremony", 1200, 700, ""],
  ];

  for (const [src, name, w, mw, vf] of realPhotos) {
    if (fs.existsSync(src)) {
      toWebp(src, name, w, mw, vf);
    }
  }

  // Real Album Covers
  const albums = [
    [path.join(REAL_PUBLIC, "album-my-piano-and-i.jpg"), "album-my-piano-and-i", ""],
    [path.join(REAL_RAW, "liebestraeume_0.jpg"), "album-liebestraeume", ""],
    [path.join(REAL_RAW, "I_Go_Ahead.jpg"), "album-i-go-ahead", ""],
    [path.join(REAL_RAW, "Here_I_Go_Again_-_Brandenburger_Tor_-_Mix_1.jpg"), "album-here-i-go-again", ""],
    [path.join(REAL_RAW, "ibelieveinyou_album.jpg"), "album-i-believe-in-you", ""],
    [path.join(REAL_RAW, "NurSiegerStehenImLicht_Cover.jpg"), "album-sieger-im-licht", ""],
  ];

  for (const [src, name, vf] of albums) {
    if (fs.existsSync(src)) {
      toWebp(src, name, 800, 500, vf);
    }
  }
}

// Step 2: Generate Real-Identity 16:9 Cinema Master Stills via fal-ai/flux-pro/kontext
// Preserves Elena Nuzman's exact real face while placing her in a 16:9 dark & gold Steinway concert hall (removing any purple curtain)
const CINEMA_SCENES = {
  "cinema-grand": {
    ref: path.join(REAL_PUBLIC, "elena-grand-1.jpg"),
    prompt:
      "Keep this exact same woman (identical face, eyes, smile, golden-blonde wavy hair and black evening dress) seated at the gleaming black Steinway concert grand piano, but replace the purple curtain background with a dark, luxurious candle-lit philharmonic concert hall in deep obsidian black and warm champagne-gold spotlight beams illuminating the polished grand piano and her hands on the keys. Shot on ARRI Alexa 35mm anamorphic widescreen, warm golden rim light, strictly no purple or magenta.",
    motion:
      "She plays the concert grand piano with deep emotion and virtuosic grace, her hands gliding smoothly across the keys, warm golden stage light breathes softly across the polished black lacquer, very slow cinematic camera push-in. Natural, subtle movement.",
  },
  "cinema-vocal": {
    ref: path.join(REAL_PUBLIC, "elena-grand-2.jpg"),
    prompt:
      "Keep this exact same woman (identical face, eyes, golden-blonde wavy hair, metallic gold coat, holding the microphone next to her open black Steinway concert grand piano), but replace the purple curtain background with a dramatic dark philharmonic stage lit by warm golden amber spotlights and glowing concert haze. Shot on ARRI Alexa 35mm, warm golden reflections in the open grand piano lid, strictly no purple or magenta.",
    motion:
      "She sings passionately into the microphone beside her open concert grand piano, expressive emotional delivery, warm golden stage spotlight shimmers gently, slow cinematic parallax movement.",
  },
  "cinema-keys": {
    ref: path.join(REAL_RAW, "Elena_Schloss_Burg_61rgb.jpg"),
    prompt:
      "Keep this exact same woman (identical face, eyes, golden-blonde hair) behind the open soundboard and golden bronze strings of the Steinway concert grand piano, re-lit in dramatic dark chiaroscuro concert hall lighting with warm golden spotlight beams glowing on the brass piano strings, hammers, and 88 keys in the foreground. Shot on ARRI Alexa 35mm widescreen, deep obsidian shadows, warm gold highlights.",
    motion:
      "The golden piano strings and hammers vibrate with acoustic resonance as warm spotlight beams glide across the open concert grand soundboard, while the pianist gazes over the strings with quiet intensity. Slow continuous forward camera glide.",
  },
  "cinema-stage": {
    ref: path.join(REAL_RAW, "P1014188_pp_0.jpg"),
    prompt:
      "Keep this exact same woman (identical face, blue-green eyes, golden-blonde wavy hair, metallic gold jacket) performing live at a gleaming black Steinway concert grand piano on a monumental nocturnal open-air stage at the illuminated Brandenburg Gate in Berlin, golden stage light beams radiating into the dark night sky before a vast audience in warm silhouette. Shot on ARRI Alexa 35mm widescreen, cinematic luxury.",
    motion:
      "Warm golden stage light beams sweep gently through the night air above the grand piano as she performs on stage, subtle glowing golden particles drift in the spotlight, slow majestic camera dolly.",
  },
};

async function generateStillKontext(id, scene) {
  const outPng = path.join(RAW, `${id}.png`);
  if (fs.existsSync(outPng)) {
    console.log(`Still ${id}.png already exists, converting to WebP...`);
    toWebp(outPng, id, 1600, 800);
    return;
  }
  console.log(`Submitting fal-ai/flux-pro/kontext for real-identity still: ${id}...`);
  const H = { Authorization: `Key ${FAL}`, "Content-Type": "application/json" };
  const s = await fetch("https://queue.fal.run/fal-ai/flux-pro/kontext", {
    method: "POST",
    headers: H,
    body: JSON.stringify({
      prompt: scene.prompt,
      image_url: toDataUri(scene.ref),
      aspect_ratio: "16:9",
      output_format: "png",
      guidance_scale: 3.5,
    }),
  });
  if (!s.ok) {
    throw new Error(`Kontext submit failed for ${id}: ${s.status} ${(await s.text()).slice(0, 200)}`);
  }
  const { status_url, response_url } = await s.json();
  for (let i = 0; i < 90; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    const st = await (await fetch(status_url, { headers: H })).json();
    if (st.status === "COMPLETED") break;
    if (st.status === "FAILED") throw new Error(`Kontext failed for ${id}`);
  }
  const res = await (await fetch(response_url, { headers: H })).json();
  const url = res.images?.[0]?.url;
  if (!url) throw new Error(`No image URL for ${id}`);
  fs.writeFileSync(outPng, Buffer.from(await (await fetch(url)).arrayBuffer()));
  console.log(`Saved real-identity still ${outPng}`);
  toWebp(outPng, id, 1600, 800);
}

// Step 3: Generate 5-second Cinema Short Videos via Kling 2.5 Turbo Pro on fal.ai
const NEG = "deformed face, extra fingers, distorted hands, text, logo, watermark, flicker, pink, violet, purple, neon, cartoon";

function encodeVideo(rawMp4, id, scrub = false) {
  const outDesk = path.join(OUT, `${id}.mp4`);
  const outMob = path.join(OUT, `${id}-m.mp4`);
  execFileSync("ffmpeg", [
    "-loglevel", "error", "-y", "-i", rawMp4, "-an",
    "-vf", "scale=1280:-2,fps=24",
    "-c:v", "libx264", "-preset", "slow", "-crf", "24",
    ...(scrub ? ["-g", "1"] : []),
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", outDesk,
  ]);
  execFileSync("ffmpeg", [
    "-loglevel", "error", "-y", "-i", rawMp4, "-an",
    "-vf", "scale=720:-2,fps=24",
    "-c:v", "libx264", "-preset", "slow", "-crf", "27",
    ...(scrub ? ["-g", "1"] : []),
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", outMob,
  ]);
  console.log(`Encoded video: ${id}.mp4 & ${id}-m.mp4 (scrub=${scrub})`);
}

async function generateVideo(id, scene) {
  const rawMp4 = path.join(RAW, `${id}.mp4`);
  const pngPath = path.join(RAW, `${id}.png`);
  if (!fs.existsSync(pngPath)) {
    console.error(`Missing ${pngPath} for video ${id}`);
    return;
  }
  if (!fs.existsSync(rawMp4)) {
    console.log(`Submitting Kling 2.5 Turbo Pro short video for ${id}...`);
    const H = { Authorization: `Key ${FAL}`, "Content-Type": "application/json" };
    const sub = await fetch("https://queue.fal.run/fal-ai/kling-video/v2.5-turbo/pro/image-to-video", {
      method: "POST",
      headers: H,
      body: JSON.stringify({
        prompt: scene.motion,
        negative_prompt: NEG,
        image_url: toDataUri(pngPath),
        duration: "5",
        cfg_scale: 0.5,
      }),
    });
    if (!sub.ok) {
      throw new Error(`Kling submit failed for ${id}: ${sub.status} ${(await sub.text()).slice(0, 200)}`);
    }
    const { status_url, response_url } = await sub.json();
    for (let i = 0; i < 120; i++) {
      await new Promise((r) => setTimeout(r, 5000));
      const st = await (await fetch(status_url, { headers: H })).json();
      if (st.status === "COMPLETED") break;
      if (st.status === "FAILED") throw new Error(`Kling failed for ${id}`);
    }
    const res = await (await fetch(response_url, { headers: H })).json();
    const videoUrl = res.video?.url;
    if (!videoUrl) throw new Error(`No video URL for ${id}`);
    fs.writeFileSync(rawMp4, Buffer.from(await (await fetch(videoUrl)).arrayBuffer()));
    console.log(`Downloaded raw video ${rawMp4}`);
  }
  encodeVideo(rawMp4, id, id === "cinema-keys");
}

const mode = process.argv[2] || "all";

if (mode === "real" || mode === "all") {
  await processRealAssets();
}
if (mode === "stills" || mode === "all") {
  await Promise.all(Object.entries(CINEMA_SCENES).map(([id, s]) => generateStillKontext(id, s)));
}
if (mode === "videos" || mode === "all") {
  await Promise.all(Object.entries(CINEMA_SCENES).map(([id, s]) => generateVideo(id, s)));
}
console.log("=== Master Media Pipeline Step Complete ===");
