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
  let { data: count } = await supabase
    .from('board')
    .select('view_count')
    .eq('seq', seq);
  await supabase
    .from('board')
    .update({
      view_count: count![0].view_count + 1,
    })
    .eq('seq', seq);

  // 상세 데이터
  let { data: board, error } = await supabase
    .from('board')
    .select('*')
    .eq('seq', seq);

  // 상세에 따른 댓글 데이터
  let { data: reply } = await supabase
    .from('reply')
    .select('*')
    .eq('board_seq', seq);

  const resultData = Object.assign({}, { board, reply });
  // console.log(resultData);

  return NextResponse.json(resultData);
}
