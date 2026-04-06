import type { Metadata } from "next";
import Link from "next/link";
import { getExpertsByCity, getAllServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Konya Psikolog Rehberi — Lisanslı Uzman Terapistler",
  description:
    "Konya'da doğrulanmış psikolog ve terapist bul. Bireysel terapi, çift terapisi, çocuk ve ergen psikolojisi, EMDR. Yüz yüze ve online seans seçenekleri.",
  keywords: ["konya psikolog", "konya terapist", "konya psikoloji", "konya online terapi"],
  alternates: { canonical: "https://www.terapirehberi.com/konya" },
  openGraph: {
    title: "Konya Psikolog Rehberi — Lisanslı Uzman Terapistler",
    description: "Konya'da doğrulanmış psikolog ve terapist bul. Yüz yüze ve online seans.",
    url: "https://www.terapirehberi.com/konya",
  },
};

const konyaSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Konya Psikolog Listesi",
  description: "Konya'da lisanslı ve diploma doğrulamalı psikolog ve terapistler.",
  url: "https://www.terapirehberi.com/konya",
  itemListElement: [],
};

export default function KonyaPage() {
  const experts = getExpertsByCity("konya");
  const services = getAllServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(konyaSchema) }}
      />
      {/* Hero */}
      <section className="bg-cream-50 py-16 px-4 border-b border-cream-200">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-3">Konya, Türkiye</p>
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

      {/* Uzmanlar özet */}
      <section className="py-14 px-4 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-brand-900 mb-2">Konya Psikolog Listesi</h2>
          <p className="text-sm text-slate-500 mb-6">
            Konya&apos;da hizmet veren <strong className="text-slate-700">{experts.length} uzman</strong> listemizde yer alıyor.
          </p>
          <Link
            href="/konya/psikologlar"
            className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Tüm Listeyi Gör
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* İlçe linkleri */}
      <section className="py-10 px-4 bg-white border-t border-cream-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-semibold text-brand-800 mb-4">İlçeye Göre Psikolog</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Meram Psikolog",    href: "/konya/meram" },
              { label: "Selçuklu Psikolog", href: "/konya/selcuklu" },
              { label: "Karatay Psikolog",  href: "/konya/karatay" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-cream-50 border border-cream-200 hover:border-brand-300 hover:bg-brand-50 text-brand-700 text-sm px-4 py-1.5 rounded-full transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
