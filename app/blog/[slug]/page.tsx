import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAllBlogSlugsFromFiles,
  getBlogPostBySlugFromFile,
  getAllBlogPostsFromFiles,
  type BlogFaq,
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
    title: post.seoTitle ?? post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${siteUrl}/blog/${slug}` },
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

// İnline markdown: bold + linkler
function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function inline(text: string): string {
  return escHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_, linkText, url) => {
        const safe =
          url.startsWith("https://") ||
          url.startsWith("http://") ||
          url.startsWith("/") ||
          url.startsWith("#");
        const safeUrl = safe ? url : "#";
        return `<a href="${safeUrl}" class="text-brand-600 hover:underline font-medium">${linkText}</a>`;
      }
    );
}

// Başlıktaki {#anchor-id} kısmını temizle
function stripAnchorId(text: string): string {
  return text.replace(/\s*\{#[^}]+\}/, "").trim();
}

// Markdown tabloyu HTML'e çevir
function renderTable(block: string, key: number) {
  const lines = block.trim().split("\n").filter((l) => l.trim());
  if (lines.length < 2) return null;
  const headers = lines[0].split("|").map((h) => h.trim()).filter(Boolean);
  const rows = lines.slice(2).map((row) =>
    row.split("|").map((c) => c.trim()).filter(Boolean)
  );
  return (
    <div key={key} className="my-6 overflow-x-auto rounded-xl border border-cream-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-brand-50 text-brand-800 font-semibold">
          <tr>
            {headers.map((h, j) => (
              <th key={j} className="px-4 py-3 border-b border-cream-200">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, j) => (
            <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-cream-50"}>
              {row.map((cell, k) => (
                <td key={k} className="px-4 py-3 text-slate-700 border-b border-cream-100"
                  dangerouslySetInnerHTML={{ __html: inline(cell) }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderContent(body: string) {
  const blocks = body.split("\n\n");
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed || trimmed === "---") return null;

    // Markdown tablosu: | ile başlayan satırları içeriyor
    if (trimmed.includes("|") && trimmed.split("\n").filter((l) => l.includes("|")).length >= 2) {
      return renderTable(trimmed, i);
    }

    if (trimmed.startsWith("## ")) {
      const text = stripAnchorId(trimmed.replace(/^## /, ""));
      return (
        <h2 key={i} className="text-2xl font-bold text-brand-900 mt-10 mb-4 leading-snug">
          {text}
        </h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      const text = stripAnchorId(trimmed.replace(/^### /, ""));
      return (
        <h3 key={i} className="text-lg font-bold text-brand-800 mt-7 mb-3">
          {text}
        </h3>
      );
    }
    if (trimmed.startsWith("- ") || trimmed.includes("\n- ")) {
      const items = trimmed.split("\n").filter((l) => l.trim().startsWith("- "));

      // İçindekiler tablosu (tüm satırlar link ise) — farklı stil
      const isToc = items.every((l) => /\[.+\]\(#.+\)/.test(l));
      if (isToc) {
        return (
          <nav key={i} className="my-6 bg-cream-50 border border-cream-200 rounded-xl px-5 py-4">
            <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-3">İçindekiler</p>
            <ol className="space-y-1.5">
              {items.map((item, j) => (
                <li key={j}>
                  <span
                    className="text-sm text-brand-700 hover:text-brand-900"
                    dangerouslySetInnerHTML={{ __html: inline(item.replace(/^- /, "")) }}
                  />
                </li>
              ))}
            </ol>
          </nav>
        );
      }

      return (
        <ul key={i} className="my-5 space-y-2 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-slate-700 leading-relaxed">
              <span className="text-brand-400 mt-1.5 shrink-0 text-xs">●</span>
              <span
                className="text-[15px]"
                dangerouslySetInnerHTML={{ __html: inline(item.replace(/^- /, "")) }}
              />
            </li>
          ))}
        </ul>
      );
    }
    if (trimmed.match(/^\d+\./)) {
      const items = trimmed.split("\n").filter((l) => l.match(/^\d+\./));
      return (
        <ol key={i} className="my-5 space-y-3 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-slate-700 leading-relaxed">
              <span className="font-bold text-brand-500 shrink-0 w-6 text-[15px]">{j + 1}.</span>
              <span
                className="text-[15px]"
                dangerouslySetInnerHTML={{ __html: inline(item.replace(/^\d+\.\s*/, "")) }}
              />
            </li>
          ))}
        </ol>
      );
    }

    return (
      <p
        key={i}
        className="text-[15px] text-slate-700 leading-[1.8] my-4"
        dangerouslySetInnerHTML={{ __html: inline(trimmed) }}
      />
    );
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlugFromFile(slug);
  if (!post) notFound();

  const siteUrl = "https://www.terapirehberi.com";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image ? `${siteUrl}${post.image}` : `${siteUrl}/images/aile-section.png`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "TerapiRehberi",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "TerapiRehberi",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/aile-section.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${slug}` },
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq: BlogFaq) => ({
      "@type": "Question",
      name: faq.soru,
      acceptedAnswer: { "@type": "Answer", text: faq.cevap },
    })),
  } : null;

  const relatedPosts = getAllBlogPostsFromFiles()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const publishDate = new Date(post.publishedAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-cream-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* ── Hero başlık ── */}
      <div className="bg-white border-b border-cream-200 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-slate-400 mb-5 flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-brand-600 transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-brand-600 font-medium truncate max-w-[150px] sm:max-w-xs">{post.title}</span>
          </nav>

          <span className="inline-block text-xs font-bold text-brand-500 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-brand-900 mb-4 leading-tight max-w-3xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-400">
            <span>{publishDate}</span>
            <span>· {post.readTime} okuma</span>
            <span>· {post.author}</span>
          </div>
        </div>
      </div>

      {/* ── İçerik + Sidebar ── */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex gap-8 items-start">

          {/* Ana içerik */}
          <main className="flex-1 min-w-0">

            {/* Hero görsel */}
            {post.image && (
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 bg-brand-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Özet kutusu */}
            <div className="bg-brand-50 border-l-4 border-brand-400 rounded-r-2xl px-6 py-5 mb-8">
              <p className="text-[15px] text-brand-800 leading-relaxed font-medium">{post.excerpt}</p>
            </div>

            {/* İçerik */}
            <article className="prose-custom">
              {renderContent(post.body)}
            </article>

            {/* CTA — mobil için içerik sonuna */}
            <div className="lg:hidden mt-10 bg-brand-700 rounded-2xl p-6 text-white text-center">
              <p className="font-bold text-lg mb-2">Profesyonel destek almak ister misiniz?</p>
              <p className="text-brand-200 text-sm mb-4">Konya&apos;daki doğrulanmış uzmanlarımızla tanışın.</p>
              <Link
                href="/konya/psikologlar"
                className="bg-white text-brand-700 font-bold px-6 py-3 rounded-xl hover:bg-cream-100 transition-colors inline-block text-sm"
              >
                Psikolog Bul →
              </Link>
            </div>

            {/* Etiketler */}
            {post.keywords && post.keywords.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-xs bg-white border border-cream-200 text-slate-500 px-3 py-1 rounded-full"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}

            {/* İlgili yazılar — mobil */}
            {relatedPosts.length > 0 && (
              <div className="lg:hidden mt-10">
                <h2 className="font-bold text-brand-900 mb-4">Diğer Yazılar</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.slice(0, 2).map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="bg-white rounded-2xl border border-cream-200 p-4 flex flex-col gap-2 group hover:shadow-md transition-shadow"
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
          </main>

          {/* Sidebar — sadece lg+ */}
          <aside className="hidden lg:flex flex-col gap-6 w-72 shrink-0 sticky top-24">

            {/* CTA */}
            <div className="bg-brand-700 rounded-2xl p-5 text-white">
              <p className="font-bold text-base mb-1">Profesyonel destek almak ister misiniz?</p>
              <p className="text-brand-200 text-xs mb-4 leading-relaxed">
                Konya&apos;da kimlik ve diploma doğrulamalı uzmanlar.
              </p>
              <Link
                href="/konya/psikologlar"
                className="block bg-white text-brand-700 font-bold px-4 py-2.5 rounded-xl hover:bg-cream-100 transition-colors text-center text-sm"
              >
                Psikolog Bul →
              </Link>
            </div>

            {/* Hızlı bağlantılar */}
            <div className="bg-white rounded-2xl border border-cream-200 p-5">
              <p className="font-semibold text-brand-900 text-sm mb-3">Uzmanlık Alanları</p>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "Bireysel Terapi", href: "/konya/bireysel-terapi" },
                  { label: "Çift Terapisi", href: "/konya/cift-terapisi" },
                  { label: "Ergen Psikolojisi", href: "/konya/ergen-psikolojisi" },
                  { label: "Aile Terapisi", href: "/konya/aile-terapisi" },
                  { label: "EMDR", href: "/konya/emdr" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-brand-700 hover:text-brand-900 hover:bg-brand-50 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    → {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* İlgili yazılar */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl border border-cream-200 p-5">
                <p className="font-semibold text-brand-900 text-sm mb-3">Diğer Yazılar</p>
                <div className="flex flex-col gap-3">
                  {relatedPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group block"
                    >
                      <span className="text-xs font-semibold text-brand-400 uppercase block mb-0.5">
                        {p.category}
                      </span>
                      <span className="text-sm text-slate-700 leading-snug group-hover:text-brand-600 transition-colors font-medium">
                        {p.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>

        </div>
      </div>
    </div>
  );
}
