"use client";

import Link from "next/link";
import Image from "next/image";
import type { Expert } from "@/types";

interface Props {
  expert: Expert;
  citySlug?: string;
}

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

export default function ExpertCard({ expert, citySlug }: Props) {
  const href = `/uzman/${expert.slug}`;
  const isOnline = expert.sessionType.includes("Online");
  const isF2F    = expert.sessionType.includes("Yüz Yüze");

  return (
    <article className="bg-white rounded-2xl border border-cream-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="flex gap-0">

        {/* ── Sol: Fotoğraf ── */}
        <div className="relative w-24 sm:w-32 shrink-0">
          <div className="relative h-full min-h-[180px] bg-cream-100">
            <Image
              src={expert.image}
              alt={`${expert.name} — ${expert.title}`}
              fill
              className="object-cover object-top"
              sizes="144px"
            />
            {/* Doğrulanmış */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Doğrulanmış
            </div>
          </div>
        </div>

        {/* ── Sağ: Bilgiler ── */}
        <div className="flex-1 p-4 flex flex-col gap-2.5 min-w-0">

          {/* İsim + unvan + konum */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-brand-700 transition-colors truncate">
                  {expert.name}
                </h3>
                <p className="text-brand-600 text-sm font-medium">{expert.title}</p>
              </div>
              {/* Deneyim */}
              {expert.experience && (
                <span className="shrink-0 text-xs font-semibold bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {expert.experience}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {expert.district}, {expert.city.charAt(0).toUpperCase() + expert.city.slice(1)}
            </p>
          </div>

          {/* Kısa biyografi */}
          {expert.shortBio && (
            <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
              {expert.shortBio}
            </p>
          )}

          {/* Uzmanlık etiketleri */}
          <div className="flex flex-wrap gap-1">
            {expert.services.slice(0, 3).map((s) => (
              <span key={s} className="text-[10px] font-medium bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded-full">
                {SERVICE_LABELS[s] ?? s.replace(/-/g, " ")}
              </span>
            ))}
          </div>

          {/* Seans tipi */}
          <div className="flex gap-1.5">
            {isF2F && (
              <span className="text-[10px] font-semibold bg-brand-50 text-brand-700 border border-brand-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                🏢 Yüz Yüze
              </span>
            )}
            {isOnline && (
              <span className="text-[10px] font-semibold bg-brand-50 text-brand-600 border border-brand-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                💻 Online
              </span>
            )}
          </div>

          {/* Alt: fiyat + butonlar */}
          <div className="mt-auto pt-2 border-t border-cream-100">
            {expert.sessionFee && (
              <div className="mb-2">
                <span className="font-black text-brand-700 text-base">{expert.sessionFee}</span>
                <span className="text-xs text-slate-400 ml-1">/ seans</span>
              </div>
            )}
            <div className="flex gap-2">
              {expert.appointmentUrl ? (
              <a
                href={expert.appointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-2 py-2.5 rounded-xl transition-colors"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.522 5.852L0 24l6.293-1.499A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.667-.51-5.186-1.395l-.37-.22-3.838.915.95-3.738-.24-.383A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Randevu
              </a>
              ) : null}
              <Link
                href={href}
                className="flex-1 flex items-center justify-center gap-1 border-2 border-brand-600 text-brand-600 hover:bg-brand-50 text-xs font-semibold px-2 py-2.5 rounded-xl transition-colors"
              >
                Profil
                <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
