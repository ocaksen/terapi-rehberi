import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Konya'da Dil ve Konuşma Terapisti Bul — 2026 Rehberi | TerapiRehberi",
  description:
    "Konya'da dil ve konuşma terapisti arıyorsanız doğru yerdesiniz. Çocuklarda konuşma gecikmesi, kekemelik, artikülasyon ve ses terapisi için uzman rehberi. Hemen inceleyin.",
  keywords: [
    "konya dil terapisti",
    "konya konuşma terapisti",
    "konya dil ve konuşma terapisti",
    "çocuk konuşma gecikmesi konya",
    "kekemelik terapisi konya",
    "konya artikülasyon terapisi",
  ],
  alternates: { canonical: "https://www.terapirehberi.com/konya/dil-terapisti" },
  openGraph: {
    title: "Konya'da Dil ve Konuşma Terapisti Bul — 2026 Rehberi",
    description: "Konya'da çocuğunuz için dil ve konuşma terapisti arayanlar için kapsamlı uzman rehberi.",
    url: "https://www.terapirehberi.com/konya/dil-terapisti",
  },
};

const faqItems = [
  {
    q: "Konya'da dil ve konuşma terapisti nasıl bulunur?",
    a: "TerapiRehberi üzerinden Konya'daki lisanslı dil ve konuşma terapistlerini ilçeye ve uzmanlık alanına göre filtreleyebilirsiniz. Selçuklu, Meram ve Karatay'da en fazla uzman bulunmaktadır.",
  },
  {
    q: "Dil terapistine ne zaman gitmeliyim?",
    a: "Çocuğunuz 18 ayda anlamlı kelimeler söylemiyorsa, 2 yaşında 50'den az kelime kullanıyorsa, 3 yaşında cümle kuramıyorsa ya da belirli sesleri (R, S, Ş) yaşına göre hatalı üretiyorsa bir dil ve konuşma terapistine başvurmanız önerilir.",
  },
  {
    q: "Dil terapisi ile konuşma terapisi aynı şey mi?",
    a: "Evet. 'Dil terapisi' ve 'konuşma terapisi' Türkiye'de aynı meslek için kullanılan eş anlamlı terimlerdir. Uzmanın resmi unvanı 'Dil ve Konuşma Terapisti'dir.",
  },
  {
    q: "Konya'da dil terapisi seans ücreti ne kadar?",
    a: "2026 yılı itibarıyla Konya'da dil ve konuşma terapisi seans ücretleri 700–1.800 TL arasında değişmektedir. İlk değerlendirme seansı genellikle 1.000–2.200 TL arasındadır.",
  },
  {
    q: "Çocuğum dil terapisine gitmek istemiyorsa ne yapmalıyım?",
    a: "Çocuk dostu dil terapistleri seansı oyun temelli yürütür; oyuncak ve aktivitelerle çocuğun direncini azaltırlar. İlk seanste acele etmeyin — terapist ve çocuğun birbirini tanıması zaman alabilir.",
  },
];

