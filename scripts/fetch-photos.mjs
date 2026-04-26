/**
 * Doktortakvimi profil sayfalarından fotoğraf URL'lerini çekip db.json'a yazar.
 * Kullanım: node scripts/fetch-photos.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "../data/db.json");

async function fetchPhoto(profileUrl) {
  const res = await fetch(profileUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      "Accept": "text/html",
      "Accept-Language": "tr-TR,tr;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();

  // pixel-p2 CDN (yeni format)
  const match = html.match(/src="(\/\/pixel-p2\.s3\.eu-central-1\.amazonaws\.com\/doctor\/avatar\/[^"]+_small_square\.[a-z]+)"/i);
  if (match) return "https:" + match[1];

  // large variant
  const match2 = html.match(/href="(\/\/pixel-p2\.s3\.eu-central-1\.amazonaws\.com\/doctor\/avatar\/[^"]+_large\.[a-z]+)"/i);
  if (match2) return "https:" + match2[1];

  // eski eniyihekim CDN
  const match3 = html.match(/src="(\/\/s3[^"]+eniyihekim\.com\/doctor\/[^"]+_(?:220|400)_square\.[a-z]+)"/i);
  if (match3) return "https:" + match3[1];

  return null;
}

async function main() {
  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

  // Sadece doktortakvimi URL'i olan ve ui-avatars.com kullananlar
  const targets = db.experts.filter(e =>
    e.appointmentUrl?.includes("doktortakvimi.com") &&
    e.image?.includes("ui-avatars.com")
  );

  console.log(`📸 ${targets.length} uzman için fotoğraf aranacak`);
  let updated = 0;
  let notFound = 0;

  for (const expert of targets) {
    try {
      const photoUrl = await fetchPhoto(expert.appointmentUrl);
      if (photoUrl) {
        expert.image = photoUrl;
        updated++;
        console.log(`✅ ${expert.name}`);
      } else {
        notFound++;
        console.log(`⬜ ${expert.name} — fotoğraf yok`);
      }
    } catch (err) {
      notFound++;
      console.warn(`⚠️  ${expert.name}: ${err.message}`);
    }

    // Ara kaydet her 20'de bir
    if ((updated + notFound) % 20 === 0) {
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
    }

    await new Promise(r => setTimeout(r, 400));
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  console.log(`\n✅ ${updated} fotoğraf güncellendi, ${notFound} bulunamadı.`);
}

main().catch(console.error);
