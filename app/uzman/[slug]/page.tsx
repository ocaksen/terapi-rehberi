import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getExpertBySlug, getAllExperts } from "@/lib/data";
import { expertSchema, breadcrumbSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllExperts().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);
  if (!expert) return {};
  return {
    title: `${expert.name} — ${expert.title} | Konya Psikolog`,
    description: expert.shortBio,
    alternates: { canonical: `/uzman/${slug}` },
  };
}

const SERVICE_LABELS: Record<string, string> = {
  "bireysel-terapi": "Bireysel Terapi",
  "cift-terapisi": "Çift Terapisi",
  "ergen-psikolojisi": "Ergen Psikolojisi",
  "aile-terapisi": "Aile Terapisi",
  "kaygi-bozuklugu": "Kaygı & Panik Atak",
  emdr: "EMDR Terapisi",
};

export default async function ExpertPage({ params }: Props) {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);
  if (!expert) notFound();

  const isOnline = expert.sessionType.includes("Online");
  const isF2F = expert.sessionType.includes("Yüz Yüze");
  const hasEMDR = expert.services.includes("emdr");

  const jsonLd = [
    expertSchema(expert),
    breadcrumbSchema([
      { name: "Ana Sayfa", url: "/" },
      { name: "Konya", url: "/konya" },
      { name: "Psikologlar", url: "/konya/psikologlar" },
      { name: expert.name, url: `/uzman/${expert.slug}` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {/* ── Hero Banner ──────────────────────────────────────────────── */}
      <div className="bg-brand-900 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-xs text-brand-300 mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/konya" className="hover:text-white transition-colors">Konya</Link>
            <span>/</span>
            <Link href="/konya/psikologlar" className="hover:text-white transition-colors">Psikologlar</Link>
            <span>/</span>
            <span className="text-white font-medium">{expert.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Büyük fotoğraf */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-brand-700 shadow-lg shrink-0">
              <Image
                src={expert.image}
                alt={`${expert.name} — ${expert.title}`}
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{expert.name}</h1>
                {/* Doğrulanmış badge */}
                <span className="flex items-center gap-1 bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Kimlik & Lisans Doğrulandı
                </span>
              </div>

              <p className="text-brand-300 font-semibold text-lg mb-2">{expert.title}</p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-brand-200">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {expert.district}, {expert.city.charAt(0).toUpperCase() + expert.city.slice(1)}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {expert.experience} klinik deneyim
                </span>
              </div>

              {/* Sertifika badges */}
              {hasEMDR && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                    🎓 EMDR Sertifikalı
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── İçerik ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Sol — Profil detayı */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hakkında */}
            <section className="card p-6">
              <h2 className="font-bold text-brand-900 text-lg mb-3">Hakkında</h2>
              <p className="text-slate-600 leading-relaxed">{expert.shortBio}</p>
            </section>

            {/* Uzmanlık Alanları */}
            <section className="card p-6">
              <h2 className="font-bold text-brand-900 text-lg mb-4">Uzmanlık Alanları</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {expert.services.map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-xl px-3 py-2.5"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                    <span className="text-sm font-medium text-brand-800 leading-tight">
                      {SERVICE_LABELS[s] ?? s.replace(/-/g, " ")}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Güven sinyalleri */}
            <section className="card p-6">
              <h2 className="font-bold text-brand-900 text-lg mb-4">Güven & Doğrulama</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-green-800">Kimlik Doğrulandı</p>
                    <p className="text-xs text-green-600">TC Kimlik ile teyit edildi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Lisans Doğrulandı</p>
                    <p className="text-xs text-blue-600">Diploması incelendi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-brand-50 rounded-xl border border-brand-100">
                  <svg className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-brand-800">{expert.experience} Deneyim</p>
                    <p className="text-xs text-brand-600">Klinik uygulama</p>
                  </div>
                </div>
                {hasEMDR && (
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-purple-800">EMDR Sertifikalı</p>
                      <p className="text-xs text-purple-600">Uluslararası akreditasyon</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sağ — Randevu kartı (sticky) */}
          <div className="space-y-4">
            <div className="card p-6 sticky top-24 space-y-4">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-brand-700">{expert.sessionFee}</span>
                  <span className="text-sm text-slate-400">/ seans</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">50–60 dakika seans süresi</p>
              </div>

              {/* Seans türleri */}
              <div className="flex flex-wrap gap-2">
                {isF2F && (
                  <span className="flex items-center gap-1.5 bg-cream-50 border border-cream-200 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Yüz Yüze
                  </span>
                )}
                {isOnline && (
                  <span className="flex items-center gap-1.5 bg-cream-50 border border-cream-200 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Online
                  </span>
                )}
              </div>

              <hr className="border-cream-200" />

              {/* CTA butonları — 44px min */}
              <a
                href={expert.appointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center block py-3.5 min-h-[48px] text-base"
                aria-label={`${expert.name} ile randevu al`}
              >
                Randevu Al →
              </a>
              <a
                href={`tel:${expert.phone}`}
                className="btn-outline w-full text-center block py-3 min-h-[44px] text-sm"
                aria-label={`${expert.name} ara: ${expert.phone}`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {expert.phone}
                </span>
              </a>

              <p className="text-xs text-slate-400 text-center leading-relaxed">
                WhatsApp üzerinden hızlı randevu alabilirsiniz.
              </p>
            </div>

            {/* Geri dön linki */}
            <Link
              href="/konya/psikologlar"
              className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 transition-colors py-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Tüm Konya Psikologları
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
