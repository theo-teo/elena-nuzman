import fs from "node:fs";
import path from "node:path";

// Read FAL_KEY from /Users/jonkay/Desktop/private-studio/.env.local
const studioEnv = fs.readFileSync("/Users/jonkay/Desktop/private-studio/.env.local", "utf8");
let FAL_KEY = "";
for (const line of studioEnv.split("\n")) {
  const m = line.match(/^FAL_KEY=(.+)$/);
  if (m) FAL_KEY = m[1].trim().replace(/^["\x27]|["\x27]$/g, "");
}

if (!FAL_KEY) {
  console.error("FAL_KEY not found!");
  process.exit(1);
}

const OUT_DIR = "/Users/jonkay/Projects/elena-nuzman/public/images";
fs.mkdirSync(OUT_DIR, { recursive: true });

const SHOTS = [
  {
    name: "hero-radiance.jpg",
    prompt:
      "Vibrant cinematic editorial portrait of a radiant and beautiful blonde European concert pianist smiling warmly with deep musical passion, seated at a magnificent polished black Steinway concert grand piano, glowing amber and golden stage lighting, warm bokeh flares, elegant champagne-toned silk evening gown, luxurious grand concert hall background, joyful emotional expression, shot on Arri 35mm, masterwork photography, 8k",
    size: "landscape_16_9",
  },
  {
    name: "vocal-passion.jpg",
    prompt:
      "Charismatic female concert pianist and vocalist singing passionately into a vintage chrome stage microphone while accompanying herself live on a concert grand piano, vibrant warm stage spotlights cutting through atmospheric haze, glowing golden rim lighting, dynamic energetic performance, four octaves vocal power, radiant smile and musical joy, 8k, photorealistic",
    size: "portrait_4_3",
  },
  {
    name: "craft-hands.jpg",
    prompt:
      "Cinematic extreme macro photograph of virtuoso pianist hands gracefully gliding over gleaming ivory and ebony piano keys, subtle motion blur, warm golden light reflected on polished black lacquer and bronze wound strings, crystal clear detail, artistic and warm luxury aesthetic, 8k",
    size: "landscape_4_3",
  },
  {
    name: "stage-triumph.jpg",
    prompt:
      "Epic triumphant live concert performance, female concert pianist standing and bowing with a jubilant beaming smile next to her concert grand piano, golden light beams radiating through the arena, warm amber and gold confetti flares, ecstatic audience ovation in silhouette, pure musical celebration and life energy, 8k",
    size: "landscape_16_9",
  },
];

async function generate(shot) {
  console.log(`Starting generation for: ${shot.name}...`);
  const queueRes = await fetch("https://queue.fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: {
      Authorization: `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: shot.prompt,
      image_size: shot.size,
      num_images: 1,
    }),
  });

  if (!queueRes.ok) {
    console.error(`Failed to queue ${shot.name}:`, await queueRes.text());
    return;
  }

  const { status_url, response_url } = await queueRes.json();

  // Poll for completion
  let completed = false;
  while (!completed) {
    await new Promise((r) => setTimeout(r, 1500));
    const statusRes = await fetch(status_url, {
      headers: { Authorization: `Key ${FAL_KEY}` },
    });
    const statusData = await statusRes.json();
    if (statusData.status === "COMPLETED") {
      completed = true;
    } else if (statusData.status === "FAILED") {
      console.error(`Failed ${shot.name}`);
      return;
    }
  }

  const resultRes = await fetch(response_url, {
    headers: { Authorization: `Key ${FAL_KEY}` },
  });
  const resultData = await resultRes.json();
  const imageUrl = resultData.images[0].url;
  console.log(`Downloading ${shot.name} from ${imageUrl}...`);

  const imgRes = await fetch(imageUrl);
  const buffer = Buffer.from(await imgRes.arrayBuffer());
  const filePath = path.join(OUT_DIR, shot.name);
  fs.writeFileSync(filePath, buffer);
  console.log(`Saved ${shot.name} (${Math.round(buffer.length / 1024)} KB)`);
}

async function runAll() {
  for (const shot of SHOTS) {
    await generate(shot);
  }
  console.log("All 4 visuals successfully generated and downloaded!");
}

runAll();
