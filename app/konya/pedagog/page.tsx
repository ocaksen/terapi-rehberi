import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Konya'da Pedagog — Çocuğunuz İçin Eğitim Desteği | TerapiRehberi",
  description:
    "Konya'da pedagog arıyorsanız doğru yerdesiniz. Öğrenme güçlüğü, okul reddi, dikkat dağınıklığı ve okul olgunluğu için uzman pedagog desteği. Hemen inceleyin.",
  keywords: [
    "konya pedagog",
    "pedagog konya",
    "konya öğrenme güçlüğü",
    "konya okul olgunluğu",
    "konya dikkat dağınıklığı uzmanı",
    "konya çocuk eğitim desteği",
    "konya pedagojik destek",
  ],
  alternates: { canonical: "https://www.terapirehberi.com/konya/pedagog" },
  openGraph: {
    title: "Konya'da Pedagog — Çocuğunuz İçin Eğitim Desteği",
    description: "Öğrenme güçlüğü, okul reddi, dikkat dağınıklığı için Konya'da uzman pedagog desteği.",
    url: "https://www.terapirehberi.com/konya/pedagog",
  },
};

const faqItems = [
  {
    q: "Pedagog nedir, ne yapar?",
    a: "Pedagog; çocukların eğitim, gelişim ve öğrenme süreçlerini destekleyen uzman bir eğitim bilimleri profesyonelidir. Öğrenme güçlüğü, okul olgunluğu, dikkat dağınıklığı, okul reddi ve ders başarısızlığı gibi konularda değerlendirme ve destek sağlar.",
  },
  {
    q: "Pedagog ile psikolog arasındaki fark nedir?",
    a: "Psikolog ruh sağlığı ve duygusal sorunlara odaklanırken; pedagog çocuğun öğrenme, okul uyumu ve eğitimsel gelişimiyle ilgilenir. Öğrenme güçlüğü veya okul başarısızlığı için pedagog, kaygı veya davranış sorunu için psikolog daha uygun olabilir.",
  },
  {
    q: "Çocuğum hangi durumlarda pedagoga gitmelidir?",
    a: "Okul derslerinde sürekli başarısızlık, okuma-yazma güçlüğü (disleksi), dikkat dağınıklığı, okula gitme isteksizliği, yaşıtlarından belirgin gecikme veya okul olgunluğu değerlendirmesi gerektiğinde bir pedagoga başvurmalısınız.",
  },
  {
    q: "Konya'da pedagog nasıl bulunur?",
    a: "TerapiRehberi üzerinden Konya'daki pedagog uzmanlarını listeleyebilir, uzmanlık alanı ve ilçeye göre filtreleyebilirsiniz. Tüm uzmanlar kimlik ve belge doğrulamasından geçmiştir.",
  },
  {
    q: "Pedagog seansı ne kadar sürer, maliyeti nedir?",
    a: "Değerlendirme seansları genellikle 45-60 dakika sürer. Konya'da pedagog seans ücreti ortalama 500-1000 TL aralığında değişmektedir; uzmana ve seans türüne göre farklılık gösterebilir.",
  },
];

const hizmetler = [
  {
    icon: "📚",
    title: "Öğrenme Güçlüğü Değerlendirmesi",
    desc: "Disleksi, diskalkuli veya diğer öğrenme güçlüklerinin erken tespiti ve destek planı.",
  },
  {
    icon: "🎓",
    title: "Okul Olgunluğu Testi",
    desc: "Çocuğunuzun ilkokula hazır olup olmadığını ölçen standart değerlendirme.",
  },
  {
    icon: "🧠",
    title: "Dikkat ve Konsantrasyon Desteği",
    desc: "Dikkat dağınıklığı, hiperaktivite ve impulsivite için yapılandırılmış destek programları.",
  },
  {
    icon: "🏫",
    title: "Okul Reddi & Uyum",
    desc: "Okula gitme korkusu, okul kaygısı ve sosyal uyum problemleri için rehberlik.",
  },
  {
    icon: "✏️",
    title: "Okuma-Yazma Desteği",
    desc: "Okuma hızı, yazma becerisi ve anlama güçlükleri için bireyselleştirilmiş destek.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Aileye Danışmanlık",
    desc: "Evde çocukla nasıl çalışılacağı, ödev rutini ve motivasyon stratejileri üzerine rehberlik.",
  },
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
  name: "Pedagog Hizmeti",
  description: "Konya'da öğrenme güçlüğü, okul olgunluğu ve eğitimsel gelişim için uzman pedagog desteği.",
  areaServed: { "@type": "City", name: "Konya" },
  provider: { "@type": "Organization", name: "TerapiRehberi", url: "https://www.terapirehberi.com" },
};

