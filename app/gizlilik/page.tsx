import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — TerapiRehberi",
  description: "TerapiRehberi gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi.",
  alternates: { canonical: "https://www.terapirehberi.com/gizlilik" },
  robots: { index: false },
};

export default function GizlilikPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-brand-900 mb-2">Gizlilik Politikası</h1>
        <p className="text-slate-400 text-sm mb-10">Son güncelleme: Nisan 2026</p>

        <div className="space-y-8 text-sm text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-3">1. Veri Sorumlusu</h2>
            <p>
              TerapiRehberi (<strong>terapirehberi.com</strong>) olarak, ziyaretçilerimizin ve uzman başvurucularımızın kişisel verilerini 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında işlemekteyiz.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-3">2. Toplanan Veriler</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Uzman başvuru formu: ad, soyad, e-posta, telefon, diploma bilgisi</li>
              <li>Soru sor formu: sorunuz ve isteğe bağlı e-posta adresi</li>
              <li>Psikolojik testler: sonuçlar yalnızca tarayıcınızda saklanır, sunucuya gönderilmez</li>
              <li>Teknik veriler: IP adresi, tarayıcı türü (Google Analytics aracılığıyla)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-3">3. Verilerin Kullanım Amacı</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Uzman başvurularını değerlendirmek ve başvurucuyu bilgilendirmek</li>
              <li>Soru-cevap hizmetini yürütmek</li>
              <li>Site performansını ve kullanıcı deneyimini iyileştirmek</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-3">4. Üçüncü Taraflarla Paylaşım</h2>
            <p>
              Kişisel verileriniz; açık rızanız olmaksızın üçüncü kişilere satılmaz veya ticari amaçla devredilmez. Yalnızca hizmet alınan teknoloji sağlayıcılarla (e-posta servisi, analitik) sınırlı ölçüde paylaşılabilir.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-3">5. Çerezler (Cookies)</h2>
            <p>
              Sitemiz; oturum yönetimi ve analitik amaçlarla çerez kullanmaktadır. Tarayıcınızın ayarlarından çerezleri devre dışı bırakabilirsiniz; ancak bu durumda bazı özellikler çalışmayabilir.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-3">6. Haklarınız</h2>
            <p>KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="space-y-2 list-disc pl-5 mt-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>Yanlış verilerin düzeltilmesini isteme</li>
              <li>Verilerin silinmesini veya yok edilmesini talep etme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-3">7. İletişim</h2>
            <p>
              Gizlilik politikamızla ilgili sorularınız için{" "}
              <a href="mailto:info@terapirehberi.com" className="text-brand-600 hover:underline">
                info@terapirehberi.com
              </a>{" "}
              adresine yazabilirsiniz.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
