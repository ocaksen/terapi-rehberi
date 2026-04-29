import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { resend, FROM_NOREPLY } from "@/lib/resend";

const ALLOWED_KATEGORILER = new Set(["psikolog", "cocuk", "ergen", "aile"]);
const MAX_SORU_LEN = 800;

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    // Content-Type kontrolü
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ ok: false, error: "Geçersiz istek" }, { status: 400 });
    }

    const data = await req.json();

    // Soru zorunlu ve uzunluk limiti
    const soru = String(data.soru ?? "").trim();
    if (!soru || soru.length < 10) {
      return NextResponse.json({ ok: false, error: "Soru en az 10 karakter olmalı" }, { status: 400 });
    }
    if (soru.length > MAX_SORU_LEN) {
      return NextResponse.json({ ok: false, error: `Soru ${MAX_SORU_LEN} karakteri aşamaz` }, { status: 400 });
    }

    // Kategori whitelist kontrolü
    const kategori = String(data.kategori ?? "psikolog").trim();
    if (!ALLOWED_KATEGORILER.has(kategori)) {
      return NextResponse.json({ ok: false, error: "Geçersiz kategori" }, { status: 400 });
    }

    const entry = {
      id: Date.now().toString(),
      tarih: new Date().toISOString(),
      kategori,
      soru,
    };

    // Dosyaya kaydet
    const filePath = path.join(process.cwd(), "data", "sorular.json");
    let existing: unknown[] = [];
    if (fs.existsSync(filePath)) {
      try { existing = JSON.parse(fs.readFileSync(filePath, "utf-8")); } catch { existing = []; }
    }
    existing.push(entry);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");

    const adminEmail = process.env.ADMIN_EMAIL ?? "info@terapirehberi.com";
    if (resend) {
      await resend.emails.send({
        from: FROM_NOREPLY,
        to: [adminEmail],
        subject: `Yeni Soru: ${esc(soru.slice(0, 60))}...`,
        html: `<h3>Yeni Soru Sor Başvurusu</h3><p><b>Kategori:</b> ${esc(kategori)}</p><p><b>Soru:</b> ${esc(soru)}</p><p><b>Tarih:</b> ${entry.tarih}</p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
