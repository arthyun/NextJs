import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';

// GET 메서드
export async function GET(
  req: NextRequest,
  { params }: { params: { seq: string } }
) {
  // console.log(req.nextUrl);
  // console.log(params);

  // IP 주소 확인
  // const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  // console.log('IP ==>>>', ip);

  // Supabase Connection
  const supabase = createClient();

  const seq = params.seq;

  // 접속마다 뷰 카운트 올리기
  // 기존 카운트 조회 후 업데이트 침
  // view_count 값을 먼저 조회하고, 그 값을 이용해 바로 업데이트
  const { data: count } = await supabase
    .from('board')
    .select('view_count', { count: 'exact' })
    .eq('seq', seq)
    .single();

  if (count) {
    await supabase
      .from('board')
      .update({
        view_count: count.view_count + 1,
      })
      .eq('seq', seq);
  }

  // 상세 데이터
  const { data: board, error } = await supabase
    .from('board')
    .select('*')
    .eq('seq', seq);

  // 상세에 따른 댓글 데이터
  const { data: reply } = await supabase
    .from('reply')
    .select('*')
    .eq('board_seq', seq)
    .order('seq', { ascending: false }); // 내림차순;

  const resultData = Object.assign({}, { board, reply });
  // console.log(resultData);

  return NextResponse.json(resultData);
}

// POST 메서드
export async function POST(
  req: NextRequest,
  { params }: { params: { seq: string } }
) {
  const board_seq = params.seq;
  // Body Parse
  const { nick_name, content } = await req.json();

  // Supabase Connection
  const supabase = createClient();

  // 댓글 insert
  const { data, error } = await supabase
    .from('reply')
    .insert([
      {
        board_seq: board_seq,
        nick_name: nick_name,
        content: content,
        created_at: new Date(),
      },
    ])
    .select('*');

  // 댓글 insert 후 연계로 board > reply_count 업데이트
  const { count } = await supabase
    .from('reply')
    .select('*', { count: 'exact' })
    .eq('board_seq', board_seq);
  await supabase
    .from('board')
    .update({
      reply_count: count,
    })
    .eq('seq', board_seq);

  if (error) {
    return NextResponse.json({ status: 500, message: 'failed' });
  }

  if (data) {
    return NextResponse.json({ status: 200, message: 'ok' });
  }
}
