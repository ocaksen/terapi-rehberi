import fs from "fs";
import path from "path";
import Link from "next/link";

interface Basvuru {
  tarih: string;
  adSoyad: string;
  unvan: string;
  eposta: string;
  telefon: string;
  sehir: string;
  ilce: string;
  okul: string;
  mezuniyetYili: string;
  deneyim: string;
  alanlar: string[];
  seanstipi: string[];
  seansUcreti: string;
  bio: string;
}

interface Props {
  searchParams: Promise<{ key?: string }>;
}

export default async function AdminBasvurularPage({ searchParams }: Props) {
  const { key } = await searchParams;
  const adminKey = process.env.ADMIN_KEY ?? "admin123";

  if (key !== adminKey) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Yetkisiz erişim
      </div>
    );
  }

  const filePath = path.join(process.cwd(), "data", "basvurular.json");
  let basvurular: Basvuru[] = [];
  if (fs.existsSync(filePath)) {
    try { basvurular = JSON.parse(fs.readFileSync(filePath, "utf-8")); } catch { basvurular = []; }
  }
  const reversed = [...basvurular].reverse();

  return (
    <div className="min-h-screen bg-cream-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-brand-900">Uzman Başvuruları</h1>
            <p className="text-sm text-slate-500">{reversed.length} başvuru</p>
          </div>
          <Link
            href={`/admin/sorular?key=${key}`}
            className="text-sm text-brand-600 hover:underline font-medium"
          >
            Soru Sor Kayıtları →
          </Link>
        </div>

        {reversed.length === 0 ? (
          <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center text-slate-400">
            Henüz başvuru yok.
          </div>
        ) : (
          <div className="space-y-4">
            {reversed.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-cream-200 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                  <div>
                    <p className="font-bold text-brand-900 text-lg">{b.adSoyad}</p>
                    <p className="text-sm text-brand-600 font-medium">{b.unvan} · {b.sehir} / {b.ilce}</p>
                  </div>
                  <span className="text-xs text-slate-400 bg-cream-50 px-3 py-1 rounded-full border border-cream-200">
                    {new Date(b.tarih).toLocaleString("tr-TR")}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 text-xs text-slate-600 mb-3">
                  <span><b>E-posta:</b> <a href={`mailto:${b.eposta}`} className="text-brand-600 hover:underline">{b.eposta}</a></span>
                  <span><b>Tel:</b> <a href={`tel:${b.telefon}`} className="text-brand-600 hover:underline">{b.telefon}</a></span>
                  <span><b>Okul:</b> {b.okul} ({b.mezuniyetYili})</span>
                  <span><b>Deneyim:</b> {b.deneyim}</span>
                  <span><b>Seans Ücreti:</b> {b.seansUcreti} TL</span>
                  <span><b>Seans Tipi:</b> {(b.seanstipi ?? []).join(", ")}</span>
                </div>
                <div className="text-xs text-slate-500 mb-2">
                  <b>Uzmanlık Alanları:</b> {(b.alanlar ?? []).join(", ")}
                </div>
                {b.bio && (
                  <p className="text-xs text-slate-500 bg-cream-50 rounded-xl p-3 leading-relaxed border border-cream-100">
                    {b.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
