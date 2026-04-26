import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // PHP → 410 Gone
  if (pathname.endsWith(".php") || pathname.includes(".php?")) {
    return new NextResponse(null, { status: 410 });
  }

  // Markdown content negotiation — RFC 8288 / agent discovery
  // Internal fetches from /api/md carry x-md-internal to prevent loops.
  const accept = request.headers.get("accept") ?? "";
  const isInternal = request.headers.get("x-md-internal") === "1";

  if (
    !isInternal &&
    accept.includes("text/markdown") &&
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/_next/")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/api/md";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*.php",
    "/:path*.php\\?:query*",
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
