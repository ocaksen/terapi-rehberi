import type { Metadata } from "next";
import { getAllTestsCombined } from "@/lib/data";
import TestlerClient from "./TestlerClient";

export const metadata: Metadata = {
  title: "Sevgi Eksikliği Testi — Ücretsiz Psikolojik Testler | TerapiRehberi",
  description:
    "Sevgi eksikliği testi, GAD-7 anksiyete, PHQ-9 depresyon, PCL-5 travma ve daha fazlası. Bilimsel ölçeklere dayalı ücretsiz psikolojik testler — sonuçlar yalnızca size gösterilir.",
  alternates: { canonical: "https://www.terapirehberi.com/testler" },
  openGraph: {
    title: "Sevgi Eksikliği Testi — Ücretsiz Psikolojik Testler | TerapiRehberi",
    description: "Sevgi eksikliği testi, GAD-7, PHQ-9, PCL-5 — bilimsel ölçeklere dayalı ücretsiz psikolojik testler.",
    url: "https://www.terapirehberi.com/testler",
  },
};

export default function TestlerPage() {
  const tests = getAllTestsCombined();

  return (
    <div className="min-h-screen bg-cream-50">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-16 px-4">
        {/* Dekoratif daireler */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-10 right-1/3 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-8 right-1/4 w-16 h-16 rounded-full bg-white/8 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <svg className="w-3.5 h-3.5 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span className="text-xs font-semibold text-white/90">Bilimsel Ölçeklere Dayalı · Tamamen Ücretsiz</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
            Sevgi Eksikliği Testi &amp;<br />
            <span className="text-brand-300">Psikolojik Testler</span>
            <span className="block text-base font-semibold text-brand-200 mt-2">
              Anksiyete, depresyon, travma ve ilişki ölçekleri — bilimsel, ücretsiz
            </span>
          </h1>
          <p className="text-brand-200 text-base leading-relaxed max-w-lg mb-10">
            Klinik ortamlarda kullanılan bilimsel ölçekler. Sonuçlar yalnızca
            size gösterilir, hiçbir yerde saklanmaz.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                value: `${tests.length}`,
                label: "Farklı Test",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                ),
              },
              {
                value: "Anonim",
                label: "Veri Saklanmaz",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                ),
              },
              {
                value: "3–5 dk",
                label: "Ortalama Süre",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ),
              },
              {
                value: "GAD-7",
                label: "PHQ-9 · PCL-5",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                  </svg>
                ),
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-4 border border-white/15 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 text-brand-300 flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div>
                  <p className="text-white font-black text-lg leading-none">{s.value}</p>
                  <p className="text-brand-300 text-xs mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestlerClient tests={tests} />

      {/* Sevgi Eksikliği Testi — Öne Çıkan Bölüm */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-cream-200">
        <div className="bg-white rounded-2xl border border-cream-200 p-6 sm:p-8">
          <h2 className="text-lg font-black text-slate-900 mb-3">Sevgi Eksikliği Testi Nedir?</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            Sevgi eksikliği testi, ilişkilerinizde duygusal ihtiyaçlarınızın karşılanıp karşılanmadığını
            ölçen bir öz-değerlendirme aracıdır. &ldquo;Hiçbir zaman yeterince sevilmiyorum&rdquo; duygusu,
            duygularınızı ifade etmekte güçlük ya da sık yaşanan terk edilme kaygısı — bu belirtiler
            testin odağındadır.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            Yüksek sevgi eksikliği skoru genellikle bağlanma stiliyle ilişkilidir.
            Kaygılı bağlanan kişiler onay arayışına girer ve duygusal mesafeyi tehdit olarak algılar.
            Bu örüntüleri fark etmek, değişimin ilk adımıdır.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Sonuçlarınızı lisanslı bir psikologla paylaşmanızı öneririz.
            Uzman desteği, kalıcı değişim için en etkili yoldur.
          </p>
        </div>
      </section>

      {/* Sevgi Eksikliği Testi — Nasıl Yorumlanır */}
      <section className="max-w-4xl mx-auto px-4 pb-10">
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-600 leading-relaxed">
          <div className="bg-white rounded-2xl border border-cream-200 p-5">
            <p className="font-semibold text-slate-800 mb-2 text-xs uppercase tracking-wide text-green-600">Düşük Skor</p>
            <p>Duygusal ihtiyaçlarınız büyük ölçüde karşılanıyor. İlişkilerinizde güven ve bağ duygusu öne çıkıyor. Bu güçlü temeli korumak için iletişim becerilerinizi geliştirmeye devam edebilirsiniz.</p>
          </div>
          <div className="bg-white rounded-2xl border border-cream-200 p-5">
            <p className="font-semibold text-slate-800 mb-2 text-xs uppercase tracking-wide text-amber-600">Orta Skor</p>
            <p>Zaman zaman duygusal boşluk hissediyorsunuz. Bağlanma örüntülerinizi keşfetmek faydalı olabilir. Bir uzmanla kısa süreli bir çalışma, bu örüntülerin kaynağını anlamanızı kolaylaştırır.</p>
          </div>
          <div className="bg-white rounded-2xl border border-cream-200 p-5">
            <p className="font-semibold text-slate-800 mb-2 text-xs uppercase tracking-wide text-red-500">Yüksek Skor</p>
            <p>Yoğun sevgi eksikliği belirtileri yaşıyorsunuz. Bu durum günlük işlevleri etkileyebilir. Lisanslı bir psikologla görüşmenizi öneririz — destek almak zayıflık değil, bilinçli bir tercihdir.</p>
          </div>
        </div>
      </section>

      {/* Testler hakkında bilgi — SEO içeriği */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-cream-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Psikolojik Testler Hakkında Sık Sorulan Sorular</h2>
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Bu testler ne ölçer?</h3>
            <p>
              Platformumuzdaki testler GAD-7, PHQ-9, PSS-10, PCL-5 gibi klinik ortamlarda
              yaygın kullanılan bilimsel ölçeklere dayanmaktadır.
            </p>
            <p className="mt-2">
              Anksiyete, depresyon, stres, travma, OKB, sosyal kaygı ve ilişki örüntüleri gibi
              alanlarda kendi durumunuz hakkında farkındalık kazanmanızı sağlar. Her test
              başlamadan önce ne ölçtüğünü ve nasıl yorumlanacağını açıklar.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Sonuçlar tanı niteliği taşır mı?</h3>
            <p>
              Hayır. Bu testler yalnızca kişisel farkındalık amacıyla sunulmaktadır.
            </p>
            <p className="mt-2">
              Klinik tanı koyma yetkisi yalnızca lisanslı psikolog ve psikiyatristlere aittir.
              Sonuçlarınız yüksek risk gösteriyorsa bir uzmana başvurmanız önerilir. Teste
              göre değil, uzman görüşüne göre hareket edin.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Verilerim saklanıyor mu?</h3>
            <p>
              Hayır. Tüm yanıtlarınız yalnızca tarayıcınızda işlenir; hiçbir sunucuya gönderilmez,
              hiçbir veritabanına kaydedilmez.
            </p>
            <p className="mt-2">
              Testleri anonim olarak istediğiniz kadar tekrarlayabilirsiniz. Kişisel verileriniz
              hiçbir şekilde üçüncü taraflarla paylaşılmaz.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Testi tamamladıktan sonra ne yapmalıyım?</h3>
            <p>
              Sonuçlarınızı bir uzmanla paylaşmak terapötik süreci hızlandırır.
            </p>
            <p className="mt-2">
              Konya&apos;daki lisanslı psikologlarımızın profillerini inceleyebilir, size en
              uygun uzmanla doğrudan iletişime geçebilirsiniz. İlk görüşmede test sonuçlarınızı
              paylaşmak değerlendirme sürecini kısaltır.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Hangi testler ilişki ve sevgi örüntülerini ölçer?</h3>
            <p>
              Sevgi Dili Testi ve Bağlanma Stili Testi, ilişkilerde duygusal örüntüleri
              anlamlandırmanıza yardımcı olur.
            </p>
            <p className="mt-2">
              Sık sık onay arayışı, ifade etme güçlüğü, hiçbir zaman yeterince sevilmediğinizi
              hissetme veya duygusal mesafe yaşıyorsanız bu testler size önemli ipuçları verir.
              Destek almak için öncelikle bağlanma stilinizi anlamak faydalıdır.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Testleri ne sıklıkla yapmalıyım?</h3>
            <p>
              Terapi sürecindeyseniz terapistinizin önerdiği aralıklarda (genellikle 4–8 haftada bir)
              tekrar yapmanız ilerlemeyi izlemenizi kolaylaştırır.
            </p>
            <p className="mt-2">
              Terapi dışında ise kendinizi duygusal açıdan farklı hissettiren dönemlerde
              (yoğun stres, ilişki değişikliği, kayıp) tekrar yapmanız anlamlı olabilir.
            </p>
          </div>
        </div>
      </section>

      {/* Ek SEO bölümü — testlerin faydaları */}
      <section className="max-w-4xl mx-auto px-4 pb-16 border-t border-cream-200 pt-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Psikolojik Test Yapmak Ne İşe Yarar?</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Psikolojik testler, kendinizi daha iyi anlamanın en hızlı yollarından biridir.
          Duygusal durumunuzu somut bir çerçeveye oturtmanızı sağlar.
          Bir psikologla ilk görüşmeden önce test sonuçlarınıza bakmak, değerlendirme sürecini kısaltır.
        </p>
        <div className="grid sm:grid-cols-2 gap-5 text-sm text-slate-600 leading-relaxed">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Farkındalık kazandırır</h3>
            <p>
              Günlük yaşamda fark etmediğiniz örüntüleri ortaya çıkarır.
              Kaygı düzeyiniz, stres tepkileriniz veya ilişki alışkanlıklarınız hakkında
              nesnel bir bakış açısı sunar.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Terapi sürecini hızlandırır</h3>
            <p>
              Sonuçlarınızı terapistinizle paylaşmak, odak noktasını hızla belirlemenize yardımcı olur.
              İlk seanstan itibaren daha verimli bir çalışma başlar.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">İlerlemeyi ölçer</h3>
            <p>
              Aynı testi belirli aralıklarla tekrarlamak, terapi sürecindeki değişimi
              sayısal olarak görmenizi sağlar.
              Bu geri bildirim motivasyonu artırır.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Yardım almaya zemin hazırlar</h3>
            <p>
              Bazen bir uzmana başvurmak için somut bir gerekçeye ihtiyaç duyulur.
              Test sonuçları bu kararı kolaylaştırır; sezgilerinizi veriyle destekler.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
