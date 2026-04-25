import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Konya Oyun Ablası — Çocuğunuz İçin Güvenilir Bakım | TerapiRehberi",
  description:
    "Konya'da oyun ablası arıyorsanız doğru yerdesiniz. Çocuğunuzla ilgilenen, oyun oynayan, ödev yardımı yapan güvenilir oyun ablaları. Hemen başvur.",
  keywords: [
    "konya oyun ablası",
    "oyun ablası konya",
    "konya çocuk bakımı",
    "konya çocuk oyun evi",
    "konya gündüz çocuk bakımı",
    "konya ödev yardımı",
    "konya çocuk gelişim uzmanı",
  ],
  alternates: { canonical: "https://www.terapirehberi.com/konya/oyun-ablasi" },
  openGraph: {
    title: "Konya Oyun Ablası — Çocuğunuz İçin Güvenilir Bakım",
    description: "Konya'da çocuğunuzla ilgilenen, oyun oynayan, ödev yardımı yapan güvenilir oyun ablaları.",
    url: "https://www.terapirehberi.com/konya/oyun-ablasi",
  },
};

const faqItems = [
  {
    q: "Oyun ablası nedir, ne yapar?",
    a: "Oyun ablası; çocuğunuzla vakit geçiren, yaşına uygun oyunlar oynayan, ödev takibi yapan ve çocuk gelişimini destekleyen uzman bir bakım kişisidir. Kreş kadar resmi değil, basit bakıcıdan çok daha niteliklidir.",
  },
  {
    q: "Oyun ablası ile çocuk bakıcısı farkı nedir?",
    a: "Çocuk bakıcısı ağırlıklı olarak fiziksel bakımla (yemek, uyku, güvenlik) ilgilenirken; oyun ablası çocuğun zihinsel ve sosyal gelişimine odaklanır. Oyun oynamak, ödev yaptırmak, aktivite düzenlemek oyun ablasının temel işidir.",
  },
  {
    q: "Konya'da oyun ablası bulmak için ne yapmalıyım?",
    a: "TerapiRehberi üzerinden başvuru formunu doldurabilirsiniz. Çocuğunuzun yaşı, ihtiyacı ve programınıza göre size uygun oyun ablasını eşleştiriyoruz. Tüm oyun ablalarımız referans kontrolünden geçmiştir.",
  },
  {
    q: "Oyun ablası hizmetinin ücreti ne kadar?",
    a: "Konya'da oyun ablası ücreti saatlik, günlük veya aylık paket olarak değişir. Saatlik ortalama 200-400 TL aralığındadır. Çocuğunuzun ihtiyacına ve programa göre size özel fiyat sunulur.",
  },
  {
    q: "Oyun ablası çocuğumu psikolojik olarak da destekleyebilir mi?",
    a: "Oyun ablaları çocuk gelişimi konusunda bilinçlidir; ancak psikolojik destek için psikolog veya uzman yönlendirmesi gerekir. Çocuğunuzda gelişimsel bir endişe fark edilirse sizi bilgilendiririz ve gerekirse uzman psikolog ile görüşmenizi sağlarız.",
  },
];

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Güvenilir & Referanslı",
    desc: "Tüm oyun ablalarımız kimlik doğrulamasından ve referans kontrolünden geçer.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Gelişim Odaklı",
    desc: "Sadece bakım değil; oyun, ödev, aktivite ve çocuk gelişimini destekleyen program.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Konya'ya Özel",
    desc: "Selçuklu, Meram, Karatay ve tüm Konya ilçelerine hizmet veren oyun ablaları.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Uzman Yönlendirme",
    desc: "Gerektiğinde psikolog veya dil terapistine doğrudan yönlendirme yapılır.",
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
  name: "Oyun Ablası Hizmeti",
  description: "Konya'da çocuklarla ilgilenen, oyun oynayan, ödev yardımı yapan güvenilir oyun ablaları.",
  areaServed: { "@type": "City", name: "Konya" },
  provider: { "@type": "Organization", name: "TerapiRehberi", url: "https://www.terapirehberi.com" },
};

export default function OyunAblasıPage() {
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
            <span className="text-brand-600 font-medium">Oyun Ablası</span>
          </nav>

          <p className="section-label mb-3">Konya</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-900 mb-4 leading-snug">
            Konya'da Oyun Ablası Bul
          </h1>
          <p className="text-slate-600 text-base max-w-2xl leading-relaxed mb-6">
            Çocuğunuzla oynayan, ödev takibi yapan, gelişimini destekleyen — güvenilir ve referanslı oyun ablaları. Kreş kadar resmi değil, basit bakıcıdan çok daha nitelikli.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/uzman-ol"
              className="bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors text-center"
            >
              Oyun Ablası Ol — Başvur
            </Link>
            <Link
              href="#nasil-calisir"
              className="border border-brand-200 text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors text-center"
            >
              Nasıl Çalışır?
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

        {/* ── Avantajlar ── */}
        <section>
          <h2 className="text-xl font-bold text-brand-900 mb-6">
            Neden TerapiRehberi'nden Oyun Ablası?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-cream-200 shadow-sm p-5 flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm mb-1">{b.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Nasıl Çalışır ── */}
        <section id="nasil-calisir" className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-900 mb-6">Nasıl Çalışır?</h2>
          <div className="space-y-5">
            {[
              { num: "1", title: "Başvuru Yap", desc: "Çocuğunuzun yaşını, ihtiyacını ve programınızı belirtin." },
              { num: "2", title: "Eşleşme", desc: "Size en uygun, Konya'daki referanslı oyun ablasını öneriyoruz." },
              { num: "3", title: "Tanışma Seansı", desc: "Çocuğunuz ve oyun ablası ücretsiz tanışma seansı ile başlar." },
              { num: "4", title: "Düzenli Program", desc: "Haftanın belirlenen günleri oyun ablası gelir, siz çıkabilirsiniz." },
            ].map((s) => (
              <div key={s.num} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {s.num}
                </div>
                <div>
                  <p className="font-semibold text-brand-900 text-sm">{s.title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
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

        {/* ── Oyun Ablası ile Psikolog Bağlantısı ── */}
        <section className="bg-brand-50 border border-brand-100 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-900 mb-3">
            Çocuğunuzda Bir Endişe mi Fark Ettiniz?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            Oyun ablası hizmeti sırasında çocuğunuzda dil gecikmesi, dikkat dağınıklığı veya davranış farklılığı fark edilirse sizi bilgilendiririz. Konya'daki uzman psikolog ve dil terapistlerine doğrudan yönlendirebiliriz.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <Link
              href="/konya/psikologlar"
              className="bg-white border border-brand-200 text-brand-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-colors text-sm text-center"
            >
              Konya Psikologları →
            </Link>
            <Link
              href="/konya/dil-terapisti"
              className="bg-white border border-brand-200 text-brand-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-colors text-sm text-center"
            >
              Konya Dil Terapistleri →
            </Link>
            <Link
              href="/konya/pedagog"
              className="bg-white border border-brand-200 text-brand-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-colors text-sm text-center"
            >
              Konya Pedagog →
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
          <h2 className="font-bold text-lg mb-2">Oyun Ablası Arıyor musunuz?</h2>
          <p className="text-brand-200 text-sm mb-4">
            Konya'da güvenilir, referanslı oyun ablası için hemen başvurun.
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
