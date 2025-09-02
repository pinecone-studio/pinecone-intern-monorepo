import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Read token from cookies (server-side safe)
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/chat', '/home'],
};
