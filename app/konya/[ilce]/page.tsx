import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllExperts, getAllServices, getServiceBySlug } from "@/lib/data";

import type { ServiceFaq } from "@/types";
import IlceBentoClient from "./IlceBentoClient";

const BASE = "https://www.terapirehberi.com";

// İlçe bilgileri
interface IlceData {
  name: string;
  description: string;
  nüfus: string;
  tanim: string;
  faqs: { q: string; a: string }[];
}

const ILCELER: Record<string, IlceData> = {
  meram: {
    name: "Meram",
    description: "Konya Meram'da bireysel terapi, çift terapisi ve EMDR alanında lisanslı psikolog ve terapistler. 2026 güncel liste.",
    nüfus: "349.000+",
    tanim: "Konya'nın yeşil ve sakin ilçesi Meram, köklü mahalle yapısı ve gelişen sağlık altyapısıyla öne çıkar.",
    faqs: [
      {
        q: "Meram'da psikolog randevusu nasıl alınır?",
        a: "TerapiRehberi'ndeki Meram psikologlarının profilinde yer alan randevu bağlantısına tıklayarak doğrudan iletişime geçebilirsiniz. Bazı uzmanlar ücretsiz ilk görüşme sunmaktadır.",
      },
      {
        q: "Meram'da seans ücreti ne kadar?",
        a: "2026 itibarıyla Meram'daki psikoloji seansları genellikle 1.500–3.500 TL arasında değişmektedir. Seans ücreti uzmanlık alanı, deneyim ve seans türüne göre farklılık gösterir.",
      },
      {
        q: "Meram'da online terapi alabilir miyim?",
        a: "Evet. Meram'daki psikologların büyük çoğunluğu yüz yüze seansın yanı sıra online seans da sunmaktadır. Filtre ile 'Online' seçeneğini işaretleyerek listeleri daraltabilirsiniz.",
      },
      {
        q: "Meram'da çocuk psikoloğu bulabilir miyim?",
        a: "Evet, Meram'da çocuk psikolojisi ve oyun terapisi alanında uzman psikologlar bulunmaktadır. 'Çocuk Psikolojisi' filtresini kullanarak ilgili uzmanları görebilirsiniz.",
      },
      {
        q: "Meram'da terapist ile psikolog arasındaki fark nedir?",
        a: "Psikolog, psikoloji lisansı veya yüksek lisansına sahip kişidir. Terapist ise psikoterapi eğitimi almış, lisanslı bir psikoloğu da kapsayan geniş bir unvandır. TerapiRehberi'nde listelenen tüm uzmanlar diploma doğrulamasından geçmektedir.",
      },
    ],
  },
  selcuklu: {
    name: "Selçuklu",
    description: "Konya Selçuklu'da kaygı, depresyon ve aile terapisi konularında deneyimli lisanslı psikologlar. 2026 güncel liste.",
    nüfus: "703.000+",
    tanim: "Konya'nın en kalabalık ilçesi Selçuklu, üniversiteler, hastaneler ve özel klinikler ile şehrin psikolojik destek merkezidir.",
    faqs: [
      {
        q: "Selçuklu'da en iyi psikolog nasıl seçilir?",
        a: "Önce sorununuzu netleştirin (kaygı, ilişki, travma vb.), ardından o alanda uzmanlaşmış bir terapist arayın. Seans öncesi ücretsiz tanışma görüşmesi sunan uzmanları tercih etmek doğru bir başlangıçtır.",
      },
      {
        q: "Selçuklu'da EMDR terapisi yapan psikolog var mı?",
        a: "Evet, Selçuklu'da EMDR Temel Eğitim sertifikasına sahip birden fazla psikolog hizmet vermektedir. 'EMDR' filtresiyle listeyi daraltabilirsiniz.",
      },
      {
        q: "Selçuklu'da üniversite öğrencileri için terapi seçenekleri nelerdir?",
        a: "Selçuklu'da pek çok psikolog öğrenci dostu seans saatleri ve ücretleri sunmaktadır. Online terapi seçeneği de öğrenciler için ekonomik ve erişilebilir bir alternatiftir.",
      },
      {
        q: "Selçuklu'da çift terapisi seansı ne sıklıkla yapılır?",
        a: "Çift terapisi genellikle haftada bir veya iki haftada bir yapılır. İlk birkaç seans durumu değerlendirmeye yönelik olup terapist sıklığı birlikte belirler.",
      },
      {
        q: "Selçuklu'da online ve yüz yüze terapi arasında nasıl seçim yapmalıyım?",
        a: "İkisi de etkilidir. Klinik ortamı ve fiziksel yakınlığı önemseyenler için yüz yüze, esnek saat ve konum bağımsızlığı isteyenler için online terapi daha uygundur.",
      },
    ],
  },
  karatay: {
    name: "Karatay",
    description: "Konya Karatay'da ergen psikolojisi ve bireysel danışmanlık alanında lisanslı uzman psikologlar. 2026 güncel liste.",
    nüfus: "395.000+",
    tanim: "Konya'nın tarihi merkezi Karatay, gelişen altyapısıyla sağlık hizmetlerine erişimde Selçuklu ve Meram'a yakın konumdadır.",
    faqs: [
      {
        q: "Karatay'da psikolog bulmak zor mu?",
        a: "Karatay'da yüz yüze psikolog sayısı diğer ilçelere kıyasla daha sınırlıdır; ancak online terapi seçeneğiyle Konya'nın tüm uzmanlarına kolaylıkla ulaşabilirsiniz.",
      },
      {
        q: "Karatay'dan online terapi alabilir miyim?",
        a: "Evet. Online terapi, Karatay sakinleri için en pratik seçenektir. TerapiRehberi'nde listelenen uzmanların büyük çoğunluğu video seans sunmaktadır.",
      },
      {
        q: "Karatay'da aile terapisi için nereye gitmeliyim?",
        a: "Karatay'a yakın konumdaki Selçuklu'da aile terapisi uzmanları mevcuttur. Online seans tercih ederseniz ilçe sınırı olmaksızın tüm Konya uzmanlarına erişebilirsiniz.",
      },
      {
        q: "Karatay'da ilk terapi seansında neler olur?",
        a: "İlk seans genellikle tanışma ve değerlendirme görüşmesidir. Terapist sorunlarınızı dinler, geçmişinizi anlar ve birlikte hedefler belirler. Herhangi bir karar verme baskısı yoktur.",
      },
      {
        q: "Karatay'da psikolojik destek almak için SGK kapsama giriyor mu?",
        a: "SGK, sözleşmeli psikiyatristlere bağlı bazı psikolojik hizmetleri karşılayabilir; ancak özel psikolog seansları genellikle kapsam dışıdır. Terapistinizden fatura bilgisi alarak özel sigortanıza başvurabilirsiniz.",
      },
    ],
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
      title: `Konya ${service.name} 2026 — Lisanslı Uzman Psikolog | TerapiRehberi`,
      description: service.longDescription
        ? service.longDescription.split("\n\n")[0].slice(0, 160)
        : service.shortDescription,
      alternates: { canonical: `${BASE}/konya/${ilce}` },
      openGraph: {
        title: `Konya ${service.name} 2026 — Lisanslı Uzman Psikolog`,
        description: service.shortDescription,
        url: `${BASE}/konya/${ilce}`,
      },
    };
  }

  // İlçe sayfası mı?
  const ilceData = ILCELER[ilce];
  if (ilceData) {
    return {
      title: `Konya ${ilceData.name} Psikolog 2026 — Lisanslı Uzman Terapist | TerapiRehberi`,
      description: ilceData.description,
      keywords: [`konya ${ilceData.name.toLowerCase()} psikolog`, `${ilceData.name.toLowerCase()} psikolog`, `konya ${ilceData.name.toLowerCase()} terapist`],
      alternates: { canonical: `${BASE}/konya/${ilce}` },
      openGraph: {
        title: `Konya ${ilceData.name} Psikolog 2026 — Lisanslı Uzman Terapist`,
        description: ilceData.description,
        url: `${BASE}/konya/${ilce}`,
      },
    };
  }

  return {};
}

function makeBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE}${item.url}`,
    })),
  };
}

export default async function KonyaSlugPage({ params }: Props) {
  const { ilce } = await params;
  const allExperts = getAllExperts().filter((e) => e.city === "konya");
  const services = getAllServices();

  // Hizmet sayfası
  const service = getServiceBySlug(ilce);
  if (service) {
    const experts = allExperts.filter((e) => e.services.includes(ilce));
    const serviceBreadcrumb = makeBreadcrumbSchema([
      { name: "Ana Sayfa",  url: BASE },
      { name: "Konya",      url: `${BASE}/konya` },
      { name: service.name, url: `${BASE}/konya/${ilce}` },
    ]);
    const serviceItemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Konya ${service.name} Uzmanları`,
      url: `${BASE}/konya/${ilce}`,
      numberOfItems: experts.length,
      itemListElement: experts.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: e.name,
        url: `${BASE}/uzman/${e.slug}`,
      })),
    };
    return (
      <div className="min-h-screen bg-cream-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceBreadcrumb) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceItemList) }} />
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

  const breadcrumbSchema = makeBreadcrumbSchema([
    { name: "Ana Sayfa",   url: BASE },
    { name: "Konya",       url: `${BASE}/konya` },
    { name: `${ilceData.name} Psikolog`, url: `${BASE}/konya/${ilce}` },
  ]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ilceData.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Konya ${ilceData.name} Psikolog Listesi`,
    url: `${BASE}/konya/${ilce}`,
    numberOfItems: districtExperts.length,
    itemListElement: districtExperts.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      url: `${BASE}/uzman/${e.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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

      {/* Hizmet kartları — combo sayfalara link */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-4">
        <h2 className="text-lg font-bold text-brand-900 mb-4">
          {ilceData.name}&apos;da Uzmanlık Alanları
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {services.map((s) => {
            const count = districtExperts.filter((e) => e.services.includes(s.slug)).length;
            return (
              <Link
                key={s.slug}
                href={`/konya/${ilce}/${s.slug}`}
                className="group bg-white rounded-2xl border border-cream-200 p-4 hover:border-brand-300 hover:shadow-sm transition-all"
              >
                <span className="text-2xl block mb-2">{s.icon}</span>
                <p className="font-semibold text-brand-900 text-sm group-hover:text-brand-700 transition-colors">{s.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {count > 0 ? `${count} uzman` : "Online seçeneği mevcut"}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Nasıl psikolog seçilir */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-cream-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-brand-900 mb-6">
            {ilceData.name}&apos;da Psikolog Nasıl Seçilir?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { num: "1", baslik: "Sorununuzu netleştirin", aciklama: "Kaygı, depresyon, ilişki, travma mı? Doğru uzmanlık alanı terapinin etkinliğini doğrudan etkiler." },
              { num: "2", baslik: "Seans türüne karar verin", aciklama: "Yüz yüze seans klinik ortam sunar; online terapi ise esneklik ve konum bağımsızlığı sağlar. İkisi de etkilidir." },
              { num: "3", baslik: "Bütçenizi planlayın", aciklama: "Seanslar genellikle 1.500–3.500 TL arasındadır. Bazı uzmanlar öğrenci indirimi veya kayan ölçekli ücret sunabilir." },
              { num: "4", baslik: "İlk görüşmeyi yapın", aciklama: "Çoğu terapist 15 dakikalık ücretsiz tanışma görüşmesi sunar. Kendinizi güvende hissettiğiniz biriyle çalışmak çok önemlidir." },
            ].map((adim) => (
              <div key={adim.num} className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-black text-sm flex items-center justify-center">
                  {adim.num}
                </div>
                <div>
                  <p className="font-semibold text-brand-900 text-sm mb-1">{adim.baslik}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{adim.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SSS */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl border border-cream-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-brand-900 mb-6">
            Sık Sorulan Sorular — {ilceData.name} Psikolog
          </h2>
          <div className="divide-y divide-cream-200">
            {ilceData.faqs.map((faq, i) => (
              <div key={i} className="py-4 first:pt-0 last:pb-0">
                <p className="font-semibold text-brand-800 text-sm mb-1">{faq.q}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Diğer ilçeler */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="border-t border-cream-200 pt-6">
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
