import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { createClient } from '@/helpers/supabase/supabaseServer';
import { updateSession } from '@/helpers/supabase/supabaseMiddleware';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const isAuthPage = req.nextUrl.pathname === '/admin' || req.nextUrl.pathname === '/admin/callback';

  if (!user && req.nextUrl.pathname.startsWith('/admin') && !isAuthPage) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  await updateSession(req);

  return res;
};

export const config = {
  matcher: '/admin/:path*',
};
