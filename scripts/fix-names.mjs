/**
 * Türkçe karakter eksik isimleri doktortakvimi profil sayfasından düzeltir.
 * Kullanım: node scripts/fix-names.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "../data/db.json");

async function fetchName(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      "Accept": "text/html",
      "Accept-Language": "tr-TR,tr;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();

  // <title> etiketinden isim çek: "Dr. Ad Soyad | Psikolog | ..."
  const titleMatch = html.match(/<title[^>]*>([^<|–\-]+)/i);
  if (titleMatch) {
    const raw = titleMatch[1].trim()
      .replace(/^(Dr\.|Uzm\.|Prof\.|Doç\.)\s*/i, "")
      .trim();
    if (raw.length > 3 && raw.length < 60) return raw;
  }

  // <h1> etiketinden isim çek
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match) {
    const raw = h1Match[1].trim()
      .replace(/^(Dr\.|Uzm\.|Prof\.|Doç\.)\s*/i, "")
      .trim();
    if (raw.length > 3 && raw.length < 60) return raw;
  }

  return null;
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// İsimde Türkçe karakter eksikliği olası mı?
const SUSPICIOUS = ["gul","yildiz","gok","yalcin","ozge","ozlem","cayli","calis",
  "kilic","seyda","gullu","guzel","aysegul","sari","boyali","caksen","ozcan",
  "ozden","cosku","coskun","gumus","gunes","gunay","cinar","cagri","buyuk",
  "yuce","yalci","seyma","beyza","seker","senyurt","sahin","caphan","cuhadar","boyuksari","yuce"];

function isSuspicious(name) {
  const lower = name.toLowerCase();
  return SUSPICIOUS.some(p => lower.includes(p));
}

async function main() {
  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  const suspects = db.experts.filter(e =>
    e.appointmentUrl?.includes("doktortakvimi.com") && isSuspicious(e.name)
  );

  console.log(`🔍 ${suspects.length} isim düzeltilecek`);
  let fixed = 0;

  for (const expert of suspects) {
    console.log(`\n📝 ${expert.name} → ${expert.appointmentUrl}`);
    try {
      const correctName = await fetchName(expert.appointmentUrl);
      if (!correctName || correctName === expert.name) {
        console.log("  ⏭  Değişiklik yok");
        await new Promise(r => setTimeout(r, 300));
        continue;
      }

      // İsimde gerçekten Türkçe karakter var mı kontrol et
      const hasTrChar = /[ğüşıöçĞÜŞİÖÇ]/.test(correctName);
      console.log(`  ✅ ${correctName} ${hasTrChar ? "(Türkçe karakter düzeltildi)" : "(değişmedi)"}`);

      const oldSlug = expert.slug;
      const newSlug = toSlug(correctName);

      expert.name = correctName;
      expert.slug = newSlug;

      // shortBio ve longBio'daki eski ismi güncelle
      expert.shortBio = expert.shortBio?.replace(expert.name, correctName) || expert.shortBio;
      expert.longBio = expert.longBio?.map(b => b.replace(expert.name, correctName));

      // image URL güncelle
      expert.image = `https://ui-avatars.com/api/?name=${encodeURIComponent(correctName)}&background=1e3a5f&color=fff&size=400`;

      if (oldSlug !== newSlug) {
        console.log(`  🔀 Slug: ${oldSlug} → ${newSlug}`);
      }
      fixed++;
    } catch (err) {
      console.warn(`  ⚠️  ${err.message}`);
    }

    await new Promise(r => setTimeout(r, 400));
  }

  if (fixed > 0) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
    console.log(`\n✅ ${fixed} isim düzeltildi.`);
  } else {
    console.log("\nℹ️  Düzeltme gerekmedi.");
  }
}

main().catch(console.error);
