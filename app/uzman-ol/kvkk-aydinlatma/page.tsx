import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni — Uzman Başvurusu",
  description: "TerapiRehberi uzman başvurusu kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.",
  robots: { index: false },
};

export default function KvkkAydinlatmaPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/uzman-ol" className="text-sm text-brand-600 hover:text-brand-800 mb-6 inline-block">
          ← Başvuru Sayfasına Dön
        </Link>

        <div className="bg-white rounded-3xl border border-cream-200 shadow-sm p-8 sm:p-10">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">KVKK Aydınlatma Metni</h1>
          <p className="text-sm text-slate-400 mb-8">Uzman Başvurusu — Son güncelleme: Mart 2026</p>

          <div className="prose prose-sm max-w-none text-slate-600 space-y-6">

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">1. Veri Sorumlusu</h2>
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca,
                kişisel verileriniz; veri sorumlusu sıfatıyla <strong>TerapiRehberi</strong>
                (&quot;Platform&quot;) tarafından aşağıda açıklanan kapsamda işlenecektir.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">2. İşlenen Kişisel Veriler</h2>
              <p>Uzman başvurusu sürecinde aşağıdaki kişisel verileriniz işlenmektedir:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Kimlik verileri:</strong> Ad, soyad, unvan</li>
                <li><strong>İletişim verileri:</strong> E-posta adresi, telefon numarası</li>
                <li><strong>Mesleki veriler:</strong> Mezun olunan okul, mezuniyet yılı, uzmanlık alanları, mesleki deneyim</li>
                <li><strong>Konum verileri:</strong> Çalışılan şehir ve ilçe</li>
                <li><strong>Mali veriler:</strong> Seans ücreti bilgisi</li>
                <li><strong>Biyografik bilgi:</strong> Serbest biçimde girilen kısa biyografi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">3. Kişisel Verilerin İşlenme Amaçları</h2>
              <p>Toplanan verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Uzman başvurusunun değerlendirilmesi ve kimlik/diploma doğrulamasının yapılması</li>
                <li>Onaylanan başvurular için platform üzerinde uzman profilinin oluşturulması</li>
                <li>Platform kullanıcılarının (danışanların) uzman arama sürecinde ilgili profillerin gösterilmesi</li>
                <li>Başvuru ve profil süreçlerine ilişkin iletişimin sağlanması</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">4. Kişisel Verilerin Aktarılması</h2>
              <p>
                Kişisel verileriniz; hizmet alınan altyapı sağlayıcıları (hosting, e-posta servisi),
                yasal zorunluluk halinde yetkili kamu kurum ve kuruluşları ile paylaşılabilir.
                Verileriniz yurt dışına aktarılması durumunda KVKK'nın 9. maddesi kapsamındaki
                güvenceler sağlanır. Üçüncü taraf reklam veya pazarlama şirketlerine
                <strong> kesinlikle satılmaz veya aktarılmaz.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">5. Hukuki Dayanak</h2>
              <p>Kişisel verileriniz aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (KVKK m.5/2-c)</li>
                <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla meşru menfaat (KVKK m.5/2-f)</li>
                <li>Açık rızanız (yalnızca zorunlu olmayan işlemler için)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">6. Saklama Süresi</h2>
              <p>
                Başvurunuzun reddedilmesi halinde verileriniz <strong>30 gün</strong> içinde silinir.
                Başvurunuzun onaylanması ve platformda profil oluşturulması durumunda verileriniz,
                platform üyeliğiniz süresince ve sona ermesinden itibaren <strong>2 yıl</strong> boyunca
                saklanır. Yasal yükümlülükler kapsamındaki veriler ilgili mevzuatta öngörülen süre kadar saklanır.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">7. Haklarınız (KVKK m. 11)</h2>
              <p>Kişisel verilerinize ilişkin olarak aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                <li>Eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme</li>
                <li>KVKK'nın 7. maddesi çerçevesinde silinmesini veya yok edilmesini isteme</li>
                <li>İşlenen verilerin münhasıran otomatik sistemler aracılığıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
              </ul>
              <p className="mt-3">
                Bu haklarınızı kullanmak için{" "}
                <a href="mailto:kvkk@terapirehberi.com" className="text-brand-600 underline">
                  kvkk@terapirehberi.com
                </a>{" "}
                adresine e-posta gönderebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">8. Çerezler</h2>
              <p>
                Uzman başvuru formu, teknik zorunluluklar dışında çerez kullanmamaktadır.
                Platform genelinde çerez kullanımı hakkında ayrı bir Çerez Politikası mevcuttur.
              </p>
            </section>

          </div>

          <div className="mt-8 pt-6 border-t border-cream-100">
            <Link href="/uzman-ol" className="btn-primary">
              Başvuru Formuna Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
