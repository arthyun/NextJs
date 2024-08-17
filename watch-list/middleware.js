import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export const middleware = async (req) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // 로그인 정보 가져오기
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // 로그인 되어있다면 watch-list 페이지로
  if (user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/watch-list', req.url));
  }
  // 로그인되어 있지 않을때 로그인페이지로
  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
};

export const config = {
  matcher: ['/', '/watch-list']
};
