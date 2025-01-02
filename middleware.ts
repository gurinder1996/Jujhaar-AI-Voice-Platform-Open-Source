import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// This function will be executed before withAuth
function middleware(req) {
  const { pathname } = req.nextUrl;
  const isAuthPage = pathname.startsWith('/sign-in');
  const isPublicPage = pathname.startsWith('/api/auth') || pathname.startsWith('/auth/callback');

  // If it's an auth page and user is authenticated, redirect to dashboard
  if (isAuthPage && req.nextauth?.token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If it's a public page, allow access
  if (isPublicPage) {
    return NextResponse.next();
  }

  // If user is not authenticated and not on an auth page, redirect to sign-in
  if (!req.nextauth?.token && !isAuthPage) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Add CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    response.headers.append('Access-Control-Allow-Origin', '*');
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }

  return NextResponse.next();
}

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;
      // Allow access to auth pages without a token
      if (pathname.startsWith('/sign-in') || pathname.startsWith('/api/auth') || pathname.startsWith('/auth/callback')) {
        return true;
      }
      // Require token for all other routes
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    // Protected routes
    '/dashboard/:path*',
    '/settings/:path*',
    '/agents/:path*',
    '/calls/:path*',
    // Auth routes
    '/sign-in',
    // API routes
    '/api/:path*',
    // Root route
    '/',
  ],
};
