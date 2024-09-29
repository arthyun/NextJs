import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/auth_server';
// import jwt from 'jsonwebtoken';

// POST 메서드
export async function POST(req: NextRequest) {
  /* 현재 next-auth 자체 토큰 시스템을 이용하고 있기에 별도로 토큰을 생성해서 내려주지 않아도 된다. */
  // Token 생성 (조회 결과를 기준으로 가공)
  // const secret = process.env.JWT_SECRET as string;
  // const makeAccessToken = jwt.sign({ name, email }, secret, {
  //   expiresIn: '1m',
  // });
  // const verified: any = jwt.verify(makeAccessToken, secret);
  // console.log('jwt.sign ==> ', makeAccessToken);
  // console.log('jwt.verified ==> ', verified);

  // RequestBody value
  const { email, password } = await req.json();

  // Supabase Connection (auth_server 사용해야함 (권한이 다름))
  const supabase = createClient();

  // 이메일, 비밀번호로 조회
  const { data, error } = await supabase
    .schema('next_auth')
    .from('users')
    .select('*')
    .match({ email: email, password: password });

  // 최종 분기처리
  if (data!.length > 0) {
    // 내려줄 user 데이터중 비밀번호 제외시키기
    const resultData = data![0];
    delete resultData.password;

    // 최종 return 및 (여기서 쿠키 설정시 적용안됌)
    return NextResponse.json({
      status: 200,
      message: 'ok',
      ...resultData,
    });
  } else {
    console.log('조회된 데이터가 없습니다. 에러 메세지 =>', error);
    return NextResponse.json({ status: 500, message: 'failed' });
  }
}
