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
   Style 4 — Balon (mavi)
   Çocuk psikolojisi
───────────────────────────────────────── */
function BalloonDecoration() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -bottom-2 -right-3 w-28 h-36 pointer-events-none select-none"
      viewBox="0 0 90 120"
      fill="none"
    >
      <ellipse cx="45" cy="44" rx="30" ry="34" fill="#60A5FA" opacity="0.22" />
      <ellipse cx="45" cy="44" rx="30" ry="34" stroke="#3B82F6" strokeWidth="2.2" opacity="0.3" />
      <ellipse cx="34" cy="32" rx="9" ry="12" fill="white" opacity="0.35" />
      <path d="M39 76 Q45 81 51 76 Q48 73 45 74 Q42 73 39 76Z" fill="#3B82F6" opacity="0.3" />
      <path d="M45 78 Q36 90 44 102 Q50 112 42 118" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" opacity="0.25" />
      <ellipse cx="73" cy="28" rx="13" ry="15" fill="#93C5FD" opacity="0.15" />
      <ellipse cx="73" cy="28" rx="13" ry="15" stroke="#60A5FA" strokeWidth="1.5" opacity="0.2" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Style 1 — El Çizimi Ev (turuncu/sıcak)
   Aile terapisi
───────────────────────────────────────── */
function HouseDecoration() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -bottom-1 -right-2 w-28 h-28 pointer-events-none select-none"
      viewBox="0 0 100 95"
      fill="none"
      stroke="#F97316"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.28"
    >
      <path d="M13 52 L12 83 L87 84 L88 52" strokeWidth="3" />
      <path d="M6 56 L50 17 L94 56" strokeWidth="3" />
      <path d="M37 84 L37 63 Q50 57 63 63 L63 84" strokeWidth="2.5" />
      <rect x="16" y="57" width="15" height="15" rx="3" strokeWidth="2" />
      <line x1="23.5" y1="57" x2="23.5" y2="72" strokeWidth="1.5" />
      <line x1="16" y1="64.5" x2="31" y2="64.5" strokeWidth="1.5" />
      <rect x="69" y="57" width="15" height="15" rx="3" strokeWidth="2" />
      <line x1="76.5" y1="57" x2="76.5" y2="72" strokeWidth="1.5" />
      <line x1="69" y1="64.5" x2="84" y2="64.5" strokeWidth="1.5" />
      <path d="M64 33 L64 19 L74 19 L74 37" strokeWidth="2.5" />
      <path d="M65 14 Q64 10 68 9 Q70 5 74 8 Q78 7 78 11 Q81 14 78 16 Q65 18 65 14Z" strokeWidth="1.5" />
      <path
        d="M50 72 C50 70 47 67 47 70 C47 72.5 50 75 50 75 C50 75 53 72.5 53 70 C53 67 50 70 50 72Z"
        fill="#F97316"
        stroke="none"
        opacity="0.7"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Style 3 — Yıldız Pattern (altın)
   Ergen psikolojisi
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
    { cx: 80, cy: 12, r: 7,   rot: 12 },
    { cx: 90, cy: 38, r: 4.5, rot: 30 },
    { cx: 75, cy: 60, r: 5.5, rot: 0  },
    { cx: 88, cy: 75, r: 3.5, rot: 45 },
    { cx: 65, cy: 22, r: 3.5, rot: 20 },
    { cx: 93, cy: 55, r: 3,   rot: 10 },
    { cx: 78, cy: 85, r: 4,   rot: 35 },
    { cx: 60, cy: 8,  r: 2.5, rot: 5  },
    { cx: 96, cy: 20, r: 2,   rot: 50 },
  ];

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMaxYMid slice"
    >
      {items.map((s, i) => (
        <path key={i} d={star(s.cx, s.cy, s.r, s.rot)} fill="#FBBF24" opacity="0.22" />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────
   Style 2 — Oyuncak Ayı (kahve/sıcak)
   Bireysel terapi
───────────────────────────────────────── */
function TeddyDecoration() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -bottom-3 -right-4 w-24 h-28 pointer-events-none select-none"
      viewBox="0 0 80 90"
      fill="#D97706"
      opacity="0.18"
    >
      <ellipse cx="40" cy="58" rx="21" ry="24" />
      <circle cx="40" cy="28" r="17" />
      <circle cx="25" cy="14" r="8" />
      <circle cx="25" cy="14" r="5" fill="#FDE68A" opacity="0.6" />
      <circle cx="55" cy="14" r="8" />
      <circle cx="55" cy="14" r="5" fill="#FDE68A" opacity="0.6" />
      <ellipse cx="17" cy="56" rx="8" ry="13" transform="rotate(-18 17 56)" />
      <ellipse cx="63" cy="56" rx="8" ry="13" transform="rotate(18 63 56)" />
      <ellipse cx="28" cy="79" rx="11" ry="7" />
      <ellipse cx="52" cy="79" rx="11" ry="7" />
      <ellipse cx="40" cy="60" rx="12" ry="14" fill="#FDE68A" opacity="0.4" />
      <circle cx="34" cy="25" r="2.5" fill="white" opacity="0.7" />
      <circle cx="46" cy="25" r="2.5" fill="white" opacity="0.7" />
      <ellipse cx="40" cy="31" rx="3.5" ry="2" fill="white" opacity="0.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Uzmanlığa göre dekorasyon seç
───────────────────────────────────────── */
function ExpertDecoration({ services }: { services: string[] }) {
  if (services.includes("cocuk-psikolojisi")) return <BalloonDecoration />;
  if (services.includes("aile-terapisi"))     return <HouseDecoration />;
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
                  <ExpertDecoration services={expert.services} />

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
