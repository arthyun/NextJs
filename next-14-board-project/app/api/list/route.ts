import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';

// GET 메서드
export async function GET(req: NextRequest) {
  // // 헤더 토큰 확인 (테스트)
  // const authHeader = req.headers.get('authrization');
  // console.log(authHeader);

  // Supabase Connection
  const supabase = createClient();

  // Exist Query String (검색 시)
  if (req.nextUrl.search !== '') {
    const searchParams = req.nextUrl.searchParams;
    if (searchParams.get('search') !== null) {
      const { data: board, error } = await supabase
        .from('board')
        .select('*')
        .like('title', `%${searchParams.get('search')}%`)
        .order('seq', { ascending: false }); // 내림차순
      return NextResponse.json(board);
    }
  } else {
    // 검색한게 아니면 전체 호출
    const { data: board, error } = await supabase
      .from('board')
      .select('*')
      .order('seq', { ascending: false }); // 내림차순

    return NextResponse.json(board);
  }
}

// POST 메서드
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const { nick_name, title, content } = Object.fromEntries(formData);

  // Supabase Connection
  const supabase = createClient();

  // 새글 insert (안보낸 항목은 디폴트값 있어서임)
  const { data, error } = await supabase
    .from('board')
    .insert([
      {
        nick_name: nick_name,
        title: title,
        content: content,
        created_at: new Date(),
      },
    ])
    .select('*');

  if (error) {
    console.error(error);
    return NextResponse.json({ message: 'failed', status: 500 });
  }

  if (data) {
    return NextResponse.json({ message: 'ok', status: 200 });
  }
}
