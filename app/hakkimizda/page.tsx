import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda — TerapiRehberi",
  description:
    "TerapiRehberi, Konya'da güvenilir psikolog ve terapist bulmayı kolaylaştıran bağımsız bir rehber platformudur. Kimlik ve diploma doğrulamalı uzmanlar.",
  alternates: { canonical: "https://www.terapirehberi.com/hakkimizda" },
  openGraph: {
    title: "Hakkımızda — TerapiRehberi",
    description: "Konya'da doğrulanmış psikolog ve terapist rehberi.",
    url: "https://www.terapirehberi.com/hakkimizda",
  },
};

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <div className="bg-brand-900 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="section-label text-brand-300 mb-3">Biz kimiz?</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            TerapiRehberi Hakkında
          </h1>
          <p className="text-brand-200 text-base leading-relaxed max-w-xl">
            Konya'da psikolojik destek arayanları güvenilir, lisanslı uzmanlara bağlayan
            bağımsız bir rehber platformu.
          </p>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">

        {/* Misyon */}
        <section className="bg-white rounded-2xl border border-cream-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-900 mb-4">Neden TerapiRehberi?</h2>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Psikolojik destek almaya karar vermek cesaret ister; doğru uzmanı bulmak ise
              çoğu zaman yorucu bir araştırma sürecine dönüşür. TerapiRehberi bu süreci
              kolaylaştırmak için kuruldu.
            </p>
            <p>
              Platformumuzda yalnızca kimlik doğrulaması ve diploma kontrolünden geçmiş
              psikolog, klinik psikolog ve psikolojik danışmanlar yer alır. Her uzman,
              Türk Psikologlar Derneği veya ilgili meslek kuruluşu üyeliği ya da mezuniyet
              belgesiyle doğrulanmaktadır.
            </p>
            <p>
              Şu an için Konya odaklı çalışıyoruz. Meram, Selçuklu ve Karatay ilçelerindeki
              uzmanların yanı sıra online seans sunan Konya psikologlarını da bulabilirsiniz.
            </p>
          </div>
        </section>

        {/* Değerler */}
        <section>
          <h2 className="text-xl font-bold text-brand-900 mb-5">İlkelerimiz</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: "🔍",
                title: "Doğrulama",
                text: "Her uzman diploma ve kimlik belgesiyle doğrulanır. Lisanssız kişi listeye alınmaz.",
              },
              {
                icon: "🔒",
                title: "Gizlilik",
                text: "Ziyaretçi bilgileri üçüncü taraflarla paylaşılmaz. Testler sunucuya gönderilmez.",
              },
              {
                icon: "⚖️",
                title: "Bağımsızlık",
                text: "Uzman sıralaması ücretli reklama değil, profil tamlığına ve doğrulama durumuna göre belirlenir.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-cream-200 p-5 flex flex-col gap-2"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="font-semibold text-brand-900 text-sm">{item.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uzman olmak isteyenler */}
        <section className="bg-brand-50 border border-brand-100 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-brand-900 mb-2">Psikolog veya terapist misiniz?</h2>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Konya'da hizmet veren lisanslı bir uzmansanız profilinizi oluşturabilir,
            potansiyel danışanlarınıza ulaşabilirsiniz.
          </p>
          <Link href="/uzman-ol" className="btn-primary text-sm">
            Listeye Katıl →
          </Link>
        </section>

        {/* İletişim */}
        <section className="bg-white rounded-2xl border border-cream-200 p-6">
          <h2 className="text-base font-bold text-brand-900 mb-2">İletişim</h2>
          <p className="text-sm text-slate-600">
            Sorularınız için{" "}
            <a href="mailto:info@terapirehberi.com" className="text-brand-600 hover:underline font-medium">
              info@terapirehberi.com
            </a>{" "}
            adresine yazabilirsiniz.
          </p>
        </section>

      </div>
    </div>
  );
}
