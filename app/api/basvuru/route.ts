import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

// İzin verilen video MIME türleri
const ALLOWED_MIME = new Set(["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"]);
// İzin verilen uzantılar
const ALLOWED_EXT  = new Set(["mp4", "webm", "mov", "avi"]);
// Maksimum video boyutu: 150 MB
const MAX_VIDEO_BYTES = 150 * 1024 * 1024;
// Maksimum metin alanı uzunluğu
const MAX_TEXT = 1000;

/** HTML özel karakterlerini escape eder — email injection'ı önler */
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/** String alanını temizler ve uzunluk limitler */
function clean(val: unknown, max = MAX_TEXT): string {
  return String(val ?? "").slice(0, max).trim();
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Form alanlarını temizle ve uzunluk limitle
    const data: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "video") data[key] = clean(value, MAX_TEXT);
    }

    // Zorunlu alan kontrolü
    if (!data.adSoyad || !data.eposta || !data.telefon || !data.unvan) {
      return NextResponse.json({ ok: false, error: "Zorunlu alanlar eksik" }, { status: 400 });
    }

    // E-posta format kontrolü
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.eposta)) {
      return NextResponse.json({ ok: false, error: "Geçersiz e-posta" }, { status: 400 });
    }

    // Video dosyasını güvenli şekilde kaydet
    let videoPath: string | null = null;
    const videoFile = formData.get("video") as File | null;
    if (videoFile && videoFile.size > 0) {

      // Boyut kontrolü
      if (videoFile.size > MAX_VIDEO_BYTES) {
        return NextResponse.json({ ok: false, error: "Video 150 MB sınırını aşıyor" }, { status: 400 });
      }

      // MIME type kontrolü
      if (!ALLOWED_MIME.has(videoFile.type)) {
        return NextResponse.json({ ok: false, error: "Geçersiz video formatı" }, { status: 400 });
      }

      // Uzantı kontrolü — client'tan gelen adı değil, MIME'a göre belirle
      const extMap: Record<string, string> = {
        "video/mp4": "mp4", "video/webm": "webm",
        "video/quicktime": "mov", "video/x-msvideo": "avi",
      };
      const safeExt = extMap[videoFile.type] ?? "mp4";

      // Dosya adından gelen uzantıyı da doğrula (çift kontrol)
      const originalExt = (videoFile.name.split(".").pop() ?? "").toLowerCase();
      if (!ALLOWED_EXT.has(originalExt)) {
        return NextResponse.json({ ok: false, error: "Geçersiz uzantı" }, { status: 400 });
      }

      const uploadDir = path.join(process.cwd(), "public", "videos", "uzmanlar");
      await mkdir(uploadDir, { recursive: true });

      // Güvenli dosya adı: adSoyad'dan özel karakter temizle
      const safeName = data.adSoyad
        .replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase()
        .slice(0, 50);

      const filename  = `${Date.now()}-${safeName}.${safeExt}`;
      const filepath  = path.join(uploadDir, filename);

      const buffer = Buffer.from(await videoFile.arrayBuffer());
      await writeFile(filepath, buffer);
      videoPath = `/videos/uzmanlar/${filename}`;
    }

    // Resend ile e-posta — tüm değerler escape edildi
    const resendKey  = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL ?? "info@terapirehberi.com";
    const adminPhone = process.env.ADMIN_WHATSAPP ?? "";

    if (resendKey) {
      const row = (label: string, val: string) =>
        `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">${label}</td><td style="padding:8px;border:1px solid #eee">${esc(val)}</td></tr>`;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "TerapiRehberi Başvuru <noreply@terapirehberi.com>",
          to: [adminEmail],
          subject: `Yeni Uzman Başvurusu: ${esc(data.adSoyad)} — ${esc(data.unvan)}`,
          html: `
            <h2>Yeni Uzman Başvurusu</h2>
            <table style="border-collapse:collapse;width:100%">
              ${row("Ad Soyad",      data.adSoyad)}
              ${row("Unvan",         data.unvan)}
              ${row("E-posta",       data.eposta)}
              ${row("Telefon",       data.telefon)}
              ${row("Şehir / İlçe", `${data.sehir} / ${data.ilce}`)}
              ${row("Okul",         `${data.okul} (${data.mezuniyetYili})`)}
              ${row("Deneyim",       data.deneyim)}
              ${row("Çalışma Alanları", data.alanlar)}
              ${row("Seans Tipi",   data.seanstipi)}
              ${row("Seans Ücreti", `${data.seansUcreti} TL`)}
              ${row("Kısa Bio",     data.bio)}
              ${videoPath ? row("Video", `✅ Yüklendi: ${videoPath}`) : ""}
            </table>
            <p style="margin-top:16px;color:#666;font-size:13px">
              Başvuru tarihi: ${new Date().toLocaleString("tr-TR")}<br/>
              KVKK onayı: ✅ Verildi
            </p>
          `,
        }),
      });
    }

    // Dosyaya kaydet
    try {
      const filePath = path.join(process.cwd(), "data", "basvurular.json");
      let existing: unknown[] = [];
      if (fs.existsSync(filePath)) {
        try { existing = JSON.parse(fs.readFileSync(filePath, "utf-8")); } catch { existing = []; }
      }
      existing.push({ ...data, videoPath, tarih: new Date().toISOString() });
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
    } catch { /* sessiz hata */ }

    return NextResponse.json({
      ok: true,
      whatsapp: adminPhone
        ? `https://wa.me/${adminPhone}?text=${encodeURIComponent(
            `✅ Yeni başvuru: ${data.adSoyad} (${data.unvan}) — ${data.telefon}`
          )}`
        : null,
    });
  } catch (err) {
    console.error("Başvuru API hatası:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
