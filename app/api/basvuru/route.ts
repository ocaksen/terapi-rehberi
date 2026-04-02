import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Form alanlarını çıkar
    const data: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "video") data[key] = value.toString();
    }

    // Video dosyasını kaydet
    let videoPath: string | null = null;
    const videoFile = formData.get("video") as File | null;
    if (videoFile && videoFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "videos", "uzmanlar");
      await mkdir(uploadDir, { recursive: true });

      const ext = videoFile.name.split(".").pop() ?? "mp4";
      const filename = `${Date.now()}-${data.adSoyad?.replace(/\s+/g, "-").toLowerCase() ?? "uzman"}.${ext}`;
      const filepath = path.join(uploadDir, filename);

      const buffer = Buffer.from(await videoFile.arrayBuffer());
      await writeFile(filepath, buffer);
      videoPath = `/videos/uzmanlar/${filename}`;
    }

    // Resend ile e-posta gönder
    const resendKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL ?? "info@terapirehberi.com";
    const adminPhone = process.env.ADMIN_WHATSAPP ?? "";

    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "TerapiRehberi Başvuru <noreply@terapirehberi.com>",
          to: [adminEmail],
          subject: `Yeni Uzman Başvurusu: ${data.adSoyad} — ${data.unvan}`,
          html: `
            <h2>Yeni Uzman Başvurusu</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Ad Soyad</td><td style="padding:8px;border:1px solid #eee">${data.adSoyad}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Unvan</td><td style="padding:8px;border:1px solid #eee">${data.unvan}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">E-posta</td><td style="padding:8px;border:1px solid #eee">${data.eposta}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #eee">${data.telefon}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Şehir / İlçe</td><td style="padding:8px;border:1px solid #eee">${data.sehir} / ${data.ilce}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Okul</td><td style="padding:8px;border:1px solid #eee">${data.okul} (${data.mezuniyetYili})</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Deneyim</td><td style="padding:8px;border:1px solid #eee">${data.deneyim}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Çalışma Alanları</td><td style="padding:8px;border:1px solid #eee">${data.alanlar}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Seans Tipi</td><td style="padding:8px;border:1px solid #eee">${data.seanstipi}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Seans Ücreti</td><td style="padding:8px;border:1px solid #eee">${data.seansUcreti} TL</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Kısa Bio</td><td style="padding:8px;border:1px solid #eee">${data.bio}</td></tr>
              ${videoPath ? `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Video</td><td style="padding:8px;border:1px solid #eee">✅ Yüklendi: ${videoPath}</td></tr>` : ""}
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
