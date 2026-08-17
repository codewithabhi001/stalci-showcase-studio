import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("stalci_admin")?.value;
  const isAuthenticated = authCookie === "authenticated";

  const isPublicRoute = pathname === "/login";

  // If user is NOT authenticated and trying to access protected admin panel routes
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user IS authenticated and trying to access login page
  if (isAuthenticated && isPublicRoute) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (/api/...)
     * - Next.js internal static files (_next/static, _next/image)
     * - Static assets (favicon.ico, favicon.svg, images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
