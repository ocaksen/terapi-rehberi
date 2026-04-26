import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — TerapiRehberi",
  description: "TerapiRehberi.com gizlilik politikası ve kişisel veri işleme prensipleri.",
  alternates: { canonical: "https://www.terapirehberi.com/gizlilik" },
  robots: { index: false },
};

export default function GizlilikPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <nav className="text-xs text-slate-400 mb-8 flex items-center gap-1.5">
        <Link href="/" className="hover:text-brand-700 transition-colors">Ana Sayfa</Link>
        <span>/</span>
        <span className="text-slate-600">Gizlilik Politikası</span>
      </nav>

      <h1 className="text-3xl font-black text-brand-900 mb-2">Gizlilik Politikası</h1>
      <p className="text-sm text-slate-400 mb-10">Son güncelleme: Nisan 2026</p>

      <div className="space-y-8 text-slate-700 text-sm leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">1. Genel Bilgi</h2>
          <p>
            TerapiRehberi.com (&quot;Platform&quot;), ziyaretçilerin gizliliğine saygı duyan ve kişisel verileri
            yalnızca gerekli olduğu ölçüde işleyen bağımsız bir rehber platformudur.
            Bu politika, site ziyaretçilerine ait verilerin nasıl toplandığını ve kullanıldığını açıklar.
            Listelenen uzmanların verileriyle ilgili bilgi için <Link href="/kvkk" className="text-brand-700 underline">KVKK Aydınlatma Metni</Link>&apos;ni inceleyiniz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">2. Ziyaretçilerden Toplanan Veriler</h2>
          <p>Platform, ziyaretçilerden aşağıdaki teknik verileri otomatik olarak toplar:</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>IP adresi (anonimleştirilmiş)</li>
            <li>Tarayıcı türü ve sürümü</li>
            <li>Ziyaret edilen sayfalar ve gezinme süresi</li>
            <li>Yönlendiren URL</li>
            <li>Cihaz türü (masaüstü / mobil)</li>
          </ul>
          <p className="mt-3">
            Bu veriler kişiyle ilişkilendirilmemekte, yalnızca anonim istatistiksel analiz amacıyla kullanılmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">3. Çerezler (Cookie)</h2>
          <div className="space-y-3">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="font-semibold text-slate-800 mb-1">Zorunlu Çerezler</p>
              <p>Oturum yönetimi ve güvenlik için gereklidir. Kapatılamaz.</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="font-semibold text-slate-800 mb-1">Analitik Çerezler</p>
              <p>Ziyaretçi sayısı ve davranışını anonim olarak ölçmek için kullanılır. Reklam amaçlı değildir.</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Tarayıcı ayarlarından çerezleri devre dışı bırakabilirsiniz; ancak bazı işlevler etkilenebilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">4. Üçüncü Taraf Hizmetleri</h2>
          <p>Platform aşağıdaki üçüncü taraf hizmetlerini kullanır:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong>Vercel Inc.</strong> — Barındırma ve CDN altyapısı. Sunucu erişim logları tutulabilir.
            </li>
            <li>
              <strong>Google Fonts / CDN</strong> — Yazı tipi yükleme. IP adresi Google&apos;a iletilebilir.
            </li>
            <li>
              <strong>ui-avatars.com</strong> — Profil fotoğrafı bulunmayan uzmanlar için otomatik avatar.
            </li>
          </ul>
          <p className="mt-3">
            Platform, Google Analytics, Facebook Pixel veya benzeri reklam izleme araçları kullanmamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">5. Dış Bağlantılar</h2>
          <p>
            Platform, doktortakvimi.com gibi üçüncü taraf sitelere bağlantı içerebilir.
            Bu sitelerin gizlilik uygulamalarından TerapiRehberi.com sorumlu değildir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">6. Veri Güvenliği</h2>
          <p>
            Platform HTTPS ile şifrelenmiş bağlantı kullanır. Ziyaretçi verileri yetkisiz erişime
            karşı korunan güvenli ortamlarda saklanmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">7. Çocukların Gizliliği</h2>
          <p>
            Platform 18 yaş altı bireylere yönelik değildir. Bu yaş grubundan bilerek kişisel veri toplanmamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">8. Değişiklikler</h2>
          <p>
            Bu politika zaman zaman güncellenebilir. Platformu kullanmaya devam etmeniz güncel politikayı
            kabul ettiğiniz anlamına gelir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">9. İletişim</h2>
          <p>
            Gizlilik ile ilgili sorularınız için:{" "}
            <a href="mailto:iletisim@terapirehberi.com" className="text-brand-700 underline">iletisim@terapirehberi.com</a>
          </p>
          <p className="mt-2">
            Kişisel verilerinizin işlenmesine ilişkin haklarınız için{" "}
            <Link href="/kvkk" className="text-brand-700 underline">KVKK Aydınlatma Metni</Link>&apos;ni inceleyin.
          </p>
        </section>

      </div>
    </div>
  );
}
