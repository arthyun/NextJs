import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';

// GET 메서드
export async function GET(req: NextRequest, { params }) {
  // console.log(req.nextUrl);
  // console.log(params);

  // Supabase Connection
  const supabase = createClient();

  const seq = params.seq;

  let { data: board, error } = await supabase
    .from('board')
    .select('*')
    .eq('seq', seq);
  return NextResponse.json(board[0]);
}
