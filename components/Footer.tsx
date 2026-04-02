import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-cream-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none" className="shrink-0">
              <path d="M15 26 C15 26 15 16 15 13" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M15 13 C15 13 9 17 8 11 C7 6 12 4 15 8" fill="white" opacity="0.8"/>
              <path d="M15 16 C15 16 21 20 22 14 C23 9 18 7 15 11" fill="white" opacity="0.55"/>
            </svg>
            <span className="font-bold text-white text-base">TerapiRehberi</span>
          </div>
          <p className="text-cream-200 leading-relaxed">
            Konya'da güvenilir psikolog, terapist ve destek uzmanı rehberi.
          </p>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">Şehirler</p>
          <ul className="space-y-2 text-cream-200">
            <li><Link href="/konya" className="hover:text-white transition-colors">Konya</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">Kurumsal</p>
          <ul className="space-y-2 text-cream-200">
            <li><Link href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link></li>
            <li><Link href="/uzman-ol" className="hover:text-white transition-colors">Uzman Ol</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link></li>
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
