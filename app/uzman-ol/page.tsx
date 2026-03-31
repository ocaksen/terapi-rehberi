import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uzman Ol — TerapiRehberi'ne Katıl",
  description: "Psikolog veya terapist misiniz? TerapiRehberi platformuna katılın, danışan tabanınızı genişletin.",
};

export default function UzmanOlPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <p className="section-label mb-3">Profesyoneller İçin</p>
      <h1 className="text-3xl font-bold text-brand-900 mb-4">
        TerapiRehberi'ne Katıl
      </h1>
      <p className="text-slate-600 leading-relaxed mb-8">
        Platforma ücretsiz profil ekleyin. Konya'da sizi arayan danışanlarla buluşun.
        Başvurunuz 48 saat içinde değerlendirilir.
      </p>

      <form className="card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">Ad Soyad *</label>
          <input type="text" className="w-full border border-cream-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400" placeholder="Dr. Adı Soyadı" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">Ünvan *</label>
          <input type="text" className="w-full border border-cream-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400" placeholder="Klinik Psikolog / Psikolog / Danışman" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">E-posta *</label>
          <input type="email" className="w-full border border-cream-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400" placeholder="ornek@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">Telefon</label>
          <input type="tel" className="w-full border border-cream-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400" placeholder="+90 5xx xxx xx xx" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">Şehir / İlçe *</label>
          <input type="text" className="w-full border border-cream-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400" placeholder="Konya — Meram" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">Kısa Biyografi</label>
          <textarea rows={3} className="w-full border border-cream-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400 resize-none" placeholder="Uzmanlık alanlarınızı ve yaklaşımınızı kısaca anlatın." />
        </div>
        <button type="submit" className="btn-primary w-full">
          Başvuru Gönder →
        </button>
        <p className="text-xs text-slate-400 text-center">
          Başvurunuz 48 saat içinde yanıtlanır. Profil yayına almak ücretsizdir.
        </p>
      </form>
    </div>
  );
}
