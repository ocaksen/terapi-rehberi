"use client";

import { useState } from "react";
import Link from "next/link";
import type { PsychTest } from "@/types";

const CATEGORIES = [
  { slug: "hepsi",     label: "Tümü" },
  { slug: "kaygı",     label: "Kaygı & Panik" },
  { slug: "depresyon", label: "Depresyon" },
  { slug: "ilişki",    label: "İlişki" },
  { slug: "kişilik",   label: "Kişilik" },
  { slug: "travma",    label: "Travma" },
  { slug: "dikkat",    label: "Dikkat & Odak" },
  { slug: "stres",     label: "Stres" },
];

function TestIcon({ slug, color }: { slug: string; color: string }) {
  const paths: Record<string, string> = {
    "anksiyete-testi":      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    "depresyon-testi":      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    "stres-testi":          "M13 10V3L4 14h7v7l9-11h-7z",
    "oz-saygi-testi":       "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    "panik-atak-testi":     "M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.255 3A23.933 23.933 0 0121 12c0 3.183-.62 6.22-1.745 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09",
    "ofke-kontrolu-testi":  "M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z",
    "baglanti-stili-testi": "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    "sosyal-anksiyete-testi":"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    "dehb-testi":           "M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
    "travma-tssb-testi":    "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    "okb-testi":            "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
    "sevgi-dili-testi":     "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
    "toksik-iliski-testi":  "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
    "narsizm-testi":        "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  };

  const d = paths[slug] ?? "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2";

  return (
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
      style={{ background: color + "18", border: `1.5px solid ${color}30` }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d={d} />
      </svg>
    </div>
  );
}

interface Props {
  tests: PsychTest[];
}

export default function TestlerClient({ tests }: Props) {
  const [activeCategory, setActiveCategory] = useState("hepsi");

  const filtered = activeCategory === "hepsi"
    ? tests
    : tests.filter((t) => t.category === activeCategory);

  const featured = tests[0];
  const rest = filtered.filter((t) => t.slug !== featured?.slug);
  const showFeatured = activeCategory === "hepsi";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

      {/* Uyarı */}
      <div className="flex gap-3 items-start bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm">
        <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
        </div>
        <p className="text-amber-800 text-sm leading-relaxed">
          Bu testler <strong>tanı koymaz</strong>, yalnızca genel bir değerlendirme sunar.
          Kesin tanı için bir klinik psikolog veya psikiyatrist ile görüşün.
        </p>
      </div>

      {/* Kategori filtreleri */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => {
          const count = cat.slug === "hepsi"
            ? tests.length
            : tests.filter((t) => t.category === cat.slug).length;
          if (count === 0 && cat.slug !== "hepsi") return null;
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
              style={
                isActive
                  ? { background: "var(--color-brand-700)", color: "#fff", borderColor: "var(--color-brand-700)" }
                  : { background: "#fff", color: "#475569", borderColor: "#e2e8f0" }
              }
            >
              {cat.label}
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={
                  isActive
                    ? { background: "rgba(255,255,255,0.2)", color: "#fff" }
                    : { background: "#f1f5f9", color: "#94a3b8" }
                }
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Öne çıkan — sadece "Tümü"nde göster */}
      {showFeatured && featured && (
        <Link
          href={`/testler/${featured.slug}`}
          className="group block bg-white rounded-3xl border-2 border-cream-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row">
            {/* Sol accent bar */}
            <div className="w-full sm:w-2 h-2 sm:h-auto shrink-0 rounded-t-3xl sm:rounded-t-none sm:rounded-l-3xl" style={{ background: featured.color }} />
            <div className="flex-1 p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start">
              <TestIcon slug={featured.slug} color={featured.color} />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h2 className="text-xl font-black text-slate-900 group-hover:text-brand-700 transition-colors">
                    {featured.title}
                  </h2>
                  {featured.scale && (
                    <span
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border"
                      style={{ color: featured.color, borderColor: featured.color + "50", background: featured.color + "12" }}
                    >
                      {featured.scale}
                    </span>
                  )}
                  <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                    Öne Çıkan
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{featured.description}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {featured.questionCount} soru
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    ~{featured.estimatedMinutes} dakika
                  </div>
                  <span
                    className="text-sm font-black px-5 py-2 rounded-xl ml-auto transition-opacity duration-200 group-hover:opacity-90"
                    style={{ background: featured.color, color: "#fff" }}
                  >
                    Testi Başlat
                    <span className="ml-1.5">→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Test listesi */}
      <div>
        {showFeatured && (
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-cream-200" />
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Tüm Testler — {tests.length} test
            </p>
            <div className="h-px flex-1 bg-cream-200" />
          </div>
        )}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center">
            <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
            <p className="text-slate-400 text-sm">Bu kategoride henüz test yok.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(showFeatured ? rest : filtered).map((test) => (
              <Link
                key={test.slug}
                href={`/testler/${test.slug}`}
                className="group bg-white rounded-2xl border-2 border-cream-200 hover:border-brand-200 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 p-5 flex items-center gap-4 cursor-pointer"
              >
                <TestIcon slug={test.slug} color={test.color} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-brand-700 transition-colors">
                      {test.title}
                    </h2>
                    {test.scale && (
                      <span
                        className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-lg shrink-0 border"
                        style={{ color: test.color, borderColor: test.color + "40", background: test.color + "10" }}
                      >
                        {test.scale}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-slate-400">{test.questionCount} soru</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-xs text-slate-400">~{test.estimatedMinutes} dk</span>
                  </div>
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Alt CTA */}
      <div className="relative overflow-hidden bg-brand-900 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-6 left-1/3 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative flex-1">
          <p className="font-black text-white text-lg mb-1.5">Test sonrası uzman desteği alın</p>
          <p className="text-brand-300 text-sm leading-relaxed">
            Sonuçlarınızı değerlendirmek için Konya&apos;daki lisanslı psikologlarla görüşün.
          </p>
        </div>
        <Link
          href="/konya/psikologlar"
          className="relative shrink-0 inline-flex items-center gap-2 bg-white text-brand-900 font-black text-sm px-6 py-3 rounded-xl hover:bg-cream-100 transition-colors whitespace-nowrap cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          Psikolog Bul
        </Link>
      </div>

    </div>
  );
}
