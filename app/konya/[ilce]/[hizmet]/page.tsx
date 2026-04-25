import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllExperts, getAllServices, getServiceBySlug } from "@/lib/data";
import type { ServiceFaq } from "@/types";

const BASE = "https://www.terapirehberi.com";

const ILCELER: Record<string, { name: string; nüfus: string; tanim: string }> = {
  meram: {
    name: "Meram",
    nüfus: "349.000+",
    tanim: "Konya'nın yeşil ilçesi Meram, şehrin güneybatısında köklü bir yerleşim alanıdır.",
  },
  selcuklu: {
    name: "Selçuklu",
    nüfus: "703.000+",
    tanim: "Konya'nın en kalabalık ilçesi Selçuklu, şehrin kuzeyinde ticaret ve eğitim merkezi konumundadır.",
  },
  karatay: {
    name: "Karatay",
    nüfus: "395.000+",
    tanim: "Konya'nın tarihi merkezi Karatay, doğusunda gelişen modern konut ve sağlık altyapısıyla öne çıkar.",
  },
};

// İlçe × Hizmet kombinasyonuna özgü kısa tanım
const COMBO_DESC: Record<string, Record<string, string>> = {
  meram: {
    "bireysel-terapi":   "Meram'da bireysel terapi almak isteyen danışanlar için mahalle klinikleri ve online seans seçenekleri mevcuttur.",
    "cift-terapisi":     "Meram'da çift terapisi sunan uzmanlar, ilişki krizleri ve iletişim sorunlarında çiftlere yol gösterir.",
    "ergen-psikolojisi": "Meram'daki ergen psikolojisi uzmanları, okul stresi ve kimlik gelişimi konularında gençlere destek olur.",
    "aile-terapisi":     "Meram'da aile terapisi hizmetleri, aile içi çatışma ve uyum sorunlarının çözümüne odaklanır.",
    "kaygi-bozuklugu":   "Meram'da kaygı ve panik atak tedavisi için BDT tabanlı uzmanlar danışanlarla yüz yüze ve online çalışır.",
    "emdr":              "Meram'da EMDR terapisi, travma ve TSSB tedavisinde sertifikalı uzmanlar tarafından uygulanmaktadır.",
  },
  selcuklu: {
    "bireysel-terapi":   "Selçuklu'da bireysel terapi; üniversite öğrencileri, çalışanlar ve yetişkinler için geniş uzman ağıyla sunulmaktadır.",
    "cift-terapisi":     "Selçuklu'da çift terapisi için randevu alan çiftler, ilişki dinamiklerini deneyimli terapistlerle yeniden şekillendirebilir.",
    "ergen-psikolojisi": "Selçuklu'daki ergen psikolojisi uzmanları, sınav kaygısı ve sosyal uyum konularında ergenlere ve ebeveynlere rehberlik eder.",
    "aile-terapisi":     "Selçuklu'da aile terapisi uzmanları, boşanma süreci, yas ve aile içi şiddet sonrası iyileşme alanlarında çalışmaktadır.",
    "kaygi-bozuklugu":   "Selçuklu'da kaygı bozukluğu tedavisinde uzman psikolog yoğunluğu Konya'nın en yüksek ilçesidir.",
    "emdr":              "Selçuklu'da EMDR terapisi uygulayan birden fazla sertifikalı terapist, travma geçmişi olan danışanlara hizmet vermektedir.",
  },
  karatay: {
    "bireysel-terapi":   "Karatay'da bireysel terapi hizmetleri gelişmekte olup online seans seçeneğiyle tüm Konya'dan erişim mümkündür.",
    "cift-terapisi":     "Karatay'da çift terapisi için online seans tercih eden çiftler, Konya'nın deneyimli terapistlerine erişebilir.",
    "ergen-psikolojisi": "Karatay'daki ergenler için psikolojik destek; online terapi kanalıyla ilçe dışı uzmanlardan alınabilmektedir.",
    "aile-terapisi":     "Karatay'da aile terapisi ihtiyacı duyanlar, yakın konumdaki Selçuklu ve Meram kliniklerine kolaylıkla ulaşabilir.",
    "kaygi-bozuklugu":   "Karatay'da kaygı bozukluğu için online seanslar, ilçenin her mahallesinden kolayca erişim sağlar.",
    "emdr":              "Karatay'dan EMDR terapisi almak isteyen danışanlar, Konya genelindeki sertifikalı uzmanlarla online çalışabilir.",
  },
};

