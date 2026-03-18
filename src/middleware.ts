import { NextRequest, NextResponse } from 'next/server';
import { decrypt, TOKEN_NAME } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(TOKEN_NAME)?.value;

  // Define paths that are always accessible
  const isPublicPage = request.nextUrl.pathname === '/';
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/signup');
  const isPublicAsset = request.nextUrl.pathname.startsWith('/_next') || 
                        request.nextUrl.pathname.includes('.');

  if (isPublicAsset) {
    return NextResponse.next();
  }

  if (isAuthPage) {
    if (session) {
      try {
        await decrypt(session);
        // If valid session, redirect away from login/signup to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch (e) {
        // Invalid session, let them stay on auth page
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // Protected routes check
  // Any route that is not a public page or auth page is protected
  const isProtectedRoute = !isPublicPage && !isAuthPage;

  if (isProtectedRoute) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      await decrypt(session);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
