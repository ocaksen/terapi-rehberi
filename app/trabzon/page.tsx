import type { Metadata } from "next";
import Link from "next/link";
import { getProfessionalsByCityAndProfession } from "@/lib/data";
import ExpertCard from "@/components/ExpertCard";

export const metadata: Metadata = {
  title: "Trabzon Psikolog Rehberi 2026 — Lisanslı Uzman Terapistler",
  description:
    "Trabzon psikolog rehberi: bireysel terapi, çift terapisi, çocuk psikolojisi. Yüz yüze ve online seans seçenekleri, güncel fiyatlar ve uzman seçim rehberi.",
  keywords: ["trabzon psikolog", "psikolog trabzon", "trabzon terapist", "trabzon çocuk psikolog", "trabzon online terapi"],
  alternates: { canonical: "https://www.terapirehberi.com/trabzon" },
  openGraph: {
    title: "Trabzon Psikolog Rehberi 2026 — Lisanslı Uzman Terapistler",
    description: "Trabzon'da doğrulanmış psikolog ve terapist bul. Yüz yüze ve online seans.",
    url: "https://www.terapirehberi.com/trabzon",
  },
};

const BASE = "https://www.terapirehberi.com";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Trabzon'da psikolog seans ücreti ne kadar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "2026 yılında Trabzon'da bireysel terapi seansı ortalama 1.200-3.000 TL arasında değişiyor. Ücret; terapistin unvanı, uzmanlık alanı ve seans süresine göre belirleniyor. Online seans seçeneği genellikle yüzde 10-20 daha uygun fiyatlı.",
      },
    },
    {
      "@type": "Question",
      name: "Trabzon'da klinik psikolog ile danışman farkı nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Klinik psikolog, yüksek lisans ve süpervizyon saatleriyle klinik tanı ve psikoterapi yapabilir. Psikolojik danışman ise rehberlik lisansı mezunu olup kişisel gelişim ve uyum sorunlarında destek sunar. Klinik düzeyde sorunlar için klinik psikolog tercih edilmeli.",
      },
    },
    {
      "@type": "Question",
      name: "Trabzon'da online psikolog seansı mümkün mü?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. Trabzon'daki psikologlara ek olarak Türkiye genelindeki lisanslı psikologlar online seans sunuyor. Online terapi, yüz yüze terapi kadar etkili — ancak ciddi klinik değerlendirme gerektiren durumlarda yüz yüze başlanması önerilir.",
      },
    },
    {
      "@type": "Question",
      name: "Trabzon'da çocuk psikoloğuna nasıl başvurulur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trabzon'daki çocuk ve ergen psikolojisi uzmanlarına doğrudan randevu alabilirsiniz; sevk gerekmez. İlk seansta uzman değerlendirme yaparak uygun terapi planını paylaşır.",
      },
    },
  ],
};

const ILCELER = [
  { label: "Akçaabat Psikolog", href: "/trabzon/akcaabat" },
  { label: "Ortahisar Psikolog", href: "/trabzon/ortahisar" },
  { label: "Araklı Psikolog", href: "/trabzon/arakli" },
  { label: "Of Psikolog", href: "/trabzon/of" },
  { label: "Yomra Psikolog", href: "/trabzon/yomra" },
  { label: "Çarşıbaşı Psikolog", href: "/trabzon/carsibasi" },
  { label: "Sürmene Psikolog", href: "/trabzon/surmene" },
  { label: "Beşikdüzü Psikolog", href: "/trabzon/besikduzu" },
];


const BLOG_POSTS = [
  {
    href: "/blog/trabzon-psikolog-nasil-secilir",
    title: "Trabzon'da Psikolog Nasıl Seçilir? 7 Kritik Soru",
    desc: "Unvan farkı, seans ücreti ve doğru uzmana ulaşma rehberi.",
    date: "26 Nisan 2026",
  },
  {
    href: "/blog/trabzon-psikolog-fiyatlari-2026",
    title: "Trabzon Psikolog Fiyatları 2026 — Güncel Seans Ücretleri",
    desc: "Bireysel, çift ve çocuk terapisi ücretleri, SGK ve online seans bilgileri.",
    date: "26 Nisan 2026",
  },
];