export default function PedagogPage() {
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
            <span className="text-brand-600 font-medium">Pedagog</span>
          </nav>

          <p className="section-label mb-3">Konya</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-900 mb-4 leading-snug">
            Konya'da Pedagog Bul
          </h1>
          <p className="text-slate-600 text-base max-w-2xl leading-relaxed mb-6">
            Öğrenme güçlüğü, okul olgunluğu, dikkat dağınıklığı ve okul uyum sorunları için Konya'da uzman pedagog desteği. Çocuğunuzun eğitim yolculuğunu doğru temelden başlatın.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/uzman-ol"
              className="bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors text-center"
            >
              Pedagog Ol — Başvur
            </Link>
            <Link
              href="#hizmetler"
              className="border border-brand-200 text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors text-center"
            >
              Hizmetleri Gör
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

        {/* ── Pedagog Nedir ── */}
        <section className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-900 mb-4">Pedagog Nedir?</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Pedagog, çocukların ve ergenlerin eğitimsel gelişimini, öğrenme süreçlerini ve okul uyumunu destekleyen uzmandır. Psikoloji değil eğitim bilimleri alanında ihtisaslaşmıştır; bu nedenle ders başarısızlığı, okuma-yazma güçlüğü ve okul olgunluğu gibi konularda birincil başvuru kişisidir.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Konya'da bir pedagog; çocuğunuzu standart testlerle değerlendirir, öğrenme profilini belirler ve aileyle birlikte bir destek planı oluşturur. Gerektiğinde psikolog veya dil terapistiyle iş birliği yapar.
          </p>
        </section>

        {/* ── Hizmetler ── */}
        <section id="hizmetler">
          <h2 className="text-xl font-bold text-brand-900 mb-6">
            Pedagog Hangi Konularda Destek Verir?
          </h2>
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

        {/* ── Pedagog vs Psikolog ── */}
        <section className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-900 mb-5">Pedagog mu, Psikolog mu?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-brand-50 border border-brand-100 p-5">
              <p className="font-bold text-brand-800 text-sm mb-3">Pedagog — Tercih Edin</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {["Ders başarısızlığı", "Okuma-yazma güçlüğü (disleksi)", "Okul olgunluğu değerlendirmesi", "Dikkat dağınıklığı (akademik)", "Okul reddi / okul kaygısı"].map((m) => (
                  <li key={m} className="flex items-start gap-2">
                    <span className="text-brand-500 font-bold mt-0.5">✓</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-5">
              <p className="font-bold text-slate-700 text-sm mb-3">Psikolog — Tercih Edin</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {["Kaygı, depresyon, panik", "Travma ve EMDR ihtiyacı", "Ergen ruh sağlığı sorunları", "Aile içi çatışmalar", "Uyku ve yeme bozuklukları"].map((m) => (
                  <li key={m} className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold mt-0.5">✓</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            Emin değilseniz, önce uzman görüşü alın — pedagog ve psikolog birlikte de çalışabilir.
          </p>
        </section>

        {/* ── Konya İlçeleri ── */}
        <section>
          <h2 className="text-xl font-bold text-brand-900 mb-4">Konya'nın Her İlçesinde</h2>
          <div className="flex flex-wrap gap-2">
            {["Selçuklu", "Meram", "Karatay", "Çumra", "Ereğli", "Akşehir", "Beyşehir", "Kulu"].map((ilce) => (
              <span key={ilce} className="bg-white border border-cream-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-medium shadow-sm">
                {ilce}
              </span>
            ))}
          </div>
        </section>

        {/* ── İlgili Uzmanlar ── */}
        <section className="bg-brand-50 border border-brand-100 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-900 mb-3">
            Çocuğunuzun Yanında Başka Uzman da Gerekebilir
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            Öğrenme güçlüğüne eşlik eden konuşma gecikmesi, dikkat sorunu veya duygusal zorluklar için pedagog; dil terapisti ve psikologla birlikte çalışabilir.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/konya/dil-terapisti"
              className="bg-white border border-brand-200 text-brand-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-colors text-sm text-center"
            >
              Konya Dil Terapistleri →
            </Link>
            <Link
              href="/konya/psikologlar"
              className="bg-white border border-brand-200 text-brand-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-colors text-sm text-center"
            >
              Konya Psikologları →
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
          <h2 className="font-bold text-lg mb-2">Konya'da Pedagog Arıyorsunuz?</h2>
          <p className="text-brand-200 text-sm mb-4">
            Uzman pedagog listesini inceleyin veya doğrudan randevu alın.
          </p>
          <Link
            href="/uzman-ol"
            className="bg-white text-brand-700 font-bold px-6 py-3 rounded-xl hover:bg-cream-100 transition-colors inline-block"
          >
            Pedagog Ol — Başvur →
          </Link>
        </section>

      </div>
    </div>
  );
}
