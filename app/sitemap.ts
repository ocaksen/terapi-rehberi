import type { MetadataRoute } from "next";
import { getAllExperts, getAllServices } from "@/lib/data";
import { getAllBlogPostsFromFiles } from "@/lib/blog.server";

const BASE = "https://www.terapirehberi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const experts = getAllExperts();
  const posts = getAllBlogPostsFromFiles();
  const services = getAllServices();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/konya`,                   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/konya/psikologlar`,       lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/konya/meram`,             lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/konya/selcuklu`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/konya/karatay`,           lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/konya/eregli`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/konya/aksehir`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/konya/kulu`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/konya/beysehir`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/konya/seydisehir`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/konya/cihanbeyli`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/konya/cumra`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/konya/oyun-ablasi`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/testler`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/soru-sor`,               lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/uzman-ol`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/hakkimizda`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/iletisim`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/konya/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const expertRoutes: MetadataRoute.Sitemap = experts.map((e) => ({
    url: `${BASE}/uzman/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: e.featured ? 0.8 : 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const ILCE_SLUGS = ["meram", "selcuklu", "karatay"];
  const comboRoutes: MetadataRoute.Sitemap = ILCE_SLUGS.flatMap((ilce) =>
    services.map((s) => ({
      url: `${BASE}/konya/${ilce}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }))
  );

  return [...staticRoutes, ...serviceRoutes, ...comboRoutes, ...expertRoutes, ...blogRoutes];
}
