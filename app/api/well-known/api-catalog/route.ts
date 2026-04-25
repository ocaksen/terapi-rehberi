import { NextResponse } from "next/server";

const BASE = "https://www.terapirehberi.com";
const CATALOG = `${BASE}/.well-known/api-catalog`;

// RFC 9727 + RFC 9264 — application/linkset+json
const linkset = {
  linkset: [
    {
      anchor: CATALOG,
      profile: [{ href: "https://www.rfc-editor.org/info/rfc9727" }],
      item: [
        { href: `${BASE}/api/soru-sor`, type: "application/json" },
        { href: `${BASE}/api/basvuru`,  type: "application/json" },
        { href: `${BASE}/api/oy`,       type: "application/json" },
        { href: `${BASE}/api/md`,       type: "text/markdown"    },
      ],
    },
    {
      anchor: `${BASE}/api/soru-sor`,
      "service-doc": [{ href: `${BASE}/soru-sor`, type: "text/html" }],
      status:        [{ href: `${BASE}/api/health`, type: "application/json" }],
    },
    {
      anchor: `${BASE}/api/basvuru`,
      "service-doc": [{ href: `${BASE}/uzman-ol`, type: "text/html" }],
      status:        [{ href: `${BASE}/api/health`, type: "application/json" }],
    },
    {
      anchor: `${BASE}/api/oy`,
      "service-doc": [{ href: `${BASE}/soru-sor`, type: "text/html" }],
      status:        [{ href: `${BASE}/api/health`, type: "application/json" }],
    },
    {
      anchor: `${BASE}/api/md`,
      "service-doc": [{ href: `${BASE}/hakkimizda`, type: "text/html" }],
      status:        [{ href: `${BASE}/api/health`, type: "application/json" }],
    },
  ],
};

export async function GET() {
  return new NextResponse(JSON.stringify(linkset), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
