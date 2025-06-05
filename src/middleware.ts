import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    const token = request.nextauth.token;
    const { pathname } = request.nextUrl;

    // Admin pages access control
    if (pathname.startsWith("/admin")) {
      if (!token || token.role !== "admin") {
        return NextResponse.redirect(
          new URL("/auth/unauthorized", request.url)
        );
      }
    }

    // Protected pages general control
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public pages don't require token
        if (
          pathname.startsWith("/auth") ||
          pathname === "/" ||
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/_next") ||
          pathname.startsWith("/favicon")
        ) {
          return true;
        }

        // All other pages require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Aşağıdaki ile başlayan yollar hariç tüm request path'leri eşleştir:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
