import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/admin", "/profile"];
const authRoutes = ["/auth/login", "/auth/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const storedUser = request.cookies.get("user")?.value;

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (request.nextUrl.pathname.startsWith("/admin")) {
        if (user.status !== "admin") {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
