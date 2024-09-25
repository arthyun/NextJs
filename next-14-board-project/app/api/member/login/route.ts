import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/auth_server';
import jwt from 'jsonwebtoken';

// POST 메서드
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  //   console.log(email, password);

  // Supabase Connection (auth_server 사용해야함 (권한이 다름))
  const supabase = createClient();

  // 새글 insert (안보낸 항목은 디폴트값 있어서임)
  const { data } = await supabase
    .schema('next_auth')
    .from('users')
    .select('*')
    .eq('email', email);

  if (data!.length > 0) {
    // 조회 결과
    const { name, email } = data![0];

    // Token 생성 (조회 결과를 기준으로 가공)
    const secret = process.env.JWT_SECRET as string;
    const makeAccessToken = jwt.sign({ name, email }, secret, {
      expiresIn: '1m',
    });
    // const verified: any = jwt.verify(makeAccessToken, secret);
    // console.log('jwt.sign ==> ', makeAccessToken);
    // console.log('jwt.verified ==> ', verified);

    // 최종 return 및 (여기서 쿠키 설정시 적용안됌)
    return NextResponse.json({
      status: 200,
      message: 'ok',
      accessToken: makeAccessToken,
      ...data![0],
    });
  } else {
    console.log('조회된 데이터가 없습니다.');
    return NextResponse.json({ message: 'failed', status: 500 });
  }
}
