import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/billing") ||
    pathname.startsWith("/profile");

  // 🔥 CASE 1: belum login → protect route
  if (isProtected && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 🔥 CASE 2: sudah login → jangan ke login page lagi
  if (pathname === "/login" && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
