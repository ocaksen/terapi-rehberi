import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Soru {
  id: string;
  tarih: string;
  kategori: string;
  soru: string;
  durum?: string;
  cevap?: string;
  uzman?: string;
  begeni?: number;
}

export async function POST(req: NextRequest) {
  try {
    const { id, action, cevap, uzman, key } = await req.json();
    const adminKey = process.env.ADMIN_KEY ?? "admin123";

    if (key !== adminKey) {
      return NextResponse.json({ ok: false, error: "Yetkisiz" }, { status: 401 });
    }

    const filePath = path.join(process.cwd(), "data", "sorular.json");
    let sorular: Soru[] = [];
    if (fs.existsSync(filePath)) {
      try { sorular = JSON.parse(fs.readFileSync(filePath, "utf-8")); } catch { sorular = []; }
    }

    const idx = sorular.findIndex((s) => s.id === id);
    if (idx === -1) return NextResponse.json({ ok: false, error: "Bulunamadı" }, { status: 404 });

    if (action === "onayla") {
      sorular[idx] = {
        ...sorular[idx],
        durum: "onaylandi",
        cevap: cevap ?? "",
        uzman: uzman || "TerapiRehberi Uzmanı",
        begeni: sorular[idx].begeni ?? 0,
      };
    } else if (action === "reddet") {
      sorular[idx] = { ...sorular[idx], durum: "reddedildi" };
    } else if (action === "beklemede") {
      sorular[idx] = { ...sorular[idx], durum: "beklemede" };
    }

    fs.writeFileSync(filePath, JSON.stringify(sorular, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
