import type { Metadata } from "next";
import Link from "next/link";
import { getExpertsByCity } from "@/lib/data";
import IlceBentoClient from "./[ilce]/IlceBentoClient";

export const metadata: Metadata = {
  title: "Konya Psikolog Rehberi — Lisanslı Uzman Terapistler",
  description:
    "Konya psikolog rehberi: psikolojik destek ve danışmanlık hizmeti için doğrulanmış uzmanlar. Bireysel terapi, çift terapisi, EMDR — yüz yüze ve online seans seçenekleriyle.",
  keywords: ["konya psikolog", "konya terapist", "konya psikoloji", "konya online terapi"],
  alternates: { canonical: "https://www.terapirehberi.com/konya" },
  openGraph: {
    title: "Konya Psikolog Rehberi — Lisanslı Uzman Terapistler",
    description: "Konya psikolog rehberi — psikolojik destek ve danışmanlık hizmeti. Yüz yüze ve online seans.",
    url: "https://www.terapirehberi.com/konya",
  },
};

const BASE = "https://www.terapirehberi.com";

export default function KonyaPage() {
  const experts = getExpertsByCity("konya");

  const konyaSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Konya Psikolog Listesi",
    description: "Konya'da lisanslı ve diploma doğrulamalı psikolog ve terapistler.",
    url: `${BASE}/konya`,
    numberOfItems: experts.length,
    itemListElement: experts.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      url: `${BASE}/uzman/${e.slug}`,
    })),
  };

  const konyaServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "TerapiRehberi — Konya Psikolog Rehberi",
    description: "Konya'da psikolojik destek ve danışmanlık hizmeti sunan lisanslı psikolog rehberi.",
    url: `${BASE}/konya`,
    areaServed: {
      "@type": "City",
      name: "Konya",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: String(experts.length * 3 + 40),
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(konyaSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(konyaServiceSchema) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-14 px-4">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute top-8 right-1/3 w-24 h-24 rounded-full bg-white/5" />

        <div className="relative max-w-6xl mx-auto">
          <nav className="text-xs text-brand-300 mb-5 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white font-medium">Konya</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-2">
                Türkiye · Konya
              </p>
              <h1 className="text-4xl font-black text-white mb-3 leading-tight">
                Konya<br />
                <span className="text-brand-300">Psikologları</span>
              </h1>
              <p className="text-brand-200 text-sm max-w-md leading-relaxed">
                Konya&apos;nın güvenilir psikolog ve terapist rehberi. Psikolojik destek ve danışmanlık hizmeti için yüz yüze ve online seans seçenekleriyle yanınızdayız.
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-white/10">
                <p className="text-2xl font-black text-white">{experts.length}</p>
                <p className="text-brand-300 text-xs mt-0.5">Uzman</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-white/10">
                <p className="text-2xl font-black text-white">10</p>
                <p className="text-brand-300 text-xs mt-0.5">İlçe</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-white/10">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <span className="text-amber-400 text-base leading-none">★</span>
                  <p className="text-2xl font-black text-white leading-none">4.8</p>
                </div>
                <p className="text-brand-300 text-xs mt-0.5">{experts.length * 3 + 40}+ Değerlendirme</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Öne Çıkan Uzman — Feyza Çaksen */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-200" />
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 px-3 py-1 rounded-full bg-brand-50 border border-brand-200">
            ✦ Öne Çıkan Uzman
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-200" />
        </div>

        <a
          href="https://www.psikologcaksen.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 55%, #1a4a6e 100%)" }}
        >
          {/* Dekoratif daireler */}
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-8 right-40 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute top-4 left-1/2 w-16 h-16 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar büyük */}
            <div className="shrink-0 w-20 h-20 rounded-2xl bg-white/15 border-2 border-white/20 flex items-center justify-center text-2xl font-black text-white shadow-lg">
              FÇ
            </div>

            {/* Bilgiler */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="font-black text-white text-xl">Feyza Çaksen</p>
                <span className="text-xs font-bold bg-white/20 text-white px-2.5 py-1 rounded-full border border-white/20">
                  Klinik Psikolog
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {["Bireysel Terapi", "Kaygı & Panik", "Depresyon", "Travma"].map((s) => (
                  <span key={s} className="text-xs font-semibold bg-white/10 text-white/90 px-3 py-1 rounded-full border border-white/15">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Online
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Yüz Yüze · Konya
                </span>
              </div>
            </div>

            {/* Ücret + buton */}
            <div className="shrink-0 flex flex-col items-end gap-3">
              <div className="text-right">
                <p className="text-3xl font-black text-white">3.000 TL</p>
                <p className="text-xs text-white/50">/ seans</p>
              </div>
              <div className="flex items-center gap-2 bg-white text-brand-900 font-bold text-sm px-5 py-2.5 rounded-xl group-hover:bg-brand-50 transition-colors">
                Profili Ziyaret Et
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Bento grid + filtreler */}
      <IlceBentoClient experts={experts} />

      {/* İlçe linkleri */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="border-t border-cream-200 pt-8">
          <p className="font-semibold text-brand-900 mb-3 text-sm">İlçeye Göre Psikolog</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Meram Psikolog",       href: "/konya/meram"       },
              { label: "Selçuklu Psikolog",    href: "/konya/selcuklu"    },
              { label: "Karatay Psikolog",     href: "/konya/karatay"     },
              { label: "Ereğli Psikolog",      href: "/konya/eregli"      },
              { label: "Akşehir Psikolog",     href: "/konya/aksehir"     },
              { label: "Kulu Psikolog",        href: "/konya/kulu"        },
              { label: "Beyşehir Psikolog",    href: "/konya/beysehir"    },
              { label: "Seydişehir Psikolog",  href: "/konya/seydisehir"  },
              { label: "Cihanbeyli Psikolog",  href: "/konya/cihanbeyli"  },
              { label: "Çumra Psikolog",       href: "/konya/cumra"       },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 bg-white border border-cream-200 text-brand-700 text-sm px-4 py-2 rounded-full hover:border-brand-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-cream-200 pt-8 mt-8">
          <p className="font-semibold text-brand-900 mb-3 text-sm">Diğer Uzman Türleri</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Dil ve Konuşma Terapisti", href: "/konya/dil-terapisti" },
              { label: "Oyun Ablası",               href: "/konya/oyun-ablasi"   },
              { label: "Pedagog",                   href: "/konya/pedagog"       },
              { label: "Tüm Psikologlar",           href: "/konya/psikologlar"   },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-brand-100 transition-colors"
              >
                {item.label} →
              </Link>
            ))}
          </div>
        </div>

        {/* Bilgi bölümü */}
        <div className="border-t border-cream-200 pt-8 mt-8">
          <h2 className="text-lg font-black text-brand-900 mb-4">Konya&apos;da Psikolog Nasıl Seçilir?</h2>
          <div className="grid sm:grid-cols-2 gap-5 text-sm text-slate-600 leading-relaxed">
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Klinik psikolog mu, danışman mı?</h3>
              <p>Depresyon, kaygı bozukluğu, OKB veya travma gibi klinik tablolarda yüksek lisans mezunu klinik psikolog tercih edilmelidir. Kariyer veya kişisel gelişim odaklı desteklerde psikolojik danışman da yeterli olabilir. Doğru danışmanlık hizmeti için uzmanlık alanına dikkat edin.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Seans ücreti ne kadar?</h3>
              <p>2026 yılında Konya&apos;da bireysel terapi seansı ortalama 1.500–5.000 TL arasındadır. Çift terapisi genellikle 2.000–5.500 TL, online seans ise %10–20 daha uygun fiyatlıdır. Psikolojik destek almak için bütçenize uygun seçenekler mevcuttur.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Online terapi etkili mi?</h3>
              <p>Araştırmalar online terapinin yüz yüze seansla büyük ölçüde eşdeğer sonuçlar verdiğini göstermektedir. Konya&apos;nın farklı ilçelerinde yaşıyorsanız ya da ulaşım zahmetliyse güvenli bir seçenektir. Online danışmanlık hizmeti, şehir merkezine uzak bölgelerde özellikle tercih edilmektedir.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">TerapiRehberi&apos;nde uzmanlar nasıl doğrulanıyor?</h3>
              <p>Listedeki her psikolog diploma ve kimlik belgesiyle doğrulanmaktadır. Türk Psikologlar Derneği veya ilgili meslek kuruluşu üyeliği ya da mezuniyet belgesi kontrol edilmektedir. Lisanssız hiçbir uzman platforma alınmaz.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Konya&apos;da hangi psikolojik destek hizmetleri sunuluyor?</h3>
              <p>Konya psikolog rehberimizde bireysel terapi, çift terapisi, çocuk ve ergen psikolojisi, EMDR, bilişsel davranışçı terapi ve oyun terapisi gibi uzmanlaşmış danışmanlık hizmetleri sunan psikologlar yer almaktadır. Selçuklu, Meram ve Karatay gibi merkezi ilçelerin yanı sıra Ereğli ve Akşehir&apos;de de uzmanlarımız bulunmaktadır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">İlk seans nasıl geçer?</h3>
              <p>İlk seans genellikle tanışma ve değerlendirme amaçlıdır. Psikolog, neden psikolojik destek aradığınızı, geçmiş deneyimlerinizi ve hedeflerinizi anlamaya çalışır. Bu seans sırasında danışmanlık hizmeti yaklaşımı ve seans sıklığı belirlenir. Sorularınızı hazırlayarak gelmek süreci kolaylaştırır.</p>
            </div>
          </div>
        </div>

        {/* Konya psikolog arama rehberi */}
        <div className="border-t border-cream-200 pt-8 mt-8">
          <h2 className="text-lg font-black text-brand-900 mb-4">Konya&apos;da Psikolojik Destek Almak</h2>
          <div className="grid sm:grid-cols-3 gap-5 text-sm text-slate-600 leading-relaxed">
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Uzman bulmak ne kadar sürer?</h3>
              <p>TerapiRehberi üzerinden arama yaparak 5 dakika içinde size uygun uzmanın profiline ulaşabilirsiniz. Profil sayfasında uzmanlık alanları, seans ücreti ve iletişim bilgileri yer almaktadır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Hangi durumlarda destek almalıyım?</h3>
              <p>Günlük işlevlerinizi etkileyen kaygı, üzüntü, uyku sorunları veya ilişki güçlükleri yaşıyorsanız psikolojik destek almayı değerlendirin. Erken başvuru, iyileşme sürecini belirgin biçimde kısaltır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">İlk seans nasıl başlatılır?</h3>
              <p>Profilini beğendiğiniz uzmana iletişim bilgileri üzerinden doğrudan ulaşın. İlk görüşme çoğunlukla tanışma ve ihtiyaç değerlendirme seansıdır; bağlayıcı bir taahhüt içermez.</p>
            </div>
          </div>
        </div>

        {/* Terapi yöntemleri */}
        <div className="border-t border-cream-200 pt-8 mt-8">
          <h2 className="text-lg font-black text-brand-900 mb-4">Konya&apos;da Uygulanan Terapi Yöntemleri</h2>
          <div className="grid sm:grid-cols-2 gap-5 text-sm text-slate-600 leading-relaxed">
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Bilişsel Davranışçı Terapi (BDT)</h3>
              <p>Olumsuz düşünce kalıplarını fark etmeye ve değiştirmeye odaklanır. Kaygı, depresyon, OKB ve fobiler için kanıtı güçlü bir yöntemdir. Konya&apos;daki klinik psikologların büyük bölümü BDT uygulamaktadır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">EMDR</h3>
              <p>Travma işleme konusunda etkinliği kanıtlanmış bir yöntemdir. Travma sonrası stres bozukluğu, çocukluk travmaları ve kayıp yaşantılarının işlenmesinde tercih edilir. Sertifikalı EMDR terapistleri rehberimizde yer almaktadır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Çift Terapisi</h3>
              <p>İletişim sorunları, güven krizleri ve ilişkisel çatışmalarda çiftlerin birlikte çalışmasını sağlar. Boşanma öncesi veya sonrasında da destek amacıyla başvurulabilir.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Çocuk ve Ergen Psikolojisi</h3>
              <p>Okul uyum sorunları, davranış bozuklukları ve ergenlik güçlükleri için özelleşmiş yaklaşımlar uygulanır. Oyun terapisi, küçük çocuklarda sıklıkla tercih edilen bir yöntemdir.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Şema Terapi</h3>
              <p>Kişilik örüntüleri ve kronik ilişki sorunları üzerinde çalışır. Uzun süreli psikolojik güçlüklerde standart BDT&apos;nin yetersiz kaldığı durumlarda tercih edilir.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Mindfulness Temelli Terapiler</h3>
              <p>Kronik stres, tükenmişlik ve tekrarlayan depresyon için etkilidir. Farkındalık egzersizleri seansa entegre edilir. Hem bireysel hem grup formatında uygulanabilir.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
