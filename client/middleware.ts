import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const access_token = cookieStore.get("access_token")?.value ?? "";
  const { pathname } = request.nextUrl;
  const JWT_SECRET = "23df230cec6e8d2aa5a9f3591b5e83863e6e17d332f352120ed7f3d6931c2d82";
  const isAuthenticate = await validateToken(access_token, JWT_SECRET);
  if (
    (pathname.startsWith("/auth") || pathname.endsWith("/")) &&
    isAuthenticate
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (pathname.startsWith("/dashboard") && !isAuthenticate) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
