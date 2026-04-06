import type { Metadata } from "next";
import Link from "next/link";
import { getExpertsByCity } from "@/lib/data";
import IlceBentoClient from "./[ilce]/IlceBentoClient";

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(konyaSchema) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-14 px-4">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute top-8 right-1/3 w-24 h-24 rounded-full bg-white/5" />

        <div className="relative max-w-6xl mx-auto">
          <nav className="text-xs text-brand-300 mb-5 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white font-medium">Konya</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-2">
                Türkiye · Konya
              </p>
              <h1 className="text-4xl font-black text-white mb-3 leading-tight">
                Konya<br />
                <span className="text-brand-300">Psikologları</span>
              </h1>
              <p className="text-brand-200 text-sm max-w-md leading-relaxed">
                Konya&apos;nın güvenilir psikolog ve terapist rehberi. Yüz yüze ve online seans seçenekleriyle yanınızdayız.
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-white/10">
                <p className="text-2xl font-black text-white">{experts.length}</p>
                <p className="text-brand-300 text-xs mt-0.5">Uzman</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-white/10">
                <p className="text-2xl font-black text-white">3</p>
                <p className="text-brand-300 text-xs mt-0.5">İlçe</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Öne Çıkan Uzman — Feyza Çaksen */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-2">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-4">Öne Çıkan Uzman</p>
        <a
          href="https://www.feyzacaksen.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white rounded-2xl border border-brand-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 relative overflow-hidden"
        >
          {/* Dekoratif arka plan */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-50/60 to-transparent pointer-events-none" />

          {/* Avatar */}
          <div className="relative shrink-0 w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-xl font-black text-white shadow">
            FÇ
          </div>

          {/* Bilgiler */}
          <div className="relative flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <p className="font-black text-brand-900 text-base">Feyza Çaksen</p>
              <span className="text-xs font-semibold bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">Psikolog</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {["Bireysel Terapi", "Kaygı & Panik", "Depresyon", "Travma"].map((s) => (
                <span key={s} className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Online
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Yüz Yüze
              </span>
            </div>
          </div>

          {/* Ücret + ok */}
          <div className="relative flex items-center gap-4 shrink-0">
            <div className="text-right">
              <p className="text-xl font-black text-brand-700">3.000 TL</p>
              <p className="text-xs text-slate-400">/ seans</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-brand-600 group-hover:bg-brand-700 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </div>
          </div>
        </a>
      </div>

      {/* Bento grid + filtreler */}
      <IlceBentoClient experts={experts} />

      {/* İlçe linkleri */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="border-t border-cream-200 pt-8">
          <p className="font-semibold text-brand-900 mb-3 text-sm">İlçeye Göre Psikolog</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Meram Psikolog",    href: "/konya/meram"    },
              { label: "Selçuklu Psikolog", href: "/konya/selcuklu" },
              { label: "Karatay Psikolog",  href: "/konya/karatay"  },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 bg-white border border-cream-200 text-brand-700 text-sm px-4 py-2 rounded-full hover:border-brand-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
