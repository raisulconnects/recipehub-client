import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(req) {
  try {
    const path = req.nextUrl.pathname;

    let session;
    try {
      session = await auth.api.getSession({ headers: req.headers });
    } catch {
      session = null;
    }

    const isDashboardRoute = path.startsWith("/dashboard");
    const isAdminRoute = path.startsWith("/admin");
    const isAuthRoute = path === "/login" || path === "/register";

    if (isDashboardRoute && !session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAdminRoute) {
      if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (session.user.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    if (isAuthRoute && session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api/auth|favicon.ico|.*\\.png$).*)",
  ],
};