const hizmetler = [
  { icon: "🗣️", title: "Konuşma Gecikmesi", desc: "Yaşına göre az veya geç konuşan çocuklarda erken müdahale ve dil uyarımı programları." },
  { icon: "🌀", title: "Kekemelik Terapisi", desc: "Akıcılık şekillendirme, kekemelik yönetimi ve Lidcombe programı ile kanıta dayalı tedavi." },
  { icon: "🔤", title: "Artikülasyon Bozukluğu", desc: "R, S, Ş, K, L seslerinin yaşa uygun doğru üretimini destekleyen bireysel terapi." },
  { icon: "🎵", title: "Ses Terapisi", desc: "Kronik ses kısıklığı, vokal nodül ve mesleki ses sorunları için ses hijyeni ve terapi." },
  { icon: "🧩", title: "Dil Gelişim Geriliği", desc: "Sözcük dağarcığı, cümle yapısı ve dil anlama becerilerini güçlendiren kapsamlı program." },
  { icon: "🌟", title: "OSB Dil Desteği", desc: "Otizm spektrum bozukluğunda sözel ve sözel olmayan iletişim becerilerini artıran PECS ve AAC yöntemleri." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Dil ve Konuşma Terapisti Rehberi",
  description: "Konya'da lisanslı dil ve konuşma terapistlerini bulun. Konuşma gecikmesi, kekemelik, artikülasyon ve ses terapisi.",
  areaServed: { "@type": "City", name: "Konya" },
  provider: { "@type": "Organization", name: "TerapiRehberi", url: "https://www.terapirehberi.com" },
};

const ILCELER = [
  { ad: "Selçuklu", desc: "En fazla uzman", href: "/konya/selcuklu" },
  { ad: "Meram", desc: "Köklü klinikler", href: "/konya/meram" },
  { ad: "Karatay", desc: "OSB deneyimi", href: "/konya/karatay" },
  { ad: "Ereğli", desc: "Doğu Konya", href: "/konya/psikologlar" },
  { ad: "Akşehir", desc: "Batı Konya", href: "/konya/psikologlar" },
  { ad: "Beyşehir", desc: "Göller bölgesi", href: "/konya/psikologlar" },
];

export default function KonyaDilTerapistiPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── Breadcrumb + Hero ── */}
      <div className="bg-white border-b border-cream-200 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-brand-600 transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/konya" className="hover:text-brand-600 transition-colors">Konya</Link>
            <span>/</span>
            <span className="text-brand-600 font-medium">Dil Terapisti</span>
          </nav>

          <p className="section-label mb-3">Konya</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-900 mb-4 leading-snug">
            Konya&apos;da Dil ve Konuşma Terapisti Bul
          </h1>
          <p className="text-slate-600 text-base max-w-2xl leading-relaxed mb-6">
            Çocuğunuzda konuşma gecikmesi, kekemelik veya artikülasyon sorunu mu var? Konya&apos;daki lisanslı dil ve konuşma terapistlerini ilçeye ve uzmanlığa göre filtreleyin.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/uzman-ol"
              className="bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors text-center"
            >
              Dil Terapisti Ol — Başvur
            </Link>
            <Link
              href="#ilceler"
              className="border border-brand-200 text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors text-center"
            >
              İlçe Bazlı Uzmanlar
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

        {/* ── Hizmetler ── */}
        <section>
          <h2 className="text-xl font-bold text-brand-900 mb-6">Dil Terapisti Hangi Konularda Destek Verir?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hizmetler.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl border border-cream-200 shadow-sm p-5 flex gap-4">
                <div className="text-2xl shrink-0 mt-0.5">{h.icon}</div>
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm mb-1">{h.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── İlçe Rehberi ── */}
        <section id="ilceler">
          <h2 className="text-xl font-bold text-brand-900 mb-6">Konya İlçelerine Göre Dil Terapisti</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ILCELER.map((ilce) => (
              <Link
                key={ilce.ad}
                href={ilce.href}
                className="bg-white rounded-2xl border border-cream-200 shadow-sm p-4 hover:border-brand-300 hover:bg-brand-50 transition-all"
              >
                <p className="font-bold text-sm text-brand-900">{ilce.ad}</p>
                <p className="text-xs text-slate-500 mt-0.5">{ilce.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Ne Zaman Git ── */}
        <section className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-900 mb-5">Dil Terapistine Ne Zaman Gitmelisiniz?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "18 ayda anlamlı kelimeler söylemiyorsa",
              "2 yaşında 50'den az kelime kullanıyorsa",
              "3 yaşında cümle kuramıyorsa",
              "R, S, Ş seslerini yaşına göre hatalı üretiyorsa",
              "Konuşurken takılıyor, tekrarlıyor ya da donuyorsa",
              "Ses kısıklığı 2 haftayı aşıyorsa",
              "Otizm spektrumunda iletişim desteği gerekiyorsa",
              "Yetişkinde inme sonrası konuşma güçlüğü varsa",
            ].map((m) => (
              <div key={m} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-brand-500 font-bold shrink-0 mt-0.5">✓</span>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── İlgili Sayfalar ── */}
        <section className="bg-brand-50 border border-brand-100 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-900 mb-3">İlgili Uzman ve Sayfalar</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            Çocuğunuzun durumuna bağlı olarak dil terapisti yanında pedagog veya psikolog da gerekebilir.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/konya/pedagog" className="bg-white border border-brand-200 text-brand-700 font-semibold px-4 py-3 rounded-xl hover:bg-brand-50 transition-colors text-sm text-center">
              Konya Pedagog →
            </Link>
            <Link href="/konya/psikologlar" className="bg-white border border-brand-200 text-brand-700 font-semibold px-4 py-3 rounded-xl hover:bg-brand-50 transition-colors text-sm text-center">
              Konya Psikologları →
            </Link>
            <Link href="/blog/konya-dil-terapisti-ne-zaman" className="bg-white border border-brand-200 text-brand-700 font-semibold px-4 py-3 rounded-xl hover:bg-brand-50 transition-colors text-sm text-center">
              Terapiste Ne Zaman Gidilir? →
            </Link>
          </div>
        </section>

        {/* ── SSS ── */}
        <section>
          <h2 className="text-xl font-bold text-brand-900 mb-5">Sıkça Sorulan Sorular</h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-cream-200 shadow-sm p-5">
                <h3 className="font-semibold text-brand-900 text-sm mb-2">{item.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-brand-700 rounded-2xl p-6 text-white text-center">
          <h2 className="font-bold text-lg mb-2">Konya&apos;da Dil Terapisti mi Arıyorsunuz?</h2>
          <p className="text-brand-200 text-sm mb-4">
            Uzman listesini inceleyin veya randevu alın — doğrulanmış, lisanslı terapistler.
          </p>
          <Link
            href="/uzman-ol"
            className="bg-white text-brand-700 font-bold px-6 py-3 rounded-xl hover:bg-cream-100 transition-colors inline-block"
          >
            Başvuru Formu →
          </Link>
        </section>

      </div>
    </div>
  );
}
