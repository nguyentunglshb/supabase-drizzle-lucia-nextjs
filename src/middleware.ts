// middleware.ts
import { verifyRequestOrigin } from 'lucia';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutesRegex = [new RegExp(/^\/post/gm)];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const authCookie = request.cookies.get('auth_session');

  const nextUrlIsProtected = protectedRoutesRegex.some((regex) =>
    regex.test(request.nextUrl.pathname)
  );

  if (!authCookie?.value && nextUrlIsProtected) {
    const absoluteURL = new URL('/login', request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (request.method === 'GET') {
    return NextResponse.next();
  }
  const originHeader = request.headers.get('Origin');
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = request.headers.get('Host');
  if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return NextResponse.next();
}
