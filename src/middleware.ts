import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  const isAuthPage = req.nextUrl.pathname === '/admin' || req.nextUrl.pathname === '/admin/callback';

  if (!session && req.nextUrl.pathname.startsWith('/admin') && !isAuthPage) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return res;
};

export const config = {
  matcher: '/admin/:path*',
};
