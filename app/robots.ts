import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/api/", "/_next/", "/admin/"],
    },
    sitemap: "https://www.terapirehberi.com/sitemap.xml",
  };
}
