import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/auth_server';
import path from 'path';
import fs from 'fs';

// POST 메서드
export async function POST(req: NextRequest) {
  // RequestBody value
  const formData = await req.formData();
  const nick_name = formData.get('nick_name');
  const email = formData.get('email');
  const password = formData.get('password');
  const file = formData.get('file');

  // File 처리
  const UPLOAD_DIR = path.resolve(process.cwd(), 'public/uploads');
  if (file instanceof File) {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }
    fs.writeFileSync(path.resolve(UPLOAD_DIR, file.name), buffer);
  }

  // Supabase Connection (auth_server 사용해야함 (권한이 다름))
  const supabase = createClient();

  // 이메일, 비밀번호로 조회
  const { data, error } = await supabase
    .schema('next_auth')
    .from('users')
    .insert([
      {
        name: nick_name,
        email: email,
        password: password,
        image: file instanceof File && file.name,
      },
    ])
    .select('*');

  // 최종 분기처리
  if (data!.length > 0) {
    return NextResponse.json({
      status: 200,
      message: 'ok',
    });
  } else {
    console.log('회원가입 실패, 에러 메세지 =>', error);
    return NextResponse.json({ status: 500, message: 'failed' });
  }
}
