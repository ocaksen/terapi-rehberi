import Link from "next/link";
import { getAllBlogPostsFromFiles } from "@/lib/blog.server";

export default function Footer() {
  const blogPosts = getAllBlogPostsFromFiles().slice(0, 5);

  return (
    <footer className="bg-brand-900 text-cream-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-sm">

        {/* Marka + açıklama */}
        <div className="sm:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none" className="shrink-0">
              <path d="M15 26 C15 26 15 16 15 13" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M15 13 C15 13 9 17 8 11 C7 6 12 4 15 8" fill="white" opacity="0.8"/>
              <path d="M15 16 C15 16 21 20 22 14 C23 9 18 7 15 11" fill="white" opacity="0.55"/>
            </svg>
            <span className="font-bold text-white text-base">TerapiRehberi</span>
          </div>
          <p className="text-cream-200 leading-relaxed mb-3">
            Konya&apos;da güvenilir psikolog, klinik psikolog ve terapist bulmayı kolaylaştıran bağımsız rehber platformu.
          </p>
          <p className="text-cream-300 leading-relaxed text-xs">
            Bireysel terapi, çift terapisi, ergen psikolojisi ve EMDR gibi alanlarda kimlik ve diploma doğrulamasından geçmiş uzmanlar. Meram, Selçuklu ve Karatay ilçelerinde yüz yüze; Türkiye genelinde online seans seçenekleri.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Konya Psikolog", "Çift Terapisi", "EMDR", "Ergen Psikolojisi"].map((tag) => (
              <span key={tag} className="text-xs bg-brand-800 text-cream-300 px-2.5 py-1 rounded-full border border-brand-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Blog yazıları */}
        <div>
          <p className="font-semibold text-white mb-4">Son Yazılar</p>
          <ul className="space-y-3">
            {blogPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-cream-200 hover:text-white transition-colors leading-snug block"
                >
                  {post.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog" className="text-brand-300 hover:text-white transition-colors font-medium text-xs">
                Tüm yazılar →
              </Link>
            </li>
          </ul>
        </div>

        {/* Kurumsal */}
        <div>
          <p className="font-semibold text-white mb-4">Kurumsal</p>
          <ul className="space-y-3 text-cream-200">
            <li><Link href="/konya/psikologlar" className="hover:text-white transition-colors">Konya Psikologlar</Link></li>
            <li><Link href="/testler" className="hover:text-white transition-colors">Psikolojik Testler</Link></li>
            <li><Link href="/soru-sor" className="hover:text-white transition-colors">Soru Sor</Link></li>
            <li><Link href="/uzman-ol" className="hover:text-white transition-colors">Uzman Ol</Link></li>
            <li><Link href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link></li>
            <li><Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link></li>
            <li><Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
            <li><Link href="/kvkk" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</Link></li>
            <li><Link href="/kullanim-kosullari" className="hover:text-white transition-colors">Kullanım Koşulları</Link></li>
          </ul>
        </div>

      </div>
      <div className="border-t border-brand-800 py-4 text-center text-xs text-cream-300 opacity-60">
        © 2026 TerapiRehberi.com — Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
