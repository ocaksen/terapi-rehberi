import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni — TerapiRehberi",
  description: "TerapiRehberi.com kişisel verilerin korunması kanunu kapsamında aydınlatma metni.",
  alternates: { canonical: "https://www.terapirehberi.com/kvkk" },
  robots: { index: false },
};

export default function KvkkPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <nav className="text-xs text-slate-400 mb-8 flex items-center gap-1.5">
        <Link href="/" className="hover:text-brand-700 transition-colors">Ana Sayfa</Link>
        <span>/</span>
        <span className="text-slate-600">KVKK Aydınlatma Metni</span>
      </nav>

      <h1 className="text-3xl font-black text-brand-900 mb-2">KVKK Aydınlatma Metni</h1>
      <p className="text-sm text-slate-400 mb-10">Son güncelleme: Nisan 2026</p>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 text-sm leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">1. Veri Sorumlusu</h2>
          <p>
            Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu&apos;nun (&quot;KVKK&quot;) 10. maddesi
            uyarınca <strong>TerapiRehberi.com</strong> (&quot;Platform&quot;) tarafından hazırlanmıştır.
            Veri sorumlusu sıfatıyla iletişim adresi: <a href="mailto:iletisim@terapirehberi.com" className="text-brand-700 underline">iletisim@terapirehberi.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">2. İşlenen Kişisel Veriler ve Kaynağı</h2>
          <p>
            Platform, Konya&apos;da hizmet veren psikolog ve psikolojik danışmanları bir araya getiren kamuya açık bir rehberdir.
            Listelenen uzmanların aşağıdaki verileri işlenmektedir:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>Ad, soyad ve unvan</li>
            <li>Çalışma adresi / ilçe bilgisi</li>
            <li>Uzmanlık alanları ve sunulan hizmetler</li>
            <li>Profil fotoğrafı (varsa)</li>
            <li>Seans ücreti (varsa)</li>
            <li>Randevu / iletişim bağlantısı</li>
          </ul>
          <p className="mt-3">
            Bu veriler; <strong>doktortakvimi.com</strong> gibi kamuya açık mesleki dizinlerden, uzmanların kendi web sitelerinden
            veya platformumuza gönüllü olarak başvuran uzmanlardan elde edilmiştir.
            Doğrudan kullanıcılardan (site ziyaretçilerinden) yalnızca teknik çerezler ve analitik veriler toplanmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">3. Kişisel Verilerin İşlenme Amaçları</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Konya&apos;daki psikolog ve terapistleri ziyaretçilere tanıtmak</li>
            <li>Psikolojik destek arayan kişilerin doğru uzmana yönlendirilmesini kolaylaştırmak</li>
            <li>Mesleki rehber niteliğinde güncel ve doğru bilgi sunmak</li>
            <li>Platform güvenliği, teknik işletim ve analitik faaliyetler</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">4. Hukuki Dayanak</h2>
          <p>Uzman verilerinin işlenmesi aşağıdaki hukuki dayanakları kapsamında yürütülmektedir:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong>KVKK m. 5/2-d — Aleni kılınmış veriler:</strong> Uzmanların kamuya açık mesleki dizinlerde
              (doktortakvimi.com vb.) bizzat yayımladığı veriler bu kapsamdadır.
            </li>
            <li>
              <strong>KVKK m. 5/2-f — Meşru menfaat:</strong> Kamuya açık mesleki bilgilerin bir rehber platformunda
              derlenmesi, temel hak ve özgürlüklere zarar vermemek kaydıyla meşru menfaat kapsamında değerlendirilmektedir.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">5. Verilerin Aktarımı</h2>
          <p>
            Kişisel verileriniz; yurt içinde hosting/altyapı sağlayıcısına (Vercel Inc.) ve analitik araçlara
            (anonim trafik verisi) aktarılmaktadır. Verileriniz, bu hizmetlerin sunulması amacının dışında
            üçüncü kişilerle paylaşılmamakta, satılmamakta veya kiralanmamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">6. Veri Sahibinin Hakları (KVKK m. 11)</h2>
          <p>KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
            <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
            <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</li>
            <li>
              <strong>Profilinizin platformdan kaldırılmasını talep etme</strong> —
              aşağıdaki formu doldurun, 5 iş günü içinde işleme alınır.
            </li>
            <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
            <li>Zararın giderilmesini talep etme</li>
          </ul>
        </section>

        <section className="bg-brand-50 border border-brand-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-brand-900 mb-3">7. Profil Kaldırma / Düzeltme Talebi</h2>
          <p className="mb-4">
            Profilinizin kaldırılmasını veya güncellenmesini talep etmek için aşağıdaki bilgileri
            <a href="mailto:iletisim@terapirehberi.com" className="text-brand-700 underline font-semibold"> iletisim@terapirehberi.com</a> adresine
            e-posta ile iletebilirsiniz:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Adınız ve soyadınız</li>
            <li>Profil URL&apos;niz veya isminiz</li>
            <li>Talebiniz: kaldırma / güncelleme / düzeltme</li>
            <li>Kimliğinizi doğrulayan belge (diploma, nüfus cüzdanı önü vb.)</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Talepler, kimlik doğrulamasının ardından en geç <strong>5 iş günü</strong> içinde sonuçlandırılır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">8. Çerezler (Cookie) ve Analitik</h2>
          <p>
            Platform; teknik zorunluluk, kullanıcı tercihi ve anonim trafik analizi amacıyla çerezler kullanmaktadır.
            Reklam amaçlı veya hassas kategori çerezi kullanılmamaktadır.
            Detaylı bilgi için <Link href="/gizlilik" className="text-brand-700 underline">Gizlilik Politikası</Link>&apos;nı inceleyebilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">9. Değişiklikler</h2>
          <p>
            Bu metin, mevzuat değişiklikleri veya platform güncellemeleri doğrultusunda güncellenebilir.
            Önemli değişiklikler sayfanın üst kısmındaki tarih ile belirtilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-3">10. Başvuru ve Şikayet</h2>
          <p>
            KVKK kapsamındaki taleplerinizi <a href="mailto:iletisim@terapirehberi.com" className="text-brand-700 underline">iletisim@terapirehberi.com</a> adresine
            iletebilirsiniz. Talebinizin yanıtsız kalması halinde <strong>Kişisel Verileri Koruma Kurumu</strong>&apos;na
            (<a href="https://www.kvkk.gov.tr" target="_blank" rel="noopener noreferrer" className="text-brand-700 underline">kvkk.gov.tr</a>) başvuru hakkınız saklıdır.
          </p>
        </section>

      </div>
    </div>
  );
}
