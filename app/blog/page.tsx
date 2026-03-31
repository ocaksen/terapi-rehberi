import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Psikoloji Rehberi",
  description: "Kaygı, depresyon, çift terapisi ve daha fazlası hakkında uzman içerikler.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <p className="section-label mb-2">Rehber İçerik</p>
      <h1 className="text-3xl font-bold text-brand-900 mb-10">Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card p-5 flex flex-col gap-3 group hover:shadow-md transition-shadow"
          >
            <span className="text-xs font-semibold text-brand-500 uppercase tracking-wide">
              {post.category}
            </span>
            <h2 className="font-semibold text-brand-900 leading-snug group-hover:text-brand-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed flex-1">{post.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{new Date(post.publishedAt).toLocaleDateString("tr-TR")}</span>
              <span className="text-brand-500 font-medium">Oku →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
