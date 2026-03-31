import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllExperts, getAllServices, getServiceBySlug } from "@/lib/data";
import ExpertCard from "@/components/ExpertCard";

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
      description: service.shortDescription,
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
          {experts.length > 0 ? (
            <>
              <p className="text-sm text-slate-500 mb-6 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <strong>{experts.length}</strong> doğrulanmış uzman
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {experts.map((e) => (
                  <ExpertCard key={e.slug} expert={e} citySlug="konya" />
                ))}
              </div>
            </>
          ) : (
            <div className="card p-10 text-center mb-8">
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

          {/* Diğer hizmetler */}
          <div className="mt-10">
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
      <div className="bg-brand-900 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-brand-300 mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/konya" className="hover:text-white">Konya</Link>
            <span>/</span>
            <span className="text-white font-medium">{ilceData.name}</span>
          </nav>
          <h1 className="text-3xl font-bold text-white mb-2">
            {ilceData.name} Psikolog
          </h1>
          <p className="text-brand-300 text-sm max-w-xl">{ilceData.description}</p>
          <div className="flex gap-4 mt-4 text-xs text-brand-300">
            <span>Nüfus: {ilceData.nüfus}</span>
            <span>·</span>
            <span>{districtExperts.length} doğrulanmış uzman</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {districtExperts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {districtExperts.map((e) => (
              <ExpertCard key={e.slug} expert={e} citySlug="konya" />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center mb-10">
            <p className="text-3xl mb-3">📍</p>
            <p className="font-semibold text-brand-900 mb-1">
              {ilceData.name} için uzman yakında ekleniyor
            </p>
            <p className="text-sm text-slate-500 mb-4">
              Tüm Konya uzmanlarını görmek için aşağıya tıklayın.
            </p>
            <Link href="/konya/psikologlar" className="btn-primary text-sm">
              Tüm Konya Psikologları →
            </Link>
          </div>
        )}

        {/* Diğer ilçeler */}
        <div>
          <p className="font-semibold text-brand-900 mb-3 text-sm">Konya Diğer İlçeler</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(ILCELER)
              .filter(([slug]) => slug !== ilce)
              .map(([slug, data]) => (
                <Link
                  key={slug}
                  href={`/konya/${slug}`}
                  className="bg-white border border-cream-200 text-brand-700 text-sm px-4 py-2 rounded-full hover:border-brand-300 transition-colors"
                >
                  📍 {data.name} Psikolog
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
