/**
 * Token harcamadan kalan uzmanları HTML regex ile çeker.
 * Kullanım: node scripts/fetch-experts-regex.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "../data/db.json");

async function fetchSitemapUrls() {
  const suffixes = ["", "_0", "_1", "_2", "_3"];
  const urls = new Set();
  for (const suffix of suffixes) {
    try {
      const res = await fetch(`https://www.doktortakvimi.com/sitemap.doctor${suffix}.xml`, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      if (!res.ok) continue;
      const xml = await res.text();
      const matches = xml.match(/https:\/\/[^<]+\/psikoloji\/konya[^<"]*/g) || [];
      matches.forEach(u => { if (!u.includes("konyaalti")) urls.add(u.trim()); });
    } catch { /* skip */ }
  }
  return [...urls];
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml",
      "Accept-Language": "tr-TR,tr;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

// URL slug'dan ismi tahmin et (türkçe karakterleri geri çevir)
function slugToName(slug) {
  // Sayısal suffix'leri kaldır: "zehra-yildiz-2" → "Zehra Yıldız"
  const clean = slug.replace(/-\d+$/, "").replace(/^uzm-psk-/, "");
  const trMap = { a:"a",e:"e",i:"ı",o:"o",u:"ü",s:"ş",c:"ç",g:"ğ" };
  return clean
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// HTML'den ilçe bilgisi çek
function extractDistrict(html) {
  const districtMap = {
    "selçuklu": "Selçuklu", "selcuklu": "Selçuklu",
    "meram": "Meram",
    "karatay": "Karatay",
    "ereğli": "Ereğli", "eregli": "Ereğli",
    "beyşehir": "Beyşehir", "beysehir": "Beyşehir",
    "akşehir": "Akşehir", "aksehir": "Akşehir",
    "seydişehir": "Seydişehir", "seydisehir": "Seydişehir",
    "cihanbeyli": "Cihanbeyli",
    "kulu": "Kulu",
    "çumra": "Çumra", "cumra": "Çumra",
  };
  const lower = html.toLowerCase();
  for (const [key, val] of Object.entries(districtMap)) {
    if (lower.includes(key)) return val;
  }
  return "Selçuklu";
}

// HTML'den ücret çek
function extractFee(html) {
  const match = html.match(/₺\s*([\d.,]+)/);
  if (match) return `₺${match[1]}`;
  const match2 = html.match(/([\d.]+)\s*TL/i);
  if (match2) return `₺${match2[1]}`;
  return null;
}

// HTML'den seans tipi çek
function extractSessionType(html) {
  const lower = html.toLowerCase();
  const types = [];
  if (lower.includes("yüz yüze") || lower.includes("yuz yuze") || lower.includes("klinik")) types.push("Yüz Yüze");
  if (lower.includes("online") || lower.includes("görüntülü") || lower.includes("uzaktan")) types.push("Online");
  return types.length ? types : ["Yüz Yüze"];
}

// HTML'den hizmetler çek
function extractServices(html) {
  const lower = html.toLowerCase();
  const map = [
    ["bireysel-terapi",    ["bireysel terapi"]],
    ["kaygi-bozuklugu",   ["kaygı", "anksiyete", "kaygi"]],
    ["depresyon",         ["depresyon"]],
    ["emdr",              ["emdr"]],
    ["travma",            ["travma"]],
    ["ergen-psikolojisi", ["ergen", "adolosan"]],
    ["cocuk-psikolojisi", ["çocuk psikoloji", "cocuk psikoloji"]],
    ["aile-terapisi",     ["aile terapi"]],
    ["cift-terapisi",     ["çift terapi", "cift terapi", "evlilik"]],
    ["panik-atak",        ["panik atak"]],
    ["sosyal-fobi",       ["sosyal fobi", "sosyal kaygı"]],
    ["ocd",               ["obsesif", "ocd"]],
    ["cinsel-terapi",     ["cinsel"]],
    ["stres",             ["stres"]],
  ];
  const found = [];
  for (const [slug, keywords] of map) {
    if (keywords.some(k => lower.includes(k))) found.push(slug);
  }
  return found.length ? found : ["bireysel-terapi"];
}

// Kısa bio oluştur
function makeBio(name, title, district) {
  return `${name}, Konya ${district} bölgesinde ${title} olarak bireysel ve aile terapisi hizmetleri sunmaktadır.`;
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// HTML'den title/unvan çek
function extractTitle(html) {
  const titles = ["Klinik Psikolog", "Uzman Psikolog", "Psikolog", "Psikolojik Danışman"];
  for (const t of titles) {
    if (html.includes(t)) return t;
  }
  return "Psikolog";
}

async function main() {
  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  const existingSlugs = new Set(db.experts.map(e => e.slug));
  const existingUrls  = new Set(db.experts.map(e => e.appointmentUrl).filter(Boolean));
  let nextId = Math.max(...db.experts.map(e => parseInt(e.id) || 0)) + 1;
  let added = 0;

  console.log("📋 Sitemap'ten URL'ler çekiliyor...");
  const allUrls = await fetchSitemapUrls();
  const newUrls = allUrls.filter(u => !existingUrls.has(u));
  console.log(`✅ ${allUrls.length} toplam, ${newUrls.length} yeni`);

  for (const url of newUrls) {
    // URL slug'dan ismi tahmin et
    const urlSlug = url.split("/")[3]; // "fatma-gulluoglu-birer"
    const guessedName = slugToName(urlSlug);
    const guessedSlug = toSlug(guessedName);

    if (existingSlugs.has(guessedSlug)) {
      console.log(`⏭  Mevcut: ${guessedName}`);
      existingUrls.add(url);
      continue;
    }

    console.log(`\n🌐 ${guessedName} — ${url}`);

    let html = "";
    try {
      html = await fetchPage(url);
    } catch (err) {
      console.warn(`  ⚠️  Fetch hatası: ${err.message}`);
      await new Promise(r => setTimeout(r, 800));
      continue;
    }

    if (html.length < 500) {
      console.warn("  ⚠️  Sayfa çok kısa, atlanıyor");
      continue;
    }

    const title    = extractTitle(html);
    const district = extractDistrict(html);
    const fee      = extractFee(html);
    const types    = extractSessionType(html);
    const services = extractServices(html);
    const bio      = makeBio(guessedName, title, district);

    const entry = {
      id: String(nextId++),
      slug: guessedSlug,
      name: guessedName,
      title,
      city: "konya",
      district,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(guessedName)}&background=1e3a5f&color=fff&size=400`,
      shortBio: bio,
      longBio: [bio],
      services,
      sessionFee: fee,
      sessionType: types,
      experience: null,
      phone: null,
      appointmentUrl: url,
      featured: false,
      education: [],
      certifications: [],
      languages: ["Türkçe"],
      officeAddress: `${district}, Konya`,
      approaches: [],
    };

    db.experts.push(entry);
    existingSlugs.add(guessedSlug);
    existingUrls.add(url);
    added++;
    console.log(`  ➕ ${title} · ${district} · ${types.join("+")} · ${fee || "ücret yok"}`);

    await new Promise(r => setTimeout(r, 300));
  }

  if (added > 0) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
    console.log(`\n✅ ${added} yeni uzman eklendi. Toplam: ${db.experts.length}`);
  } else {
    console.log("\nℹ️  Yeni uzman bulunamadı.");
  }
}

main().catch(console.error);
