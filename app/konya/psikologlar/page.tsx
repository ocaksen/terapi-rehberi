import type { Metadata } from "next";
import Link from "next/link";
import { getExpertsByCity } from "@/lib/data";


export const metadata: Metadata = {
  title: "Konya Psikolog Bul 2026 — 50+ Doğrulanmış Uzman | TerapiRehberi",
  description:
    "Konya'da lisanslı psikolog ve terapist bul. Meram, Selçuklu, Karatay'dan 50+ doğrulanmış uzman. Bireysel terapi, çocuk psikolojisi, aile terapisi, EMDR. Yüz yüze ve online seans.",
  keywords: ["konya psikolog", "konya terapist bul", "konya psikolog listesi 2026", "meram psikolog", "selçuklu psikolog", "karatay psikolog"],
  alternates: { canonical: "https://www.terapirehberi.com/konya/psikologlar" },
  openGraph: {
    title: "Konya Psikolog Bul 2026 — 50+ Doğrulanmış Uzman",
    description: "Konya'da lisanslı psikolog ve terapist bul. 50+ doğrulanmış uzman, yüz yüze ve online seans.",
    url: "https://www.terapirehberi.com/konya/psikologlar",
  },
};

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

const DISTRICT_ORDER = ["Meram", "Selçuklu", "Karatay", "Ereğli"];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://www.terapirehberi.com" },
    { "@type": "ListItem", position: 2, name: "Konya", item: "https://www.terapirehberi.com/konya" },
    { "@type": "ListItem", position: 3, name: "Psikologlar", item: "https://www.terapirehberi.com/konya/psikologlar" },
  ],
};

export default function KonyaPsikologlarPage() {
  const experts = getExpertsByCity("konya");

  // İlçeye göre grupla
  const byDistrict: Record<string, typeof experts> = {};
  for (const e of experts) {
    if (!byDistrict[e.district]) byDistrict[e.district] = [];
    byDistrict[e.district].push(e);
  }

  const districts = [
    ...DISTRICT_ORDER.filter((d) => byDistrict[d]),
    ...Object.keys(byDistrict).filter((d) => !DISTRICT_ORDER.includes(d)),
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Konya Psikolog Listesi",
    url: "https://www.terapirehberi.com/konya/psikologlar",
    numberOfItems: experts.length,
    itemListElement: experts.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      url: `https://www.terapirehberi.com/uzman/${e.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Başlık */}
      <div className="bg-white border-b border-cream-200 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-xs text-slate-400 mb-4 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-600 transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/konya" className="hover:text-brand-600 transition-colors">Konya</Link>
            <span>/</span>
            <span className="text-brand-600 font-medium">Psikologlar</span>
          </nav>
          <h1 className="text-3xl font-bold text-brand-900 mb-2">Konya Psikolog Listesi</h1>
          <p className="text-slate-500 text-sm">
            Konya&apos;da hizmet veren <strong className="text-slate-700">{experts.length} uzman</strong> listeleniyor.
            Meram, Selçuklu, Karatay ve ilçelerden psikolog, klinik psikolog ve psikolojik danışmanlar.
          </p>
        </div>
      </div>

      {/* İlçe bazlı listeler */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {districts.map((district) => (
          <div key={district}>
            <h2 className="text-base font-bold text-brand-900 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {district}
              <span className="text-xs font-normal text-slate-400">({byDistrict[district].length} uzman)</span>
            </h2>
            <div className="divide-y divide-cream-200 bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-sm">
              {byDistrict[district].map((expert) => (
                <Link
                  key={expert.slug}
                  href={`/uzman/${expert.slug}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 hover:bg-cream-50 transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand-900 text-sm hover:text-brand-700 transition-colors">{expert.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{expert.title}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {expert.services.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full border border-brand-100"
                        >
                          {SERVICE_LABELS[s] ?? s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {expert.sessionFee && (
                      <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg whitespace-nowrap">
                        {expert.sessionFee}
                      </span>
                    )}
                    <div className="flex flex-col items-end gap-0.5">
                      {expert.sessionType.map((t) => (
                        <span key={t} className="text-xs text-slate-400 whitespace-nowrap">{t}</span>
                      ))}
                    </div>
                    <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Sizi de ekleyelim */}
        <div className="rounded-2xl bg-brand-900 px-7 py-8 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-300 mb-2">
            Konya&apos;da Pratik Yapıyor musunuz?
          </p>
          <h2 className="text-xl font-bold text-white mb-2">Sizi de Listeye Ekleyelim</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-lg">
            Konya&apos;da hizmet veren psikolog ve terapistlerin tümünü bu rehberde toplamayı hedefliyoruz.
            İlk 3 ay ücretsiz profil oluşturun, Konya&apos;da sizi arayan ailelere ulaşın.
          </p>
          <Link
            href="/uzman-ol"
            className="inline-flex items-center gap-2 bg-white text-brand-900 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-cream-100 transition-colors"
          >
            Ücretsiz Profil Oluştur
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </Link>
        </div>

        {/* Kaldırma notu */}
        <p className="text-center text-xs text-slate-400 leading-relaxed">
          Bilgilerinizin bu listede yer almasını istemiyorsanız{" "}
          <Link href="/iletisim" className="underline hover:text-brand-600 transition-colors">
            bize ulaşın
          </Link>
          {" "}— herhangi bir gerekçe beklemeksizin kaldırırız.
        </p>
      </div>

    </div>
  );
}
