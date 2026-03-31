import type { Metadata } from "next";
import { Suspense } from "react";
import { getExpertsByCity, getAllServices } from "@/lib/data";
import ExpertFilters from "@/components/ExpertFilters";

export const metadata: Metadata = {
  title: "Konya Psikologlar — Uzman Terapist Listesi | TerapiRehberi",
  description: "Konya'daki kimlik ve lisans doğrulamasından geçmiş uzman psikolog ve terapistleri listele, karşılaştır ve randevu al.",
  alternates: { canonical: "/konya/psikologlar" },
};

interface Props {
  searchParams: Promise<{
    hizmet?: string | string[];
    tur?: string | string[];
  }>;
}

function toArray(val?: string | string[]): string[] {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

export default async function KonyaPsikologlarPage({ searchParams }: Props) {
  const params = await searchParams;
  const allExperts = getExpertsByCity("konya");
  const services = getAllServices();

  const selectedServices = toArray(params.hizmet);
  const selectedTypes = toArray(params.tur);

  // Server-side filtreleme
  const filtered = allExperts.filter((e) => {
    const serviceMatch =
      selectedServices.length === 0 ||
      selectedServices.some((s) => e.services.includes(s));
    const typeMatch =
      selectedTypes.length === 0 ||
      selectedTypes.some((t) =>
        e.sessionType.includes(t as "Yüz Yüze" | "Online")
      );
    return serviceMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ── Sayfa başlığı ────────────────────────────────────────────── */}
      <div className="bg-white border-b border-cream-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-slate-400 mb-3 flex items-center gap-1.5" aria-label="Breadcrumb">
            <a href="/" className="hover:text-brand-600 transition-colors">Ana Sayfa</a>
            <span>/</span>
            <a href="/konya" className="hover:text-brand-600 transition-colors">Konya</a>
            <span>/</span>
            <span className="text-brand-600 font-medium">Psikologlar</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-brand-900 mb-1">
                Konya Psikologları
              </h1>
              <p className="text-slate-500 text-sm flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <strong>{filtered.length}</strong> uzman listeleniyor
                {(selectedServices.length > 0 || selectedTypes.length > 0) && (
                  <span className="text-slate-400">({allExperts.length} içinden)</span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Sırala:</span>
              <span className="font-medium text-brand-700">Önerilen</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filtre + Liste ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Suspense>
          <ExpertFilters
            experts={filtered}
            allCount={allExperts.length}
            services={services}
            citySlug="konya"
            selectedServices={selectedServices}
            selectedTypes={selectedTypes}
          />
        </Suspense>
      </div>
    </div>
  );
}
