import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRevvMemberCookieName, hasValidRevvMemberSessionValue } from "./lib/revv-site";

const publicPaths = ["/", "/members/login", "/success"];
const publicApiPaths = ["/api/revv/waitlist", "/api/revv/member/login", "/api/revv/member/logout"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const revvMemberSession = request.cookies.get(getRevvMemberCookieName())?.value;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (publicPaths.some((path) => pathname === path) || publicApiPaths.some((path) => pathname === path)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/members")) {
    if (hasValidRevvMemberSessionValue(revvMemberSession)) {
      return NextResponse.next();
    }

    const memberLoginUrl = new URL("/members/login", request.url);
    memberLoginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(memberLoginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
