import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPostsFromFiles } from "@/lib/blog.server";

export const metadata: Metadata = {
  title: "Psikoloji & Terapi Blog — Konya Uzman İçerikleri | TerapiRehberi",
  description: "Kaygı, depresyon, çift terapisi, ergen psikolojisi ve daha fazlası hakkında uzman içerikler. Konya'dan klinik psikologlar tarafından yazıldı.",
  keywords: ["psikoloji blog", "terapi rehberi", "konya psikolog blog", "kaygı depresyon", "çocuk psikolojisi yazıları"],
  alternates: { canonical: "https://www.terapirehberi.com/blog" },
  openGraph: {
    title: "Psikoloji & Terapi Blog — Konya Uzman İçerikleri",
    description: "Kaygı, depresyon, çift terapisi ve ergen psikolojisi hakkında Konya psikologlarından uzman içerikler.",
    url: "https://www.terapirehberi.com/blog",
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://www.terapirehberi.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.terapirehberi.com/blog" },
  ],
};

export default function BlogPage() {
  const posts = getAllBlogPostsFromFiles();

  return (
    <div className="min-h-screen bg-cream-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="bg-white border-b border-cream-200 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-2">Rehber İçerik</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Blog</h1>
          <p className="text-slate-500 mt-2 text-sm">
            {posts.length} yazı · Konya'dan uzman psikologlar tarafından
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-2xl border border-cream-200 shadow-sm p-5 flex flex-col gap-3 group hover:shadow-md transition-shadow"
            >
              {post.image && (
                <div className="w-full h-40 rounded-xl overflow-hidden bg-cream-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <span className="text-xs font-semibold text-brand-500 uppercase tracking-wide">
                {post.category}
              </span>
              <h2 className="font-semibold text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-cream-100">
                <span>{new Date(post.publishedAt).toLocaleDateString("tr-TR", { day: "2-digit", month: "long" })}</span>
                <span className="text-brand-500 font-medium">· {post.readTime} okuma</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bilgi bölümü */}
        <div className="border-t border-cream-200 mt-10 pt-8">
          <h2 className="text-base font-bold text-slate-900 mb-4">Bu Blog Hakkında</h2>
          <div className="grid sm:grid-cols-3 gap-5 text-sm text-slate-600 leading-relaxed">
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Kim yazıyor?</h3>
              <p>Yazılar Konya&apos;daki lisanslı klinik psikolog ve terapistler ile TerapiRehberi editör ekibi tarafından hazırlanmaktadır. Klinik içerikler uzman incelemesinden geçmektedir.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Konular</h3>
              <p>Kaygı ve panik atak, depresyon, çocuk ve ergen psikolojisi, çift terapisi, aile ilişkileri, stres yönetimi, travma ve psikoterapi süreci hakkında kanıta dayalı rehber içerikler.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Önemli not</h3>
              <p>Blog içerikleri genel bilgilendirme amacıyla hazırlanmıştır; klinik tanı veya tedavi yerine geçmez. Kişisel durumunuz için bir uzmana danışmanızı öneririz.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
