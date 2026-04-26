import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kullanım Koşulları — TerapiRehberi",
  description: "TerapiRehberi.com kullanım koşulları ve sorumluluk sınırlamaları.",
  alternates: { canonical: "https://www.terapirehberi.com/kullanim-kosullari" },
  robots: { index: false },
};

export default function KullanimKosullariPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <nav className="text-xs text-slate-400 mb-8 flex items-center gap-1.5">
        <Link href="/" className="hover:text-brand-700 transition-colors">Ana Sayfa</Link>
        <span>/</span>
        <span className="text-slate-600">Kullanım Koşulları</span>
      </nav>

      <h1 className="text-3xl font-black text-brand-900 mb-2">Kullanım Koşulları</h1>
      <p className="text-sm text-slate-400 mb-10">Son güncelleme: Nisan 2026</p>

      <div className="space-y-8 text-slate-700 text-sm leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">1. Kabulü</h2>
          <p>
            TerapiRehberi.com&apos;u (&quot;Platform&quot;) kullanarak bu Kullanım Koşulları&apos;nı kabul etmiş sayılırsınız.
            Koşulları kabul etmiyorsanız lütfen platformu kullanmayınız.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">2. Platformun Amacı</h2>
          <p>
            TerapiRehberi.com, Konya ilinde faaliyet gösteren psikolog, klinik psikolog ve psikolojik danışmanları
            bir araya getiren <strong>bağımsız bir bilgi rehberi</strong>dir. Platform;
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>Psikolojik destek arayan kişilere bilgi sunmayı,</li>
            <li>Uzmanlarla doğrudan iletişimi kolaylaştırmayı,</li>
            <li>Kamuya açık mesleki bilgileri derli toplu sunmayı</li>
          </ul>
          <p className="mt-3">amaçlar.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">3. Sorumluluk Sınırlaması</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <p className="font-semibold text-amber-800 mb-2">Önemli Uyarı</p>
            <p className="text-amber-700">
              Platform bir sağlık hizmeti sağlayıcısı değildir. Platformdaki hiçbir içerik tıbbi,
              psikolojik veya psikiyatrik tanı, tedavi ya da öneri niteliği taşımaz.
              Acil psikolojik kriz durumunda lütfen 182 (ALO Psikiyatri Hattı) veya 112&apos;yi arayın.
            </p>
          </div>
          <p>Platform aşağıdaki konularda sorumluluk kabul etmez:</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>Uzman profillerindeki bilgilerin doğruluğu veya güncelliği</li>
            <li>Uzmanlarla gerçekleştirilen seans, randevu veya iletişimin içeriği</li>
            <li>Uzmanın sunduğu hizmetin kalitesi veya sonucu</li>
            <li>Üçüncü taraf sitelerine (doktortakvimi.com vb.) bağlantılar</li>
            <li>Teknik kesintiler veya veri kayıpları</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">4. Uzman Profilleri</h2>
          <p>
            Platformdaki uzman profilleri kamuya açık kaynaklardan derlenmektedir. Platform,
            uzmanların mesleki yetkinliklerini, lisans durumlarını veya etik uyumluluklarını
            doğrulama yükümlülüğü taşımaz. Bir uzmana randevu almadan önce kendi araştırmanızı
            yapmanızı öneririz.
          </p>
          <p className="mt-3">
            Profilinde hata olduğunu düşünen veya kaldırılmasını isteyen uzmanlar{" "}
            <Link href="/kvkk" className="text-brand-700 underline">KVKK sayfamızdaki</Link>{" "}
            prosedürü takip edebilir ya da{" "}
            <a href="mailto:iletisim@terapirehberi.com" className="text-brand-700 underline">iletisim@terapirehberi.com</a>
            {" "}adresine yazabilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">5. Kullanıcı Yükümlülükleri</h2>
          <p>Platform kullanıcıları aşağıdakileri yapmamayı kabul eder:</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>Platformu yasa dışı amaçlarla kullanmak</li>
            <li>Otomatik araçlarla (bot, scraper) içerik çekmek</li>
            <li>Uzmanlar hakkında asılsız veya yanıltıcı bilgi yaymak</li>
            <li>Platformun güvenliğini tehlikeye atacak girişimlerde bulunmak</li>
            <li>Başkalarının haklarını ihlal etmek</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">6. Fikri Mülkiyet</h2>
          <p>
            Platform üzerindeki özgün içerikler (metin, tasarım, kod) TerapiRehberi.com&apos;a aittir.
            İzinsiz kopyalanması, dağıtılması veya ticari amaçla kullanılması yasaktır.
            Uzmanların kişisel verileri (isim, fotoğraf vb.) üzerindeki haklar ilgili kişilere aittir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">7. Değişiklikler</h2>
          <p>
            Platform bu koşulları önceden bildirim yapmaksızın değiştirme hakkını saklı tutar.
            Güncel koşullar her zaman bu sayfada yayımlanır. Platformu kullanmaya devam etmeniz
            değişiklikleri kabul ettiğiniz anlamına gelir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">8. Uygulanacak Hukuk</h2>
          <p>
            Bu Kullanım Koşulları Türk hukukuna tabidir. Uyuşmazlıklarda Konya mahkemeleri ve
            icra daireleri yetkilidir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">9. İletişim</h2>
          <p>
            Sorularınız için:{" "}
            <a href="mailto:iletisim@terapirehberi.com" className="text-brand-700 underline">iletisim@terapirehberi.com</a>
          </p>
        </section>

      </div>
    </div>
  );
}
