import type { Metadata } from "next";
import Link from "next/link";
import { getExpertsByCity, getAllServices } from "@/lib/data";
import ExpertCard from "@/components/ExpertCard";

export const metadata: Metadata = {
  title: "Konya Psikolog — Uzman Terapist Rehberi",
  description:
    "Konya'da uzman psikolog ve terapist bul. Bireysel terapi, çift terapisi, ergen psikolojisi ve EMDR alanında deneyimli klinisyenler.",
  alternates: { canonical: "/konya" },
};

export default function KonyaPage() {
  const experts = getExpertsByCity("konya");
  const services = getAllServices();

  return (
    <>
      {/* Hero */}
      <section className="bg-cream-50 py-16 px-4 border-b border-cream-200">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-3">İç Anadolu · Türkiye</p>
          <h1 className="text-4xl font-bold text-brand-900 mb-4">
            Konya'da Psikolog Bul
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-6">
            Konya'nın güvenilir psikolog ve terapist rehberi. Yüz yüze ve online seans seçenekleriyle yanınızdayız.
          </p>
          <Link href="/konya/psikologlar" className="btn-primary">
            Tüm Uzmanları Gör →
          </Link>
        </div>
      </section>

      {/* Hizmetler */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-brand-900 mb-6">
            Konya'da Sunduğumuz Hizmetler
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/konya/${s.slug}`}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-cream-50 hover:bg-brand-50 border border-cream-200 hover:border-brand-200 transition-colors text-center group"
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="text-xs font-semibold text-brand-800 leading-tight">
                  {s.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Uzmanlar */}
      <section className="py-14 px-4 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-brand-900 mb-2">
            Konya Uzmanlarımız
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            Kimlik ve lisans doğrulamasından geçmiş uzmanlar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((e) => (
              <ExpertCard key={e.slug} expert={e} citySlug="konya" />
            ))}
          </div>
        </div>
      </section>

      {/* İlçe linkleri */}
      <section className="py-10 px-4 bg-white border-t border-cream-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-semibold text-brand-800 mb-4">İlçeye Göre Psikolog</h2>
          <div className="flex flex-wrap gap-2">
            {["Meram", "Selçuklu", "Karatay"].map((ilce) => (
              <span
                key={ilce}
                className="bg-cream-50 border border-cream-200 text-brand-700 text-sm px-4 py-1.5 rounded-full"
              >
                {ilce} Psikolog
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
