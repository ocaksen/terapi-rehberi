"use client";

import { useState } from "react";
import Link from "next/link";
import type { Expert } from "@/types";


const SERVICE_LABELS: Record<string, string> = {
  "bireysel-terapi":   "Bireysel Terapi",
  "cift-terapisi":     "Çift Terapisi",
  "ergen-psikolojisi": "Ergen Psikolojisi",
  "aile-terapisi":     "Aile Terapisi",
  "kaygi-bozuklugu":   "Kaygı & Panik",
  "emdr":              "EMDR",
  "cocuk-psikolojisi": "Çocuk Psikolojisi",
  "depresyon":         "Depresyon",
  "travma":            "Travma",
};

const CATEGORY_FILTERS = [
  { label: "Tümü",          value: "all",              icon: "✦" },
  { label: "Aile Terapisi", value: "aile-terapisi",    icon: "⬡" },
  { label: "Çocuk Terapisi",value: "cocuk-psikolojisi",icon: "◈" },
  { label: "Bireysel",      value: "bireysel-terapi",  icon: "◎" },
  { label: "Çift Terapisi", value: "cift-terapisi",    icon: "⬟" },
  { label: "EMDR",          value: "emdr",             icon: "◉" },
];

const SESSION_FILTERS = [
  { label: "Tümü",      value: "all"      },
  { label: "Online",    value: "Online"   },
  { label: "Yüz Yüze",  value: "Yüz Yüze" },
];

const PAGE_SIZE = 12;

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

