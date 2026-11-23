import fs from "node:fs";
import path from "node:path";

const OUT = "/Users/jonkay/Projects/elena-nuzman/public/images/real";
fs.mkdirSync(OUT, { recursive: true });

const REAL_IMAGES = [
  { name: "elena-grand-1.jpg", url: "http://www.elena-nuzman.com/sites/default/files/Elena%20Nuzman%20-%201.JPG" },
  { name: "elena-grand-2.jpg", url: "http://www.elena-nuzman.com/sites/default/files/Elena%20Nuzman%20-%202.JPG" },
  { name: "elena-grand-3.jpg", url: "http://www.elena-nuzman.com/sites/default/files/Elena%20Nuzman%20-%203.JPG" },
  { name: "elena-grand-4.jpg", url: "http://www.elena-nuzman.com/sites/default/files/Elena%20Nuzman%20-%204.JPG" },
  { name: "elena-grand-5.jpg", url: "http://www.elena-nuzman.com/sites/default/files/Elena%20Nuzman%20-%205.JPG" },
  { name: "elena-portrait-schloss.jpg", url: "http://www.elena-nuzman.com/sites/default/files/Elena_Schloss_Burg%2010rgb.jpg" },
  { name: "elena-impala-award.jpg", url: "http://www.elena-nuzman.com/sites/default/files/IMPALA%20Award_1.jpg" },
  { name: "elena-brandenburger-tor.jpg", url: "http://www.elena-nuzman.com/sites/default/files/Silvester%202019.jpg" },
  { name: "album-my-piano-and-i.jpg", url: "http://www.elena-nuzman.com/sites/default/files/My%20Piano%20And%20I.jpg" },
  { name: "album-liebestraum.jpg", url: "http://www.elena-nuzman.com/sites/default/files/liebestraum_cover_0.jpg" },
  { name: "elena-stage-live.jpg", url: "http://www.elena-nuzman.com/sites/default/files/Record%20Release%20Party.jpg" },
  { name: "elena-press-portrait.jpg", url: "http://www.elena-nuzman.com/sites/default/files/Elena%20Nuzman%20Personentext_Fotos.jpg" }
];

async function downloadAll() {
  console.log("Starting download of real authentic Elena Nuzman photos...");
  for (const item of REAL_IMAGES) {
    try {
      console.log(`Fetching ${item.name} from ${item.url}...`);
      const res = await fetch(item.url, {
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" }
      });
      if (!res.ok) {
        console.error(`Failed ${item.name}: ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(path.join(OUT, item.name), buffer);
      console.log(`Saved ${item.name} (${Math.round(buffer.length / 1024)} KB)`);
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
  }
  console.log("All authentic photos downloaded!");
}

downloadAll();
