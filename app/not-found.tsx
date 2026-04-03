import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı — TerapiRehberi",
  description: "Aradığınız sayfa bulunamadı.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="text-7xl font-black text-brand-100 mb-2 leading-none">404</div>
        <h1 className="text-2xl font-bold text-brand-900 mb-3">Sayfa bulunamadı</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Ana Sayfaya Dön
          </Link>
          <Link href="/konya/psikologlar" className="btn-outline">
            Psikolog Bul
          </Link>
        </div>
        <div className="mt-10 pt-8 border-t border-cream-200">
          <p className="text-xs text-slate-400 mb-3">Popüler sayfalar</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: "Blog", href: "/blog" },
              { label: "Psikolojik Testler", href: "/testler" },
              { label: "Soru Sor", href: "/soru-sor" },
              { label: "Uzman Ol", href: "/uzman-ol" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-full transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
