import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication and their roles (optional role check logic can be added)
const protectedRoutes = ['/admin', '/petani', '/pemerintah', '/dashboard'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('session_token')?.value;

    console.log(`Middleware tracing: ${pathname} [Token: ${token ? 'YES' : 'NO'}]`);

    // 1. Check if the user is trying to access a protected route
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtectedRoute && !token) {
        console.log(`Redirecting to /login: ${pathname}`);
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api/|_next/static/|_next/image/|favicon.ico).*)',
    ],
};
