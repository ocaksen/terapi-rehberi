import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-cream-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🌿</span>
            <span className="font-bold text-white text-base">TerapiRehberi</span>
          </div>
          <p className="text-cream-200 leading-relaxed">
            Türkiye genelinde güvenilir psikolog ve terapist rehberi.
          </p>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">Şehirler</p>
          <ul className="space-y-2 text-cream-200">
            <li><Link href="/konya" className="hover:text-white transition-colors">Konya</Link></li>
            <li><span className="opacity-50">Kayseri (Yakında)</span></li>
            <li><span className="opacity-50">Eskişehir (Yakında)</span></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">Kurumsal</p>
          <ul className="space-y-2 text-cream-200">
            <li><Link href="/uzman-ol" className="hover:text-white transition-colors">Uzman Ol</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-800 py-4 text-center text-xs text-cream-200 opacity-60">
        © 2026 TerapiRehberi.com — Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
