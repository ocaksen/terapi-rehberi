import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogFaq {
  soru: string;
  cevap: string;
}

export interface BlogPostFull {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  keywords: string[];
  category: string;
  author: string;
  publishedAt: string;
  image?: string;
  body: string;
  readTime: string;
  faqs?: BlogFaq[];
}

function estimateReadTime(body: string): string {
  const words = body.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} dk`;
}

function resolveImage(slug: string, frontmatterImage?: string): string | undefined {
  // 1. Frontmatter'da açıkça belirtilmişse kullan
  if (frontmatterImage) return frontmatterImage;
  // 2. Local görsel var mı? (.jpg, .png, .webp sırasıyla dene)
  for (const ext of ["jpg", "png", "webp"]) {
    const localPath = path.join(process.cwd(), "public", "images", "blog", `${slug}.${ext}`);
    if (fs.existsSync(localPath)) return `/images/blog/${slug}.${ext}`;
  }
  return undefined;
}

function getSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllBlogPostsFromFiles(): Omit<BlogPostFull, "body">[] {
  return getSlugs()
    .map((slug) => {
      const filePath = path.join(BLOG_DIR, `${slug}.md`);
      const raw = fs.readFileSync(filePath, "utf-8").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      const { data, content } = matter(raw);
      const excerpt =
        data.excerpt ||
        content.replace(/#{1,6}\s.*\n/g, "").trim().slice(0, 160) + "…";
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? excerpt,
        excerpt,
        keywords: data.keywords ?? [],
        category: data.category ?? "Genel",
        author: data.author ?? "TerapiRehberi Editör",
        publishedAt: data.publishedAt ?? new Date().toISOString().split("T")[0],
        image: resolveImage(slug, data.image),
        readTime: estimateReadTime(content),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getBlogPostBySlugFromFile(
  slug: string
): BlogPostFull | undefined {
  // Path traversal koruması — yalnızca a-z, 0-9, tire kabul et
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const { data, content } = matter(raw);
  const excerpt =
    data.excerpt ||
    content.replace(/#{1,6}\s.*\n/g, "").trim().slice(0, 160) + "…";
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? excerpt,
    excerpt,
    keywords: data.keywords ?? [],
    category: data.category ?? "Genel",
    author: data.author ?? "TerapiRehberi Editör",
    publishedAt: data.publishedAt ?? new Date().toISOString().split("T")[0],
    image: resolveImage(slug, data.image),
    body: content,
    readTime: estimateReadTime(content),
    faqs: data.faqs ?? [],
  };
}

export function getAllBlogSlugsFromFiles(): string[] {
  return getSlugs();
}
