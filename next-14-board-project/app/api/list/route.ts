import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
// import { redirect } from 'next/navigation'

// GET 메서드
export async function GET(req: NextRequest) {
  // Supabase Connection
  const supabase = createClient();

  // Exist Query String (검색 시)
  if (req.nextUrl.search !== '') {
    const searchParams = req.nextUrl.searchParams;
    if (searchParams.get('search') !== null) {
      let { data: board, error } = await supabase
        .from('board')
        .select('*')
        .like('title', `%${searchParams.get('search')}%`)
        .order('seq', { ascending: false }); // 내림차순
      return NextResponse.json(board);
    }
  } else {
    // 검색한게 아니면 전체 호출
    let { data: board, error } = await supabase
      .from('board')
      .select('*')
      .order('seq', { ascending: false }); // 내림차순
    return NextResponse.json(board);
  }
}

// // POST 메서드
// export async function POST(request: Request) {
//   const formData = await request.formData();
//   const name = formData.get('name');
//   const email = formData.get('email');
//   return Response.json({ name, email });
// }
