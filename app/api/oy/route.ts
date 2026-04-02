import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Soru {
  id: string;
  begeni?: number;
}

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ ok: false }, { status: 400 });

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
