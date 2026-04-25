import { NextRequest, NextResponse } from "next/server";

function htmlToMarkdown(html: string): string {
  let md = html;

  // Remove non-content blocks
  md = md.replace(/<head[\s\S]*?<\/head>/gi, "");
  md = md.replace(/<script[\s\S]*?<\/script>/gi, "");
  md = md.replace(/<style[\s\S]*?<\/style>/gi, "");
  md = md.replace(/<nav[\s\S]*?<\/nav>/gi, "");
  md = md.replace(/<footer[\s\S]*?<\/footer>/gi, "");

  // Headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n");
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n");
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n");
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n");
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "\n##### $1\n");
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "\n###### $1\n");

  // Inline formatting
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*");
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*");

  // Links — prefer absolute href
  md = md.replace(/<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");

  // Lists
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1");

  // Block elements
  md = md.replace(/<br\s*\/?>/gi, "\n");
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n\n$1\n\n");
  md = md.replace(/<(?:div|section|article|main)[^>]*>/gi, "\n");
  md = md.replace(/<\/(?:div|section|article|main)>/gi, "\n");

  // Strip remaining tags
  md = md.replace(/<[^>]+>/g, "");

  // HTML entities
  md = md
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");

  // Clean up whitespace
  md = md.replace(/\n{3,}/g, "\n\n").trim();

  return md;
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "/";
  const origin = request.nextUrl.origin;

  const res = await fetch(`${origin}${path}`, {
    headers: {
      Accept: "text/html",
      "x-md-internal": "1",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return new NextResponse("Not found", { status: res.status });
  }

  const html = await res.text();
  const markdown = htmlToMarkdown(html);
  const tokens = estimateTokens(markdown);

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokens),
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    },
  });
}
