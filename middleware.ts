import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Redirect authenticated users away from auth pages
    if (req.nextUrl.pathname.startsWith('/sign-in') && req.nextauth.token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Add CORS headers for API routes
    if (req.nextUrl.pathname.startsWith('/api/')) {
      const response = NextResponse.next();
      response.headers.append('Access-Control-Allow-Origin', '*');
      response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return response;
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to auth pages without a token
        if (req.nextUrl.pathname.startsWith('/sign-in')) {
          return true;
        }
        
        // Require token for protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/agents/:path*',
    '/calls/:path*',
    '/sign-in',
    '/api/:path*',
    // Add other protected routes here
  ],
};
