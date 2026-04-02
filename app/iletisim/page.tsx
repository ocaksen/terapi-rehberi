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
    <div className="min-h-screen bg-cream-50 py-16 px-4">
      <div className="max-w-xl mx-auto">
        <p className="section-label mb-3">Bize Ulaşın</p>
        <h1 className="text-3xl font-bold text-brand-900 mb-2">İletişim</h1>
        <p className="text-slate-500 text-sm mb-10 leading-relaxed">
          Herhangi bir konuda bize yazmaktan çekinmeyin.
          En geç 2 iş günü içinde yanıt vermeye çalışıyoruz.
        </p>

        <div className="space-y-4">
          {[
            {
              icon: "✉️",
              title: "E-posta",
              value: "info@terapirehberi.com",
              href: "mailto:info@terapirehberi.com",
            },
            {
              icon: "🌐",
              title: "Web",
              value: "terapirehberi.com",
              href: "https://www.terapirehberi.com",
            },
            {
              icon: "📍",
              title: "Konum",
              value: "Konya, Türkiye",
              href: null,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-cream-200 px-6 py-5 flex items-center gap-4"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest mb-0.5">
                  {item.title}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-brand-700 font-medium text-sm hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-slate-700 font-medium text-sm">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-brand-50 border border-brand-100 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-brand-900 mb-2">Uzman Başvurusu</h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Platformumuza uzman olarak katılmak istiyorsanız başvuru formunu kullanabilirsiniz.
          </p>
          <a href="/uzman-ol" className="btn-primary text-sm">
            Uzman Ol →
          </a>
        </div>
      </div>
    </div>
  );
}
