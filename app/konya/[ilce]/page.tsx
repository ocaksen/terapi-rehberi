import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllExperts, getAllServices, getServiceBySlug } from "@/lib/data";
import type { ServiceFaq } from "@/types";
import IlceBentoClient from "./IlceBentoClient";

// İlçe bilgileri
const ILCELER: Record<string, { name: string; description: string; nüfus: string }> = {
  meram: {
    name: "Meram",
    description: "Meram ilçesinde bireysel terapi, çift terapisi ve EMDR alanında uzman psikologlar.",
    nüfus: "349.000+",
  },
  selcuklu: {
    name: "Selçuklu",
    description: "Selçuklu ilçesinde kaygı, depresyon ve aile terapisi konularında deneyimli psikologlar.",
    nüfus: "703.000+",
  },
  karatay: {
    name: "Karatay",
    description: "Karatay ilçesinde ergen psikolojisi ve bireysel danışmanlık alanında uzman psikologlar.",
    nüfus: "395.000+",
  },
};

interface Props {
  params: Promise<{ ilce: string }>;
}

export async function generateStaticParams() {
  return [
    ...Object.keys(ILCELER).map((ilce) => ({ ilce })),
    // Hizmet slug'ları da bu route'tan geçer
    ...["bireysel-terapi", "cift-terapisi", "ergen-psikolojisi", "aile-terapisi", "kaygi-bozuklugu", "emdr"].map(
      (slug) => ({ ilce: slug })
    ),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ilce } = await params;

  // Hizmet sayfası mı?
  const service = getServiceBySlug(ilce);
  if (service) {
    return {
      title: `Konya ${service.name} — Uzman Psikolog | TerapiRehberi`,
      description: service.longDescription
        ? service.longDescription.split("\n\n")[0].slice(0, 160)
        : service.shortDescription,
      alternates: { canonical: `/konya/${ilce}` },
    };
  }

  // İlçe sayfası mı?
  const ilceData = ILCELER[ilce];
  if (ilceData) {
    return {
      title: `${ilceData.name} Psikolog — Uzman Terapist | TerapiRehberi`,
      description: ilceData.description,
      alternates: { canonical: `/konya/${ilce}` },
    };
  }

  return {};
}

