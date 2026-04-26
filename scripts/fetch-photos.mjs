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

  // Tüm bilinen CDN pattern'larını tek seferde tara
  const patterns = [
    // pixel-p2 (yeni CDN) — avatar
    /src="(\/\/pixel-p2\.s3\.eu-central-1\.amazonaws\.com\/doctor\/avatar\/[^"]+\.(?:jpg|jpeg|png|webp))"/i,
    // pixel-p2 — photos
    /["'](\/\/pixel-p2\.s3\.eu-central-1\.amazonaws\.com\/doctor\/photos\/[^"']+\.(?:jpg|jpeg|png|webp))["']/i,
    // pixel-p2 genel
    /src="(\/\/pixel-p2\.s3\.eu-central-1\.amazonaws\.com\/doctor\/[^"]+\.(?:jpg|jpeg|png|webp))"/i,
    // s3 eu-west — doktortakvimi.com bucket
    /src="(\/\/s3[^"]+doktortakvimi\.com\/doctor\/[^"]+\.(?:jpg|jpeg|png|webp))"/i,
    // s3 eu-west — eniyihekim.com bucket
    /src="(\/\/s3[^"]+eniyihekim\.com\/doctor\/[^"]+\.(?:jpg|jpeg|png|webp))"/i,
    // genel amazonaws doctor fotoğrafı
    /src="(\/\/[^"]+amazonaws\.com\/doctor\/[^"]+\.(?:jpg|jpeg|png|webp))"/i,
  ];

  for (const re of patterns) {
    const m = html.match(re);
    if (m) return "https:" + m[1];
  }

  return null;
}

async function main() {
  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

  // Doktortakvimi URL'i olan tüm uzmanlar (daha önce bulunamayanlar dahil)
  const targets = db.experts.filter(e =>
    e.appointmentUrl?.includes("doktortakvimi.com") &&
    !e.image?.includes("pixel-p2") &&
    !e.image?.includes("psikologcaksen")
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
