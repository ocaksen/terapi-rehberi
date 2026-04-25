import { NextResponse } from "next/server";

// RFC 9728 — OAuth Protected Resource Metadata
// Public APIs require no token; authorization_servers is empty by design.
const metadata = {
  resource: "https://www.terapirehberi.com",
  authorization_servers: [],
  bearer_methods_supported: ["header"],
  scopes_supported: [],
  resource_documentation: "https://www.terapirehberi.com/.well-known/api-catalog",
};

export async function GET() {
  return new NextResponse(JSON.stringify(metadata), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
