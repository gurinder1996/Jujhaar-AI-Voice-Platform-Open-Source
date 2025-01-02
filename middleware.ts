import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// This function will be executed before withAuth
function middleware(req) {
  const { pathname } = req.nextUrl;
  
  // Public paths that don't need auth
  const isPublicPath = pathname.startsWith('/sign-in') || 
                      pathname.startsWith('/sign-up') || 
                      pathname.startsWith('/api/auth') || 
                      pathname.startsWith('/auth/callback');

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (req.nextauth?.token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If user is not authenticated and trying to access protected routes
  if (!req.nextauth?.token && !isPublicPath) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
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
      // Allow access to public paths without a token
      if (pathname.startsWith('/sign-in') || 
          pathname.startsWith('/sign-up') || 
          pathname.startsWith('/api/auth') || 
          pathname.startsWith('/auth/callback')) {
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
    '/sign-up',
    // API routes
    '/api/:path*',
    // Root route
    '/',
  ],
};
