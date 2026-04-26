import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim — TerapiRehberi",
  description:
    "TerapiRehberi ile iletişime geçin. Uzman başvuruları, içerik önerileri ve platform hakkındaki sorularınız için e-posta gönderin.",
  alternates: { canonical: "https://www.terapirehberi.com/iletisim" },
  robots: { index: true, follow: true },
};

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="bg-brand-900 py-12 px-4">
        <div className="max-w-xl mx-auto">
          <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-3">Bize Ulaşın</p>
          <h1 className="text-3xl font-bold text-white mb-2">İletişim</h1>
          <p className="text-brand-200 text-sm leading-relaxed">
            Sorularınız, önerileriniz veya uzman başvurusu için aşağıdaki kanalları kullanabilirsiniz.
            En geç 2 iş günü içinde yanıt vermeye çalışıyoruz.
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-10 space-y-6">

        <div className="space-y-3">
          {[
            {
              icon: "✉️",
              title: "E-posta",
              value: "info@terapirehberi.com",
              href: "mailto:info@terapirehberi.com",
              desc: "Genel sorular, içerik önerileri ve platform hakkındaki geri bildirimleriniz için.",
            },
            {
              icon: "🌐",
              title: "Web",
              value: "terapirehberi.com",
              href: "https://www.terapirehberi.com",
              desc: "Konya psikolog rehberimizi ziyaret edin, uzman listesini inceleyin.",
            },
            {
              icon: "📍",
              title: "Konum",
              value: "Konya, Türkiye",
              href: null,
              desc: "Şu an Konya odaklı çalışıyoruz; yakında diğer şehirlere de genişleyeceğiz.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-cream-200 px-6 py-5"
            >
              <div className="flex items-center gap-4 mb-2">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest mb-0.5">
                    {item.title}
                  </p>
                  {item.href ? (
                    <a href={item.href} className="text-brand-700 font-medium text-sm hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-slate-700 font-medium text-sm">{item.value}</p>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pl-10">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6">
          <h2 className="text-base font-bold text-brand-900 mb-2">Uzman Başvurusu</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Konya'da hizmet veren lisanslı bir psikolog veya terapistseniz platformumuza ücretsiz
            kayıt olabilirsiniz. Başvurunuz diploma doğrulamasından geçtikten sonra profiliniz
            yayına alınır. Danışan adayları profilinizi görebilir, randevu talebinde bulunabilir.
          </p>
          <a href="/uzman-ol" className="btn-primary text-sm">
            Uzman Başvurusu →
          </a>
        </div>

        <div className="bg-white rounded-2xl border border-cream-200 p-6">
          <h2 className="text-base font-bold text-brand-900 mb-3">Sık Sorulan Sorular</h2>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <div>
              <p className="font-semibold text-slate-800 mb-1">Profil bilgilerimi nasıl güncelletirim?</p>
              <p>İletişim e-postasına ad-soyad, slug ve güncel bilgileri belirterek yazabilirsiniz. Güncelleme talebiniz 2 iş günü içinde işleme alınır.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">Profil kaldırma talebinde nasıl bulunurum?</p>
              <p>info@terapirehberi.com adresine "Profil Kaldırma" konusuyla e-posta atmanız yeterlidir. Kimlik doğrulaması sonrasında profil 5 iş günü içinde kaldırılır.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">İçerik önerisi veya hata bildirimi yapabilir miyim?</p>
              <p>Evet. Blog konuları, hatalı bilgiler veya platform geliştirme önerileri için aynı e-posta adresini kullanabilirsiniz. Her geri bildirim değerlendirilmektedir.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