export default async function KonyaSlugPage({ params }: Props) {
  const { ilce } = await params;
  const allExperts = getAllExperts().filter((e) => e.city === "konya");
  const services = getAllServices();

  // Hizmet sayfası
  const service = getServiceBySlug(ilce);
  if (service) {
    const experts = allExperts.filter((e) => e.services.includes(ilce));
    return (
      <div className="min-h-screen bg-cream-50">
        <div className="bg-white border-b border-cream-200 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
              <Link href="/" className="hover:text-brand-600">Ana Sayfa</Link>
              <span>/</span>
              <Link href="/konya" className="hover:text-brand-600">Konya</Link>
              <span>/</span>
              <span className="text-brand-600 font-medium">{service.name}</span>
            </nav>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{service.icon}</span>
              <h1 className="text-3xl font-bold text-brand-900">Konya {service.name}</h1>
            </div>
            <p className="text-slate-500 text-sm max-w-2xl">{service.shortDescription}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Uzman listesi */}
          {experts.length > 0 ? (
            <>
              <p className="text-sm text-slate-500 mb-6">
                Bu alanda <strong className="text-slate-700">{experts.length} uzman</strong> listemizde yer alıyor.
              </p>
              <div className="divide-y divide-cream-200 bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-sm mb-12">
                {experts.map((e) => (
                  <div key={e.slug} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4">
                    <div>
                      <p className="font-semibold text-brand-900 text-sm">{e.name}</p>
                      <p className="text-xs text-slate-500">{e.title} · {e.district}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {e.sessionFee && <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">{e.sessionFee}</span>}
                      <span className="text-xs text-slate-400">{e.sessionType.join(" · ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center mb-12">
              <p className="text-3xl mb-3">{service.icon}</p>
              <p className="font-semibold text-brand-900 mb-1">
                Konya&apos;da {service.name} uzmanı yakında
              </p>
              <p className="text-sm text-slate-500 mb-4">
                Bu alanda uzman psikologlar listeye ekleniyor.
              </p>
              <Link href="/konya/psikologlar" className="btn-primary text-sm">
                Tüm Uzmanları Gör →
              </Link>
            </div>
          )}

          {/* Uzun açıklama */}
          {service.longDescription && (
            <div className="bg-white rounded-2xl border border-cream-200 p-6 sm:p-8 mb-10">
              <h2 className="text-xl font-bold text-brand-900 mb-4">
                Konya&apos;da {service.name} Hakkında
              </h2>
              <div className="space-y-4">
                {service.longDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          )}

          {/* SSS */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="bg-white rounded-2xl border border-cream-200 p-6 sm:p-8 mb-10">
              <h2 className="text-xl font-bold text-brand-900 mb-5">Sık Sorulan Sorular</h2>
              <div className="divide-y divide-cream-200">
                {service.faqs.map((faq: ServiceFaq, i: number) => (
                  <div key={i} className="py-4 first:pt-0 last:pb-0">
                    <p className="font-semibold text-brand-800 text-sm mb-1">{faq.q}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Diğer hizmetler */}
          <div className="mt-2">
            <p className="font-semibold text-brand-900 mb-4 text-sm">Diğer Uzmanlık Alanları</p>
            <div className="flex flex-wrap gap-2">
              {services.filter((s) => s.slug !== ilce).map((s) => (
                <Link
                  key={s.slug}
                  href={`/konya/${s.slug}`}
                  className="flex items-center gap-1.5 bg-white border border-cream-200 text-brand-700 text-sm px-3 py-1.5 rounded-full hover:border-brand-300 transition-colors"
                >
                  <span>{s.icon}</span> {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // İlçe sayfası
  const ilceData = ILCELER[ilce];
  if (!ilceData) notFound();

  const districtExperts = allExperts.filter(
    (e) => e.district.toLowerCase() === ilceData.name.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-14 px-4">
        {/* Dekoratif daireler */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute top-8 right-1/3 w-24 h-24 rounded-full bg-white/5" />

        <div className="relative max-w-6xl mx-auto">
          <nav className="text-xs text-brand-300 mb-5 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/konya" className="hover:text-white transition-colors">Konya</Link>
            <span>/</span>
            <span className="text-white font-medium">{ilceData.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-2">
                Konya · {ilceData.name}
              </p>
              <h1 className="text-4xl font-black text-white mb-3 leading-tight">
                {ilceData.name}<br />
                <span className="text-brand-300">Psikologları</span>
              </h1>
              <p className="text-brand-200 text-sm max-w-md leading-relaxed">{ilceData.description}</p>
            </div>

            {/* Stat kutucukları */}
            <div className="flex gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-white/10">
                <p className="text-2xl font-black text-white">{districtExperts.length}</p>
                <p className="text-brand-300 text-xs mt-0.5">Uzman</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-white/10">
                <p className="text-2xl font-black text-white">{ilceData.nüfus}</p>
                <p className="text-brand-300 text-xs mt-0.5">Nüfus</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Client (filters + grid + pagination) */}
      <IlceBentoClient experts={districtExperts} />

      {/* Diğer ilçeler */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="border-t border-cream-200 pt-8">
          <p className="font-semibold text-brand-900 mb-3 text-sm">Konya Diğer İlçeler</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(ILCELER)
              .filter(([slug]) => slug !== ilce)
              .map(([slug, data]) => (
                <Link
                  key={slug}
                  href={`/konya/${slug}`}
                  className="flex items-center gap-1.5 bg-white border border-cream-200 text-brand-700 text-sm px-4 py-2 rounded-full hover:border-brand-300 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {data.name} Psikolog
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
