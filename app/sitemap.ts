import type { MetadataRoute } from "next";
import { getAllExperts, getAllBlogPosts, getAllServices } from "@/lib/data";

const BASE = "https://www.terapirehberi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const experts = getAllExperts();
  const posts = getAllBlogPosts();
  const services = getAllServices();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/konya`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/konya/psikologlar`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/konya/meram`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/konya/selcuklu`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/konya/karatay`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/uzman-ol`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
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
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...expertRoutes, ...blogRoutes];
}
