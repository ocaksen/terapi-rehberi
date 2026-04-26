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
  const services3 = expert.services.slice(0, 3).map((s) => s.replace(/-/g, " ")).join(", ");
  return {
    title: `${expert.name} — ${expert.title} ${expert.district}, Konya | TerapiRehberi`,
    description: `${expert.shortBio} ${expert.district}, Konya'da ${services3} alanlarında hizmet vermektedir.${expert.sessionFee ? ` Seans ücreti: ${expert.sessionFee}.` : ""}`,
    robots: { index: true, follow: true },
    alternates: { canonical: `https://www.terapirehberi.com/uzman/${expert.slug}` },
  };
}

const SERVICE_LABELS: Record<string, { label: string }> = {
  "bireysel-terapi":   { label: "Bireysel Terapi" },
  "cift-terapisi":     { label: "Çift Terapisi" },
  "ergen-psikolojisi": { label: "Ergen Psikolojisi" },
  "aile-terapisi":     { label: "Aile Terapisi" },
  "kaygi-bozuklugu":   { label: "Kaygı & Panik Atak" },
  "emdr":              { label: "EMDR Terapisi" },
  "cocuk-psikolojisi": { label: "Çocuk Psikolojisi" },
  "depresyon":         { label: "Depresyon" },
  "travma":            { label: "Travma Terapisi" },
};

const FAQ = [
  {
    q: "İlk seans nasıl geçer?",
    a: "İlk seans bir tanışma seansıdır. Sizi dinler, neden terapi almak istediğinizi anlamaya çalışır ve terapi hedeflerinizi birlikte belirleriz. Herhangi bir hazırlık yapmanıza gerek yok.",
  },
  {
    q: "Seans ücreti nasıl ödeniyor?",
    a: "Seans ücreti nakit veya havale ile randevu gününde ödenir. Fatura talep etmeniz durumunda e-fatura düzenlenir.",
  },
  {
    q: "Online seans nasıl yapılıyor?",
    a: "Online seanslar güvenli video platformu üzerinden gerçekleştirilir. Randevu öncesi bağlantı linki paylaşılır. Sakin, özel bir ortamda olmanız yeterli.",
  },
  {
    q: "Kaç seans almam gerekecek?",
    a: "Terapi süreci kişiden kişiye değişir. Çoğunlukla 8–12 seans belirgin bir iyileşme için yeterli olurken, bazı durumlarda daha uzun süreçler gerekebilir. Hedeflerinizi birlikte değerlendireceğiz.",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold text-slate-900 text-base mb-4 pb-3 border-b border-slate-100">
      {children}
    </h2>
  );
}

