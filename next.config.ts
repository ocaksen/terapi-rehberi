import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://randomuser.me https://www.google-analytics.com https://www.feyzacaksen.com https://ui-avatars.com https://*.amazonaws.com",
      "connect-src 'self' https://www.google-analytics.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "www.feyzacaksen.com" },
      { protocol: "https", hostname: "www.terapirehberi.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "terapirehberi.com" }],
        destination: "https://www.terapirehberi.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*.php",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/konya/psikolog",
        destination: "/konya/psikologlar",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    // Next.js App Router skips dot-prefixed directories, so .well-known routes
    // are served from /api/well-known/* and rewritten here.
    return [
      {
        source: "/.well-known/api-catalog",
        destination: "/api/well-known/api-catalog",
      },
      {
        source: "/.well-known/oauth-protected-resource",
        destination: "/api/well-known/oauth-protected-resource",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              '</.well-known/agent-skills/index.json>; rel="agent-skills"',
              '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
              '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
              '</sitemap.xml>; rel="sitemap"; type="application/xml"',
            ].join(", "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
