import db from "@/data/db.json";
import type { Expert, Service, City, BlogPost } from "@/types";

export function getAllExperts(): Expert[] {
  return db.experts as Expert[];
}

export function getFeaturedExperts(): Expert[] {
  return (db.experts as Expert[]).filter((e) => e.featured);
}

export function getExpertsByCity(citySlug: string): Expert[] {
  return (db.experts as Expert[]).filter((e) => e.city === citySlug);
}

export function getExpertBySlug(slug: string): Expert | undefined {
  return (db.experts as Expert[]).find((e) => e.slug === slug);
}

export function getAllServices(): Service[] {
  return db.services as Service[];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return (db.services as Service[]).find((s) => s.slug === slug);
}

export function getAllCities(): City[] {
  return db.cities as City[];
}

export function getCityBySlug(slug: string): City | undefined {
  return (db.cities as City[]).find((c) => c.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return db.blogPosts as BlogPost[];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return (db.blogPosts as BlogPost[]).find((p) => p.slug === slug);
}
