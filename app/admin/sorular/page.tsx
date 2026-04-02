import fs from "fs";
import path from "path";
import Link from "next/link";
import SorularAdmin from "./SorularAdmin";

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

  const beklemede = reversed.filter((s) => !s.durum || s.durum === "beklemede").length;

  return (
    <div className="min-h-screen bg-cream-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-brand-900">Soru Sor Kayıtları</h1>
            <p className="text-sm text-slate-500">
              {reversed.length} toplam soru
              {beklemede > 0 && (
                <span className="ml-2 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {beklemede} beklemede
                </span>
              )}
            </p>
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
          <SorularAdmin sorular={reversed} adminKey={adminKey} />
        )}
      </div>
    </div>
  );
}
