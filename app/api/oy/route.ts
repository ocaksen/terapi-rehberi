import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Soru {
  id: string;
  begeni?: number;
}

// Basit in-memory IP rate limiter — aynı IP, aynı soru için 1 saatte 1 oy
const oyMap = new Map<string, number>(); // "ip:soruId" → timestamp

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    // id zorunlu + yalnızca sayısal (timestamp-based id)
    if (!id || typeof id !== "string" || !/^\d+$/.test(id)) {
      return NextResponse.json({ ok: false, error: "Geçersiz istek" }, { status: 400 });
    }

    // IP tabanlı rate limit: aynı IP + soru için 1 saat cooldown
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? req.headers.get("x-real-ip")
      ?? "unknown";
    const rateLimitKey = `${ip}:${id}`;
    const lastVote = oyMap.get(rateLimitKey) ?? 0;
    const now = Date.now();

    if (now - lastVote < 60 * 60 * 1000) {
      return NextResponse.json({ ok: false, error: "Zaten oy kullandınız" }, { status: 429 });
    }
    oyMap.set(rateLimitKey, now);

    // Map temizliği: 2 saatten eski kayıtları sil
    if (oyMap.size > 5000) {
      const cutoff = now - 2 * 60 * 60 * 1000;
      for (const [key, ts] of oyMap.entries()) {
        if (ts < cutoff) oyMap.delete(key);
      }
    }

    const filePath = path.join(process.cwd(), "data", "sorular.json");
    let sorular: Soru[] = [];
    if (fs.existsSync(filePath)) {
      try { sorular = JSON.parse(fs.readFileSync(filePath, "utf-8")); } catch { sorular = []; }
    }

    const idx = sorular.findIndex((s) => s.id === id);
    if (idx !== -1) {
      sorular[idx].begeni = (sorular[idx].begeni ?? 0) + 1;
      fs.writeFileSync(filePath, JSON.stringify(sorular, null, 2), "utf-8");
      return NextResponse.json({ ok: true, begeni: sorular[idx].begeni });
    }

    return NextResponse.json({ ok: false, error: "Bulunamadı" }, { status: 404 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