interface Props {
  params: Promise<{ ilce: string; hizmet: string }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  const params: { ilce: string; hizmet: string }[] = [];
  for (const ilce of Object.keys(ILCELER)) {
    for (const s of services) {
      params.push({ ilce, hizmet: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ilce, hizmet } = await params;
  const ilceData = ILCELER[ilce];
  const service = getServiceBySlug(hizmet);
  if (!ilceData || !service) return {};

  const title = `Konya ${ilceData.name} ${service.name} 2026 — Lisanslı Uzman Psikolog`;
  const description =
    COMBO_DESC[ilce]?.[hizmet] ??
    `Konya ${ilceData.name}'da ${service.name} hizmeti sunan lisanslı uzman psikologlar. 2026 güncel liste.`;

  return {
    title,
    description,
    keywords: [
      `konya ${ilceData.name.toLowerCase()} ${service.name.toLowerCase()}`,
      `${ilceData.name.toLowerCase()} ${service.name.toLowerCase()}`,
      `konya ${hizmet}`,
    ],
    alternates: { canonical: `${BASE}/konya/${ilce}/${hizmet}` },
    openGraph: {
      title,
      description,
      url: `${BASE}/konya/${ilce}/${hizmet}`,
    },
  };
}

function makeBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export default async function IlceHizmetPage({ params }: Props) {
  const { ilce, hizmet } = await params;

  const ilceData = ILCELER[ilce];
  const service = getServiceBySlug(hizmet);
  if (!ilceData || !service) notFound();

  const allServices = getAllServices();
  const experts = getAllExperts()
    .filter((e) => e.city === "konya")
    .filter((e) => e.district.toLowerCase() === ilceData.name.toLowerCase())
    .filter((e) => e.services.includes(hizmet));

  const breadcrumb = makeBreadcrumbSchema([
    { name: "Ana Sayfa",          url: BASE },
    { name: "Konya",              url: `${BASE}/konya` },
    { name: `${ilceData.name} Psikolog`, url: `${BASE}/konya/${ilce}` },
    { name: service.name,         url: `${BASE}/konya/${ilce}/${hizmet}` },
  ]);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Konya ${ilceData.name} ${service.name} Uzmanları`,
    url: `${BASE}/konya/${ilce}/${hizmet}`,
    numberOfItems: experts.length,
    itemListElement: experts.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      url: `${BASE}/uzman/${e.slug}`,
    })),
  };

  const comboDesc = COMBO_DESC[ilce]?.[hizmet];
  const otherServicesInDistrict = allServices.filter((s) => s.slug !== hizmet);
  const otherDistricts = Object.entries(ILCELER).filter(([slug]) => slug !== ilce);

  return (
    <div className="min-h-screen bg-cream-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-14 px-4">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />

        <div className="relative max-w-6xl mx-auto">
          <nav className="text-xs text-brand-300 mb-5 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/konya" className="hover:text-white transition-colors">Konya</Link>
            <span>/</span>
            <Link href={`/konya/${ilce}`} className="hover:text-white transition-colors">{ilceData.name}</Link>
            <span>/</span>
            <span className="text-white font-medium">{service.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-2">
                Konya · {ilceData.name} · {service.name}
              </p>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
                <span className="text-brand-300">{ilceData.name}</span>{" "}
                {service.name}
              </h1>
              <p className="text-brand-200 text-sm max-w-lg leading-relaxed">
                {comboDesc ?? `Konya ${ilceData.name}'da ${service.name} alanında lisanslı uzman psikologlar.`}
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-white/10">
                <p className="text-2xl font-black text-white">{experts.length}</p>
                <p className="text-brand-300 text-xs mt-0.5">Uzman</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-white/10">
                <p className="text-2xl font-black text-white">{service.icon}</p>
                <p className="text-brand-300 text-xs mt-0.5">{service.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Uzman listesi */}
        {experts.length > 0 ? (
          <div className="mb-10">
            <p className="text-sm text-slate-500 mb-4">
              Konya {ilceData.name}&apos;da {service.name} alanında{" "}
              <strong className="text-slate-700">{experts.length} lisanslı uzman</strong> bulundu.
            </p>
            <div className="divide-y divide-cream-200 bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-sm">
              {experts.map((e) => (
                <Link
                  key={e.slug}
                  href={`/uzman/${e.slug}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 hover:bg-cream-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-brand-900 text-sm">{e.name}</p>
                    <p className="text-xs text-slate-500">{e.title} · {e.district}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {e.sessionFee && (
                      <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                        {e.sessionFee}
                      </span>
                    )}
                    <span className="text-xs text-slate-400">{e.sessionType.join(" · ")}</span>
                    <svg className="w-4 h-4 text-brand-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center mb-10">
            <p className="text-3xl mb-3">{service.icon}</p>
            <p className="font-semibold text-brand-900 mb-2">
              {ilceData.name}&apos;da {service.name} uzmanı ekleniyor
            </p>
            <p className="text-sm text-slate-500 mb-5 max-w-sm mx-auto">
              Bu kombinasyon için listemiz büyüyor. Online seans seçeneğiyle tüm Konya uzmanlarına ulaşabilirsiniz.
            </p>
            <Link href={`/konya/${hizmet}`} className="btn-primary text-sm">
              Konya Geneli {service.name} Uzmanları →
            </Link>
          </div>
        )}

        {/* Hizmet açıklaması */}
        {service.longDescription && (
          <div className="bg-white rounded-2xl border border-cream-200 p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-bold text-brand-900 mb-4">
              {ilceData.name}&apos;da {service.name} Nedir?
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
          <div className="bg-white rounded-2xl border border-cream-200 p-6 sm:p-8 mb-8">
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

        {/* İç linkler */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Aynı ilçede diğer hizmetler */}
          <div className="bg-white rounded-2xl border border-cream-200 p-5">
            <p className="font-semibold text-brand-900 mb-3 text-sm">
              {ilceData.name}&apos;da Diğer Hizmetler
            </p>
            <div className="flex flex-wrap gap-2">
              {otherServicesInDistrict.map((s) => (
                <Link
                  key={s.slug}
                  href={`/konya/${ilce}/${s.slug}`}
                  className="flex items-center gap-1 bg-cream-50 border border-cream-200 text-brand-700 text-xs px-3 py-1.5 rounded-full hover:border-brand-300 transition-colors"
                >
                  <span>{s.icon}</span> {s.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Aynı hizmet, diğer ilçeler */}
          <div className="bg-white rounded-2xl border border-cream-200 p-5">
            <p className="font-semibold text-brand-900 mb-3 text-sm">
              {service.name} — Diğer İlçeler
            </p>
            <div className="flex flex-wrap gap-2">
              {otherDistricts.map(([slug, data]) => (
                <Link
                  key={slug}
                  href={`/konya/${slug}/${hizmet}`}
                  className="flex items-center gap-1.5 bg-cream-50 border border-cream-200 text-brand-700 text-xs px-3 py-1.5 rounded-full hover:border-brand-300 transition-colors"
                >
                  <svg className="w-3 h-3 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {data.name}
                </Link>
              ))}
              <Link
                href={`/konya/${hizmet}`}
                className="flex items-center gap-1 bg-brand-50 border border-brand-200 text-brand-700 text-xs px-3 py-1.5 rounded-full hover:border-brand-400 transition-colors font-medium"
              >
                Konya Geneli →
              </Link>
            </div>
          </div>
        </div>

        {/* İlçe ana sayfasına dön */}
        <div className="mt-6 text-center">
          <Link
            href={`/konya/${ilce}`}
            className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tüm {ilceData.name} Psikologları
          </Link>
        </div>
      </div>
    </div>
  );
}
