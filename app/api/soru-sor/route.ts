import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const entry = {
      id: Date.now().toString(),
      tarih: new Date().toISOString(),
      kategori: data.kategori ?? "psikolog",
      soru: data.soru ?? "",
    };

    // Dosyaya kaydet
    const filePath = path.join(process.cwd(), "data", "sorular.json");
    let existing: unknown[] = [];
    if (fs.existsSync(filePath)) {
      try { existing = JSON.parse(fs.readFileSync(filePath, "utf-8")); } catch { existing = []; }
    }
    existing.push(entry);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");

    // Resend ile e-posta (opsiyonel)
    const resendKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL ?? "info@terapirehberi.com";
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "TerapiRehberi <noreply@terapirehberi.com>",
          to: [adminEmail],
          subject: `Yeni Soru: ${entry.soru.slice(0, 60)}...`,
          html: `<h3>Yeni Soru Sor Başvurusu</h3><p><b>Kategori:</b> ${entry.kategori}</p><p><b>Soru:</b> ${entry.soru}</p><p><b>Tarih:</b> ${entry.tarih}</p>`,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