export default async function ExpertPage({ params }: Props) {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);
  if (!expert) notFound();

  const isOnline = expert.sessionType.includes("Online");
  const isF2F    = expert.sessionType.includes("Yüz Yüze");

  const jsonLd = [
    expertSchema(expert),
    breadcrumbSchema([
      { name: "Ana Sayfa",   url: "/" },
      { name: "Konya",       url: "/konya" },
      { name: "Psikologlar", url: "/konya/psikologlar" },
      { name: expert.name,   url: `/uzman/${expert.slug}` },
    ]),
  ];

  // YouTube embed URL'sini çıkar
  const getYoutubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <div className="min-h-screen" style={{ background: "#f8f9fa" }}>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* ── Hero — Brand Green ─────────────────────────────────── */}
      <div className="bg-brand-700 pt-8 pb-0 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs text-brand-200/70 mb-6 flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/konya" className="hover:text-white transition-colors">Konya</Link>
            <span>/</span>
            <Link href="/konya/psikologlar" className="hover:text-white transition-colors">Psikologlar</Link>
            <span>/</span>
            <span className="text-white">{expert.name}</span>
          </nav>

          {/* Profil satırı */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 pb-8">
            {/* Fotoğraf */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl shrink-0">
              <Image
                src={expert.image}
                alt={`${expert.name} — ${expert.title}`}
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="flex-1 pb-1">
              {/* Doğrulanmış badge */}
              <div className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Kimlik & Diploma Doğrulandı
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{expert.name}</h1>
              <p className="text-brand-200 font-medium text-base mt-1">{expert.title}</p>

              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-sm text-brand-200/80">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-brand-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {expert.district}, Konya
                </span>
                {expert.experience && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-brand-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {expert.experience} deneyim
                  </span>
                )}
                {expert.languages && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-brand-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    {expert.languages.join(" · ")}
                  </span>
                )}
              </div>

              {/* Seans tipi + sertifika pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {isF2F && (
                  <span className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                    Yüz Yüze
                  </span>
                )}
                {isOnline && (
                  <span className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Online Seans
                  </span>
                )}
                {expert.certifications?.slice(0, 2).map((cert, i) => (
                  <span key={i} className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-brand-100 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {cert.split("—")[0].trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Fiyat — sağ üst köşe, büyük ekran */}
            <div className="hidden sm:block text-right pb-1 shrink-0">
              <p className="text-3xl font-black text-white">{expert.sessionFee ?? "Belirtilmemiş"}</p>
              <p className="text-brand-300/70 text-xs mt-0.5">/ seans (50 dk)</p>
              <a
                href={expert.appointmentUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2 bg-white text-brand-700 hover:bg-cream-50 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap shadow-lg"
              >
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.522 5.852L0 24l6.293-1.499A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.667-.51-5.186-1.395l-.37-.22-3.838.915.95-3.738-.24-.383A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Randevu Al
              </a>
            </div>
          </div>

          {/* Stats bar */}
          <div className="border-t border-white/10 grid grid-cols-3 divide-x divide-white/10 -mx-4 px-4">
            {[
              { label: "Deneyim",    value: expert.experience ?? "—" },
              { label: "Uzmanlık",   value: `${expert.services.length} Alan` },
              { label: "Seans",      value: expert.sessionType.join(" + ") },
            ].map((s) => (
              <div key={s.label} className="py-3.5 px-3 text-center">
                <p className="text-white font-bold text-sm sm:text-base">{s.value}</p>
                <p className="text-brand-300/60 text-[11px] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── İçerik ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Sol — Ana içerik */}
          <div className="lg:col-span-2 space-y-4">

            {/* Tanıtım Videosu */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 pt-5 pb-1">
                <SectionHeading>Tanıtım Videosu</SectionHeading>
              </div>
              {expert.videoUrl ? (
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  {getYoutubeEmbedUrl(expert.videoUrl) ? (
                    <iframe
                      src={getYoutubeEmbedUrl(expert.videoUrl)!}
                      title={`${expert.name} tanıtım videosu`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <video
                      src={expert.videoUrl}
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                      poster={expert.image}
                    />
                  )}
                </div>
              ) : (
                <div className="mx-6 mb-5 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center py-10 gap-3">
                  <div className="w-14 h-14 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center">
                    <svg className="w-7 h-7 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">Tanıtım videosu yakında eklenecek</p>
                  <p className="text-xs text-slate-400">Uzmanla doğrudan iletişim kurarak daha fazla bilgi alabilirsiniz.</p>
                </div>
              )}
            </section>

            {/* Hakkında */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <SectionHeading>Hakkında</SectionHeading>
              {expert.longBio ? (
                <div className="space-y-3">
                  {expert.longBio.map((para, i) => (
                    <p key={i} className="text-slate-600 leading-relaxed text-[0.9375rem]">{para}</p>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600 leading-relaxed">{expert.shortBio}</p>
              )}
            </section>

            {/* Uzmanlık Alanları */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <SectionHeading>Uzmanlık Alanları</SectionHeading>
              <div className="flex flex-wrap gap-2">
                {expert.services.map((s) => {
                  const info = SERVICE_LABELS[s];
                  return (
                    <span
                      key={s}
                      className="inline-flex items-center bg-brand-50 text-brand-700 text-sm font-medium px-3.5 py-1.5 rounded-xl border border-brand-100"
                    >
                      {info?.label ?? s.replace(/-/g, " ")}
                    </span>
                  );
                })}
              </div>
            </section>

            {/* Terapötik Yaklaşımlar */}
            {expert.approaches && expert.approaches.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <SectionHeading>Terapötik Yaklaşımlar</SectionHeading>
                <div className="flex flex-wrap gap-2">
                  {expert.approaches.map((a) => (
                    <span key={a} className="inline-flex items-center bg-slate-50 text-slate-700 text-sm font-medium px-3.5 py-1.5 rounded-xl border border-slate-200">
                      {a}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Eğitim */}
            {expert.education && expert.education.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <SectionHeading>Eğitim</SectionHeading>
                <div className="space-y-4">
                  {expert.education.map((edu, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{edu.degree}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{edu.school}{edu.year && ` · ${edu.year}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Sertifikalar */}
            {expert.certifications && expert.certifications.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <SectionHeading>Sertifikalar & Üyelikler</SectionHeading>
                <div className="space-y-2.5">
                  {expert.certifications.map((cert, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-xl">
                      <svg className="w-4 h-4 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-green-800">{cert}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SSS */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <SectionHeading>Sık Sorulan Sorular</SectionHeading>
              <div className="space-y-2.5">
                {FAQ.map((item, i) => (
                  <details key={i} className="group border border-slate-100 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between gap-3 px-4 py-3.5 cursor-pointer select-none list-none hover:bg-slate-50 transition-colors">
                      <span className="text-sm font-semibold text-slate-800">{item.q}</span>
                      <svg className="w-4 h-4 text-slate-400 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

          </div>

          {/* Sağ — Sticky sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-24 space-y-4">

              {/* Fiyat */}
              <div className="text-center pb-4 border-b border-slate-100">
                <p className="text-3xl font-black text-brand-700">{expert.sessionFee ?? "Belirtilmemiş"}</p>
                <p className="text-xs text-slate-400 mt-0.5">seans başına · 50 dakika</p>
              </div>

              {/* Seans türleri */}
              <div className="flex flex-col gap-2">
                {isF2F && (
                  <div className="flex items-center gap-3 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2.5">
                    <svg className="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <p className="text-xs font-bold text-teal-800">Yüz Yüze Seans</p>
                      {expert.officeAddress && (
                        <p className="text-[11px] text-teal-600 mt-0.5 leading-snug">{expert.officeAddress}</p>
                      )}
                    </div>
                  </div>
                )}
                {isOnline && (
                  <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
                    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-xs font-bold text-blue-800">Online Seans</p>
                      <p className="text-[11px] text-blue-600 mt-0.5">Güvenli video platformu</p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <a
                href={expert.appointmentUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-3.5 rounded-xl transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.522 5.852L0 24l6.293-1.499A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.667-.51-5.186-1.395l-.37-.22-3.838.915.95-3.738-.24-.383A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                WhatsApp ile Randevu Al
              </a>
              {expert.phone && (
                <a
                  href={`tel:${expert.phone}`}
                  className="flex items-center justify-center gap-2 w-full border-2 border-brand-200 text-brand-700 hover:bg-brand-50 font-semibold px-4 py-3 rounded-xl transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {expert.phone}
                </a>
              )}

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Ücretsiz ön görüşme için WhatsApp&apos;tan mesaj atabilirsiniz.
              </p>

              <hr className="border-slate-100" />

              {/* Güven noktaları */}
              <div className="space-y-2.5">
                {[
                  { icon: <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>, text: "Gizlilik garantisi" },
                  { icon: <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>, text: "Diploma doğrulandı" },
                  { icon: <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, text: "48 saat içinde yanıt" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-500">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Listeye dön */}
            <Link
              href="/konya/psikologlar"
              className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 transition-colors py-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Tüm Konya Psikologları
            </Link>

            {/* Uzman için düzeltme notu */}
            <div className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-100 pt-3">
              Bu profil kamuya açık kaynaklardan derlenmiştir.
              Bilgi güncelleme veya kaldırma talebi için{" "}
              <a
                href={`mailto:iletisim@terapirehberi.com?subject=Profil Talebi: ${expert.name}`}
                className="text-brand-500 hover:underline"
              >
                iletisim@terapirehberi.com
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobil sticky CTA ─────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 flex gap-3 z-40 shadow-lg">
        {expert.phone && (
          <a
            href={`tel:${expert.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 border-2 border-brand-200 text-brand-700 font-semibold rounded-xl py-3 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Ara
          </a>
        )}
        <a
          href={expert.appointmentUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl py-3 text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          </svg>
          WhatsApp Randevu
        </a>
      </div>

    </div>
  );
}