export default function TrabzonPage() {
  const psikologlar = getProfessionalsByCityAndProfession("trabzon", "psikolog");

  const citySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Trabzon Psikolog Listesi",
    description: "Trabzon'da lisanslı ve diploma doğrulamalı psikolog ve terapistler.",
    url: `${BASE}/trabzon`,
    numberOfItems: psikologlar.length,
    itemListElement: psikologlar.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      url: `${BASE}/uzman/${e.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            <span className="text-white font-medium">Trabzon</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-2">
                Türkiye · Karadeniz
              </p>
              <h1 className="text-4xl font-black text-white mb-3 leading-tight">
                Trabzon<br />
                <span className="text-brand-300">Psikologları</span>
              </h1>
              <p className="text-brand-200 text-sm max-w-md leading-relaxed">
                Trabzon&apos;un güvenilir psikolog ve terapist rehberi. Bireysel terapi, çift terapisi,
                çocuk psikolojisi — yüz yüze ve online seans seçenekleriyle yanınızdayız.
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-white/10">
                <p className="text-2xl font-black text-white">{psikologlar.length}</p>
                <p className="text-brand-300 text-xs mt-0.5">Uzman</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-white/10">
                <p className="text-2xl font-black text-white">8</p>
                <p className="text-brand-300 text-xs mt-0.5">İlçe</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bilgi kartları */}
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Uzman listesi */}
        {psikologlar.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-black text-brand-900 mb-4">Trabzon Psikologları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {psikologlar.map((expert) => (
                <ExpertCard key={expert.slug} expert={expert} />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border border-cream-200 rounded-2xl p-5">
            <p className="text-xs font-bold text-brand-500 uppercase tracking-wide mb-1">Bireysel Terapi</p>
            <p className="text-2xl font-black text-brand-900">1.200 – 3.000 TL</p>
            <p className="text-xs text-brand-400 mt-1">50 dk seans, 2026</p>
          </div>
          <div className="bg-white border border-cream-200 rounded-2xl p-5">
            <p className="text-xs font-bold text-brand-500 uppercase tracking-wide mb-1">Online Seans</p>
            <p className="text-2xl font-black text-brand-900">1.000 – 2.500 TL</p>
            <p className="text-xs text-brand-400 mt-1">50 dk, şehir fark etmez</p>
          </div>
          <div className="bg-white border border-cream-200 rounded-2xl p-5">
            <p className="text-xs font-bold text-brand-500 uppercase tracking-wide mb-1">Çift Terapisi</p>
            <p className="text-2xl font-black text-brand-900">1.800 – 3.500 TL</p>
            <p className="text-xs text-brand-400 mt-1">75 dk seans, 2026</p>
          </div>
        </div>

        {/* Rehber içerik */}
        <div className="bg-white border border-cream-200 rounded-3xl p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-black text-brand-900 mb-4">Trabzon&apos;da Psikolog Nasıl Bulunur?</h2>
          <div className="space-y-3 text-sm text-brand-700 leading-relaxed">
            <p>
              Trabzon&apos;da psikolojik destek almak isteyen birçok kişi doğru uzmana ulaşmakta güçlük çekiyor.
              Şehirde lisanslı psikologlar ve klinik psikologlar hizmet vermekte; hem yüz yüze hem online seans
              seçenekleri mevcut.
            </p>
            <p>
              <strong>Klinik psikolog mu, danışman mı?</strong> Depresyon, kaygı bozukluğu, travma veya OKB gibi
              klinik tablolar için klinik psikolog (yüksek lisans mezunu) tercih edilmeli. Kariyer kararı veya
              kişisel gelişim için psikolojik danışman da yeterli olabilir.
            </p>
            <p>
              <strong>Online seans avantajı:</strong> Trabzon&apos;un farklı ilçelerinde yaşıyorsanız ya da
              ulaşım zahmetliyse online seans pratik bir seçenek. Yüz yüze terapiyle karşılaştırıldığında
              etkinlik açısından büyük bir fark bulunmuyor; fiyat ise genellikle %10-20 daha düşük.
            </p>
          </div>
          <div className="mt-5">
            <Link
              href="/blog/trabzon-psikolog-nasil-secilir"
              className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-brand-700 transition-colors"
            >
              Uzman Seçim Rehberini Oku →
            </Link>
          </div>
        </div>

        {/* Blog yazıları */}
        <div className="mb-10">
          <h2 className="text-lg font-black text-brand-900 mb-4">Trabzon Psikolog Rehberleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group bg-white border border-cream-200 rounded-2xl p-5 hover:border-brand-300 hover:shadow-sm transition-all"
              >
                <p className="text-xs text-brand-400 mb-2">{post.date}</p>
                <p className="font-bold text-brand-900 group-hover:text-brand-600 transition-colors mb-1 text-sm leading-snug">
                  {post.title}
                </p>
                <p className="text-xs text-brand-500">{post.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-brand-50 border border-brand-100 rounded-3xl p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-black text-brand-900 mb-5">Sık Sorulan Sorular</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="group">
                <summary className="cursor-pointer text-sm font-semibold text-brand-800 list-none flex items-center justify-between gap-3">
                  {faq.name}
                  <span className="text-brand-400 group-open:rotate-180 transition-transform shrink-0">▾</span>
                </summary>
                <p className="mt-2 text-sm text-brand-600 leading-relaxed pl-1">
                  {faq.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* İlçeler */}
        <div className="border-t border-cream-200 pt-8 mb-6">
          <p className="font-semibold text-brand-900 mb-3 text-sm">İlçeye Göre Psikolog</p>
          <div className="flex flex-wrap gap-2">
            {ILCELER.map((item) => (
              <span
                key={item.href}
                className="flex items-center gap-1.5 bg-white border border-cream-200 text-brand-500 text-sm px-4 py-2 rounded-full cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Diğer şehirler */}
        <div className="border-t border-cream-200 pt-8">
          <p className="font-semibold text-brand-900 mb-3 text-sm">Diğer Şehirler</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/konya"
              className="bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-brand-100 transition-colors"
            >
              Konya Psikolog →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