/* ─────────────────────────────────────────
   Lastik Ördek — Çocuk psikolojisi (A)
   Sağ üst köşe
───────────────────────────────────────── */
function DuckDecoration() {
  return (
    <svg
      aria-hidden="true"
      className="absolute top-0 right-0 w-24 h-24 pointer-events-none select-none"
      viewBox="0 0 100 100"
      fill="none"
    >
      <ellipse cx="48" cy="65" rx="30" ry="22" fill="#FCD34D" />
      <ellipse cx="38" cy="68" rx="16" ry="10" fill="#F59E0B" />
      <ellipse cx="68" cy="52" rx="10" ry="13" fill="#FCD34D" />
      <circle cx="72" cy="36" r="14" fill="#FCD34D" />
      <ellipse cx="84" cy="37" rx="8" ry="5" fill="#F97316" />
      <ellipse cx="84" cy="40" rx="7" ry="3.5" fill="#EA580C" />
      <circle cx="76" cy="30" r="3" fill="#1E293B" />
      <circle cx="77" cy="29" r="1" fill="white" />
      <path d="M22 65 Q35 58 50 62" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 82 Q30 76 48 80 Q66 84 82 78" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Oyuncak Ayı (çocuk B) — sağ üst
───────────────────────────────────────── */
function TeddySmallDecoration() {
  return (
    <svg
      aria-hidden="true"
      className="absolute top-0 right-0 w-20 h-24 pointer-events-none select-none"
      viewBox="0 0 80 90"
      fill="#D97706"
    >
      <ellipse cx="40" cy="58" rx="21" ry="24" />
      <circle cx="40" cy="28" r="17" />
      <circle cx="25" cy="14" r="8" />
      <circle cx="25" cy="14" r="5" fill="#FDE68A" />
      <circle cx="55" cy="14" r="8" />
      <circle cx="55" cy="14" r="5" fill="#FDE68A" />
      <ellipse cx="17" cy="56" rx="8" ry="13" transform="rotate(-18 17 56)" />
      <ellipse cx="63" cy="56" rx="8" ry="13" transform="rotate(18 63 56)" />
      <ellipse cx="28" cy="79" rx="11" ry="7" />
      <ellipse cx="52" cy="79" rx="11" ry="7" />
      <ellipse cx="40" cy="60" rx="12" ry="14" fill="#FDE68A" />
      <circle cx="34" cy="25" r="2.5" fill="white" />
      <circle cx="46" cy="25" r="2.5" fill="white" />
      <ellipse cx="40" cy="31" rx="3.5" ry="2" fill="white" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Aile — İki figür el ele (A)
   Sağ üst köşe
───────────────────────────────────────── */
function FamilyFiguresDecoration() {
  return (
    <svg
      aria-hidden="true"
      className="absolute top-0 right-0 w-24 h-24 pointer-events-none select-none"
      viewBox="0 0 100 100"
      fill="none"
    >
      {/* Büyük figür (ebeveyn) */}
      <circle cx="35" cy="22" r="12" fill="#FDA4AF" />
      <ellipse cx="35" cy="52" rx="14" ry="20" fill="#FB7185" />
      {/* Küçük figür (çocuk) */}
      <circle cx="68" cy="28" r="9" fill="#FDE68A" />
      <ellipse cx="68" cy="54" rx="10" ry="15" fill="#FCD34D" />
      {/* El ele — bağlantı */}
      <path d="M49 55 Q58 52 58 55" stroke="#F87171" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Küçük kalpler */}
      <path d="M52 18 C52 16 49 14 49 17 C49 19 52 21 52 21 C52 21 55 19 55 17 C55 14 52 16 52 18Z" fill="#F43F5E" />
      <path d="M62 10 C62 8.5 60 7 60 9 C60 10.5 62 12 62 12 C62 12 64 10.5 64 9 C64 7 62 8.5 62 10Z" fill="#FB7185" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Aile — İç içe kalpler (B)
   Sağ üst köşe
───────────────────────────────────────── */
function NestedHeartsDecoration() {
  return (
    <svg
      aria-hidden="true"
      className="absolute top-0 right-0 w-24 h-24 pointer-events-none select-none"
      viewBox="0 0 100 100"
      fill="none"
    >
      {/* Büyük kalp */}
      <path d="M50 82 C50 82 10 58 10 32 C10 18 22 10 35 14 C42 16 50 24 50 24 C50 24 58 16 65 14 C78 10 90 18 90 32 C90 58 50 82 50 82Z" fill="#FCA5A5" />
      {/* Orta kalp */}
      <path d="M50 66 C50 66 28 50 28 36 C28 27 36 22 43 25 C46 26 50 30 50 30 C50 30 54 26 57 25 C64 22 72 27 72 36 C72 50 50 66 50 66Z" fill="#F87171" />
      {/* Küçük kalp */}
      <path d="M50 52 C50 52 38 44 38 38 C38 33 42 30 46 32 C48 33 50 35 50 35 C50 35 52 33 54 32 C58 30 62 33 62 38 C62 44 50 52 50 52Z" fill="#EF4444" />
      {/* Parlama */}
      <ellipse cx="30" cy="26" rx="6" ry="4" fill="white" opacity="0.3" transform="rotate(-30 30 26)" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Yıldız Pattern (4 adet) — Ergen
   Sağ üst köşe
───────────────────────────────────────── */
function StarsDecoration() {
  const star = (cx: number, cy: number, r: number, rot: number) => {
    const ir = r * 0.42;
    const pts = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 + (rot * Math.PI) / 180;
      const radius = i % 2 === 0 ? r : ir;
      pts.push(`${cx + radius * Math.cos(angle - Math.PI / 2)},${cy + radius * Math.sin(angle - Math.PI / 2)}`);
    }
    return `M${pts.join("L")}Z`;
  };

  const items = [
    { cx: 78, cy: 14, r: 8,   rot: 12 },
    { cx: 92, cy: 36, r: 5,   rot: 30 },
    { cx: 70, cy: 36, r: 4,   rot: 0  },
    { cx: 88, cy: 58, r: 3.5, rot: 45 },
  ];

  return (
    <svg
      aria-hidden="true"
      className="absolute top-0 right-0 w-24 h-24 pointer-events-none select-none"
      viewBox="0 0 100 100"
    >
      {items.map((s, i) => (
        <path key={i} d={star(s.cx, s.cy, s.r, s.rot)} fill="#FBBF24" />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────
   Oyuncak Ayı büyük — Bireysel terapi
   Sağ üst köşe
───────────────────────────────────────── */
function TeddyDecoration() {
  return (
    <svg
      aria-hidden="true"
      className="absolute top-0 right-0 w-24 h-24 pointer-events-none select-none"
      viewBox="0 0 80 90"
      fill="#D97706"
    >
      <ellipse cx="40" cy="58" rx="21" ry="24" />
      <circle cx="40" cy="28" r="17" />
      <circle cx="25" cy="14" r="8" />
      <circle cx="25" cy="14" r="5" fill="#FDE68A" />
      <circle cx="55" cy="14" r="8" />
      <circle cx="55" cy="14" r="5" fill="#FDE68A" />
      <ellipse cx="17" cy="56" rx="8" ry="13" transform="rotate(-18 17 56)" />
      <ellipse cx="63" cy="56" rx="8" ry="13" transform="rotate(18 63 56)" />
      <ellipse cx="28" cy="79" rx="11" ry="7" />
      <ellipse cx="52" cy="79" rx="11" ry="7" />
      <ellipse cx="40" cy="60" rx="12" ry="14" fill="#FDE68A" />
      <circle cx="34" cy="25" r="2.5" fill="white" />
      <circle cx="46" cy="25" r="2.5" fill="white" />
      <ellipse cx="40" cy="31" rx="3.5" ry="2" fill="white" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Uzmanlığa göre dekorasyon seç
───────────────────────────────────────── */
function ExpertDecoration({ services, index }: { services: string[]; index: number }) {
  if (services.includes("cocuk-psikolojisi"))
    return index % 2 === 0 ? <DuckDecoration /> : <TeddySmallDecoration />;
  if (services.includes("aile-terapisi"))
    return index % 2 === 0 ? <FamilyFiguresDecoration /> : <NestedHeartsDecoration />;
  if (services.includes("ergen-psikolojisi")) return <StarsDecoration />;
  if (services.includes("bireysel-terapi"))   return <TeddyDecoration />;
  return null;
}

/* ─────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────── */
export default function IlceBentoClient({ experts }: { experts: Expert[] }) {
  const [category, setCategory] = useState("all");
  const [session,  setSession]  = useState("all");
  const [page,     setPage]     = useState(1);

  const filtered = experts.filter((e) => {
    const catOk  = category === "all" || e.services.includes(category);
    const sessOk = session  === "all" || e.sessionType.includes(session as "Online" | "Yüz Yüze");
    return catOk && sessOk;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      {/* ── Filtreler ── */}
      <div className="bg-white border-b border-cream-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => { setCategory(f.value); setPage(1); }}
                className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  category === f.value
                    ? "bg-brand-800 text-white border-brand-800"
                    : "bg-white text-slate-600 border-cream-300 hover:border-brand-400 hover:text-brand-700"
                }`}
              >
                <span className="text-[10px]">{f.icon}</span>
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5 sm:ml-auto">
            {SESSION_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => { setSession(f.value); setPage(1); }}
                className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  session === f.value
                    ? "bg-brand-700 text-white border-brand-700"
                    : "bg-white text-slate-600 border-cream-300 hover:border-brand-400 hover:text-brand-700"
                }`}
              >
                {f.value === "Online" && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
                {f.value === "Yüz Yüze" && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sonuç sayısı ── */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <p className="text-xs text-slate-400">
          <strong className="text-slate-600">{filtered.length}</strong> uzman listeleniyor
        </p>
      </div>

      {/* ── Kart Grid ── */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        {paged.length === 0 ? (
          <div className="bg-white rounded-2xl border border-cream-200 p-12 text-center">
            <p className="font-semibold text-brand-900 mb-1">Sonuç bulunamadı</p>
            <p className="text-sm text-slate-500">Farklı bir filtre deneyin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paged.map((expert, index) => {
              return (
                <div
                  key={expert.slug}
                  className="relative bg-white rounded-2xl overflow-hidden flex flex-col border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Uzmanlık dekorasyonu */}
                  <ExpertDecoration services={expert.services} index={index} />

                  <div className="relative z-10 p-5 flex flex-col gap-3 flex-1">
                    {/* Üst: avatar + isim */}
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-sm font-black text-brand-700 shadow-sm">
                        {getInitials(expert.name)}
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <p className="font-black text-sm leading-snug text-slate-900">
                          {expert.name}
                        </p>
                        <p className="text-xs mt-0.5 font-medium text-slate-500">
                          {expert.title}
                        </p>
                      </div>
                    </div>

                    {/* Hizmet etiketleri */}
                    <div className="flex flex-wrap gap-1.5">
                      {expert.services.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                        >
                          {SERVICE_LABELS[s] ?? s}
                        </span>
                      ))}
                    </div>

                    {/* Ayırıcı */}
                    <div className="border-t border-slate-100" />

                    {/* Ücret + seans tipi */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {expert.sessionType.map((t) => (
                          <span key={t} className="flex items-center gap-1 text-xs font-medium text-slate-500">
                            {t === "Online" ? (
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            ) : (
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            )}
                            {t}
                          </span>
                        ))}
                      </div>
                      {expert.sessionFee && (
                        <span className="text-sm font-black text-brand-700">
                          {expert.sessionFee}
                        </span>
                      )}
                    </div>

                    {/* CTA — dış bağlantı, yoksa gizle */}
                    {expert.appointmentUrl && (
                      <div className="mt-auto pt-1">
                        <a
                          href={expert.appointmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border-2 border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-700 transition-colors"
                        >
                          Profili İncele
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Sayfalama ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-full border border-cream-300 flex items-center justify-center text-slate-500 hover:border-brand-400 hover:text-brand-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  p === page
                    ? "bg-brand-800 text-white"
                    : "border border-cream-300 text-slate-500 hover:border-brand-400 hover:text-brand-700"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-full border border-cream-300 flex items-center justify-center text-slate-500 hover:border-brand-400 hover:text-brand-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
