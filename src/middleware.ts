import { NextRequest, NextResponse } from "next/server";

const TARGET_URL = "https://docs-dev.mintlify.builders";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const targetUrl = new URL(url.pathname + url.search, TARGET_URL);
  const host = request.headers.get("host") || "";

  const headers = new Headers(request.headers);
  headers.set("x-forwarded-host", host);
  headers.set("host", host);

  return NextResponse.rewrite(targetUrl, {
    request: { headers },
  });
}

export const config = {
  matcher: ["/:path*"],
};
