/**
 * Doktortakvimi sitemap -> profil sayfası -> Groq LLM -> db.json
 *
 * Kullanım: node scripts/fetch-experts.mjs
 * Ortam değişkeni: GROQ_API_KEY
 */

import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "../data/db.json");

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.error("GROQ_API_KEY env değişkeni eksik.");
  process.exit(1);
}

const groq = new Groq({ apiKey: GROQ_API_KEY });

// Sitemap'ten Konya psikolog URL'lerini çek
async function fetchSitemapUrls() {
  const suffixes = ["", "_0", "_1", "_2", "_3"];
  const urls = new Set();

  for (const suffix of suffixes) {
    try {
      const res = await fetch(
        `https://www.doktortakvimi.com/sitemap.doctor${suffix}.xml`,
        { headers: { "User-Agent": "Mozilla/5.0" } }
      );
      if (!res.ok) continue;
      const xml = await res.text();
      const matches = xml.match(/https:\/\/[^<]+\/psikoloji\/konya[^<"]*/g) || [];
      matches.forEach(u => {
        if (!u.includes("konyaalti")) urls.add(u.trim());
      });
    } catch {
      // bu sitemap parçası yoksa atla
    }
  }

  return [...urls];
}

// Profil sayfasından HTML metnini çek
async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8",
      "Cache-Control": "no-cache",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s{2,}/g, " ")
    .slice(0, 8000);
}

// Groq ile tek profil sayfasından uzman bilgilerini çıkar
async function extractExpert(pageText, profileUrl) {
  const prompt = `Aşağıdaki metin bir psikolog/terapist profil sayfasından alınmıştır.
Bu sayfadan uzman bilgilerini çıkar ve YALNIZCA aşağıdaki JSON formatında döndür. Başka hiçbir şey yazma.

{
  "name": "Ad Soyad",
  "title": "Klinik Psikolog | Psikolog | Psikolojik Danışman | Uzman Psikolog",
  "district": "Selçuklu | Meram | Karatay | (bulunamazsa null)",
  "services": ["bireysel-terapi", "kaygi-bozuklugu", "depresyon", "emdr", "ergen-psikolojisi", "aile-terapisi", "cift-terapisi", "cocuk-psikolojisi", "travma"],
  "sessionType": ["Yüz Yüze", "Online"],
  "sessionFee": "₺X.XXX veya null",
  "shortBio": "2-3 cümlelik profesyonel tanıtım"
}

Profil URL: ${profileUrl}
Psikiyatristleri hariç tut. Verisi yoksa null kullan.

Metin:
${pageText}`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
    max_tokens: 600,
  });

  const raw = completion.choices[0].message.content.trim();
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("JSON nesnesi bulunamadı: " + raw.slice(0, 200));
  return JSON.parse(match[0]);
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
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
  console.log(`✅ ${allUrls.length} toplam URL, ${newUrls.length} yeni`);

  for (const url of newUrls) {
    console.log(`\n🌐 ${url}`);

    let html;
    try {
      html = await fetchPage(url);
    } catch (err) {
      console.warn(`  ⚠️  Sayfa alınamadı: ${err.message}`);
      await new Promise(r => setTimeout(r, 1000));
      continue;
    }

    if (html.length < 500) {
      console.warn("  ⚠️  Sayfa içeriği çok kısa (SPA/bot engeli), atlanıyor");
      await new Promise(r => setTimeout(r, 1000));
      continue;
    }

    const text = stripHtml(html);
    console.log(`  🤖 Groq parse ediliyor... (${text.length} karakter)`);

    let exp;
    try {
      exp = await extractExpert(text, url);
    } catch (err) {
      console.warn(`  ⚠️  Parse hatası: ${err.message}`);
      await new Promise(r => setTimeout(r, 1000));
      continue;
    }

    if (!exp.name) {
      console.warn("  ⚠️  İsim bulunamadı, atlanıyor");
      continue;
    }

    const slug = toSlug(exp.name);
    if (existingSlugs.has(slug)) {
      console.log(`  ⏭  Slug zaten mevcut: ${exp.name}`);
      existingUrls.add(url);
      continue;
    }

    const entry = {
      id: String(nextId++),
      slug,
      name: exp.name,
      title: exp.title || "Psikolog",
      city: "konya",
      district: exp.district || "Selçuklu",
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(exp.name)}&background=1e3a5f&color=fff&size=400`,
      shortBio: exp.shortBio || `${exp.title || "Psikolog"} olarak Konya'da hizmet vermektedir.`,
      longBio: [exp.shortBio || `${exp.name}, Konya'da psikolojik danışmanlık hizmetleri sunmaktadır.`],
      services: exp.services?.length ? exp.services : ["bireysel-terapi"],
      sessionFee: exp.sessionFee || null,
      sessionType: exp.sessionType?.length ? exp.sessionType : ["Yüz Yüze"],
      experience: null,
      phone: null,
      appointmentUrl: url,
      featured: false,
      education: [],
      certifications: [],
      languages: ["Türkçe"],
      officeAddress: `${exp.district || "Konya"}, Konya`,
      approaches: [],
    };

    db.experts.push(entry);
    existingSlugs.add(slug);
    existingUrls.add(url);
    added++;
    console.log(`  ➕ Eklendi: ${exp.name} (${exp.district || "?"}) — ${(exp.services || []).join(", ")}`);

    // Her 10 ekleme sonrası ara kaydet
    if (added % 10 === 0) {
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
      console.log(`  💾 Ara kayıt: ${added} uzman eklendi`);
    }

    // Rate limit: Groq'a aşırı istek atmamak için bekle
    await new Promise(r => setTimeout(r, 1200));
  }

  if (added > 0) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
    console.log(`\n✅ Toplam ${added} yeni uzman db.json'a eklendi.`);
  } else {
    console.log("\nℹ️  Yeni uzman bulunamadı.");
  }
}

main().catch(console.error);
