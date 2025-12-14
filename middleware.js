import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const middleware = withAuth(
  function middleware(req) {
    // Check if user is authenticated
    if (!req.nextauth.token) {
      // Redirect to login if trying to access protected routes
      if (req.nextUrl.pathname.startsWith("/form")) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow access if token exists or if accessing public routes
        return true;
      },
    },
  }
);

// Configure which routes to apply middleware to
export const config = {
  matcher: ["/form", "/form/:path*"],
};
