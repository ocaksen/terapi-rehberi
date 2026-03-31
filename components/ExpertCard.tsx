"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Expert } from "@/types";

interface Props {
  expert: Expert;
  citySlug?: string;
}

// Sertifika etiketleri (uzmanlık → badge renk)
const CERT_COLORS: Record<string, string> = {
  emdr: "bg-purple-50 text-purple-700 border-purple-200",
  "bireysel-terapi": "bg-blue-50 text-blue-700 border-blue-100",
  "cift-terapisi": "bg-rose-50 text-rose-700 border-rose-100",
  "ergen-psikolojisi": "bg-green-50 text-green-700 border-green-100",
  "aile-terapisi": "bg-amber-50 text-amber-700 border-amber-100",
  "kaygi-bozuklugu": "bg-teal-50 text-teal-700 border-teal-100",
};

export default function ExpertCard({ expert, citySlug }: Props) {
  const href = citySlug
    ? `/${citySlug}/${expert.slug}`
    : `/uzman/${expert.slug}`;

  const isOnline = expert.sessionType.includes("Online");
  const isF2F = expert.sessionType.includes("Yüz Yüze");

  return (
    <motion.article
      className="card overflow-hidden flex flex-col group"
      whileHover={{ y: -8, boxShadow: "0 28px 48px -12px rgba(30,60,50,0.22)" }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Fotoğraf ─────────────────────────────────────── */}
      <div className="relative w-full h-44 bg-cream-100 overflow-hidden">
        <Image
          src={expert.image}
          alt={`${expert.name} — ${expert.title}`}
          fill
          className="object-cover object-top group-hover:scale-107 group-hover:brightness-75 transition-all duration-500"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        {/* Gradient overlay — hover'da daha belirgin */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent group-hover:from-brand-900/80 transition-all duration-500" />

        {/* Doğrulanmış badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Doğrulanmış
        </div>

        {/* Seans türü badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {isF2F && (
            <span className="bg-brand-600/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full">
              Yüz Yüze
            </span>
          )}
          {isOnline && (
            <span className="bg-brand-500/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full">
              Online
            </span>
          )}
        </div>

        {/* Deneyim badge — foto altında overlay */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-brand-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          {expert.experience} deneyim
        </div>

        {/* Hover CTA overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white text-brand-800 font-bold text-xs px-4 py-2 rounded-full shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Profili İncele →
          </span>
        </div>
      </div>

      {/* ── Kart gövdesi ─────────────────────────────────── */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* İsim + Ünvan + Konum */}
        <div>
          <h3 className="font-bold text-brand-900 text-base leading-snug group-hover:text-brand-600 transition-colors duration-200">{expert.name}</h3>
          <p className="text-brand-600 text-sm font-medium">{expert.title}</p>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {expert.district}, {expert.city.charAt(0).toUpperCase() + expert.city.slice(1)}
          </p>
        </div>

        {/* Uzmanlık badge'leri */}
        <div className="flex flex-wrap gap-1.5">
          {expert.services.slice(0, 4).map((s) => (
            <span
              key={s}
              className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                CERT_COLORS[s] ?? "bg-cream-50 text-brand-700 border-cream-200"
              }`}
            >
              {s.replace(/-/g, " ")}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Ücret */}
        <div className="flex items-baseline gap-1.5 pt-2 border-t border-cream-100">
          <span className="font-bold text-brand-700 text-lg leading-none">{expert.sessionFee}</span>
          <span className="text-xs text-slate-400">/ seans</span>
        </div>

        {/* CTA — min 44px touch target */}
        <Link
          href={href}
          className="btn-primary w-full text-center text-sm py-3 min-h-[44px] mt-1"
          aria-label={`${expert.name} profilini görüntüle`}
        >
          Profili İncele →
        </Link>
      </div>
    </motion.article>
  );
}
