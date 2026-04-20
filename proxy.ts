import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const PROTECTED_PATHS = ['/dashboard'];
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-production';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  /*
  const pathnameWithoutLocale = pathname.replace(/^\/(fr|en)/, '');

  if (PROTECTED_PATHS.some((p) => pathnameWithoutLocale.startsWith(p))) {
    const token = request.cookies.get('pes_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/fr/auth/login', request.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    } catch {
      const response = NextResponse.redirect(new URL('/fr/auth/login', request.url));
      response.cookies.delete('pes_token');
      return response;
    }
  }
*/
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
