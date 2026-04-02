import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllBlogSlugsFromFiles,
  getBlogPostBySlugFromFile,
  getAllBlogPostsFromFiles,
} from "@/lib/blog.server";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugsFromFiles().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlugFromFile(slug);
  if (!post) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.terapirehberi.com";
  const ogImage = `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&author=${encodeURIComponent(post.author)}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

function renderContent(body: string) {
  const paragraphs = body.split("\n\n");
  return paragraphs.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-xl font-bold text-brand-900 mt-8 mb-3">
          {block.replace(/^## /, "")}
        </h2>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="text-base font-bold text-brand-800 mt-5 mb-2">
          {block.replace(/^### /, "")}
        </h3>
      );
    }
    if (block.startsWith("- ") || block.includes("\n- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="space-y-2 my-3 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
              <span className="text-brand-400 mt-1 shrink-0">•</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ul>
      );
    }
    if (block.match(/^\d+\./)) {
      const items = block.split("\n").filter((l) => l.match(/^\d+\./));
      return (
        <ol key={i} className="space-y-2 my-3 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
              <span className="font-bold text-brand-500 shrink-0 w-5">{j + 1}.</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ol>
      );
    }
    if (block.trim() && !block.startsWith("---")) {
      return (
        <p
          key={i}
          className="text-slate-600 leading-relaxed text-sm my-3"
          dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
        />
      );
    }
    return null;
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlugFromFile(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPostsFromFiles()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ── Başlık ── */}
      <div className="bg-white border-b border-cream-200 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <nav className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-brand-600">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand-600">Blog</Link>
            <span>/</span>
            <span className="text-brand-600 font-medium truncate">{post.title}</span>
          </nav>

          <span className="text-xs font-semibold text-brand-500 uppercase tracking-widest">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold text-brand-900 mt-2 mb-4 leading-snug">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>{new Date(post.publishedAt).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>· {post.readTime} okuma</span>
            <span>· {post.author}</span>
          </div>
        </div>
      </div>

      {/* ── İçerik ── */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 sm:p-8 mb-8">
          <div className="bg-brand-50 border-l-4 border-brand-400 rounded-r-xl p-4 mb-6">
            <p className="text-sm text-brand-800 leading-relaxed font-medium">{post.excerpt}</p>
          </div>
          <div>{renderContent(post.body)}</div>
        </div>

        {/* CTA */}
        <div className="bg-brand-700 rounded-2xl p-6 text-white text-center mb-8">
          <h2 className="font-bold text-lg mb-2">Profesyonel destek almak ister misiniz?</h2>
          <p className="text-brand-200 text-sm mb-4">Konya'daki doğrulanmış uzmanlarımızla tanışın.</p>
          <Link
            href="/konya/psikologlar"
            className="bg-white text-brand-700 font-bold px-6 py-3 rounded-xl hover:bg-cream-100 transition-colors inline-block"
          >
            Psikolog Bul →
          </Link>
        </div>

        {/* Diğer yazılar */}
        {allPosts.length > 0 && (
          <div>
            <h2 className="font-bold text-brand-900 mb-4">Diğer Yazılar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-white rounded-2xl border border-cream-200 shadow-sm p-4 flex flex-col gap-2 group hover:shadow-md transition-shadow"
                >
                  <span className="text-xs font-semibold text-brand-500 uppercase">{p.category}</span>
                  <h3 className="text-sm font-semibold text-brand-900 leading-snug group-hover:text-brand-600 transition-colors">
                    {p.title}
                  </h3>
                  <span className="text-xs text-brand-500 font-medium mt-auto">Oku →</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
