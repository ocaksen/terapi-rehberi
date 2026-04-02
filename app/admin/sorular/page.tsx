import fs from "fs";
import path from "path";
import Link from "next/link";

interface Soru {
  id: string;
  tarih: string;
  kategori: string;
  soru: string;
}

interface Props {
  searchParams: Promise<{ key?: string }>;
}

export default async function AdminSorularPage({ searchParams }: Props) {
  const { key } = await searchParams;
  const adminKey = process.env.ADMIN_KEY ?? "admin123";

  if (key !== adminKey) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Yetkisiz erişim
      </div>
    );
  }

  const filePath = path.join(process.cwd(), "data", "sorular.json");
  let sorular: Soru[] = [];
  if (fs.existsSync(filePath)) {
    try { sorular = JSON.parse(fs.readFileSync(filePath, "utf-8")); } catch { sorular = []; }
  }
  const reversed = [...sorular].reverse();

  return (
    <div className="min-h-screen bg-cream-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-brand-900">Soru Sor Kayıtları</h1>
            <p className="text-sm text-slate-500">{reversed.length} soru</p>
          </div>
          <Link
            href={`/admin/basvurular?key=${key}`}
            className="text-sm text-brand-600 hover:underline font-medium"
          >
            ← Uzman Başvuruları
          </Link>
        </div>

        {reversed.length === 0 ? (
          <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center text-slate-400">
            Henüz soru yok.
          </div>
        ) : (
          <div className="space-y-3">
            {reversed.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border border-cream-200 p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-xs font-semibold bg-brand-50 text-brand-700 px-2.5 py-0.5 rounded-full capitalize border border-brand-100">
                    {s.kategori}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(s.tarih).toLocaleString("tr-TR")}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{s.soru}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
