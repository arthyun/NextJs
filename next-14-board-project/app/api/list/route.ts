import { NextResponse } from 'next/server';
// import { redirect } from 'next/navigation'

// 예시 데이터: 100개의 아이템을 생성
// const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

const data = [
  {
    seq: 1,
    userName: 'admin',
    title: '111제목제목제목입니다.',
    content: '111내용내용내용입니다.',
    like: 1, // 좋아요 갯수
    viewCount: 0, // 조회수
    replyCount: 0, // 댓글수
    created_at: '2024-09-16T16:10:24', // 작성날짜
  },
  {
    seq: 2,
    userName: 'admin',
    title: '222제목제목제목입니다.',
    content: '222내용내용내용입니다.',
    like: 2, // 좋아요 갯수
    viewCount: 0, // 조회수
    replyCount: 0, // 댓글수
    created_at: '2024-09-16T16:20:24', // 작성날짜
  },
  {
    seq: 3,
    userName: 'admin',
    title: '333제목제목제목입니다.',
    content: '333내용내용내용입니다.',
    like: 3, // 좋아요 갯수
    viewCount: 0, // 조회수
    replyCount: 0, // 댓글수
    created_at: '2024-09-16T16:30:24', // 작성날짜
  },
  {
    seq: 4,
    userName: 'admin',
    title: '444제목제목제목입니다.',
    content: '444내용내용내용입니다.',
    like: 4, // 좋아요 갯수
    viewCount: 0, // 조회수
    replyCount: 0, // 댓글수
    created_at: '2024-09-16T16:40:24', // 작성날짜
  },
  {
    seq: 5,
    userName: 'admin',
    title: '555제목제목제목입니다.',
    content: '555내용내용내용입니다.',
    like: 5, // 좋아요 갯수
    viewCount: 0, // 조회수
    replyCount: 0, // 댓글수
    created_at: '2024-09-16T16:50:24', // 작성날짜
  },
];

// GET 메서드 핸들러
export async function GET(req: Request) {
  //   const { searchParams } = new URL(req.url);

  //   // 쿼리 파라미터에서 start_idx를 가져옴, 기본값은 0
  //   const startIdx = searchParams.get('start_idx') || '0';
  //   const startIndex = parseInt(startIdx, 10);

  //   // 유효한 인덱스인지 체크
  //   if (isNaN(startIndex) || startIndex < 0 || startIndex >= data.length) {
  //     return NextResponse.json({ error: 'Invalid start index' }, { status: 400 });
  //   }

  //   // 다음 14개의 아이템을 가져옴
  //   const nextItems = data.slice(startIndex, startIndex + 14);

  // 데이터 반환
  return NextResponse.json(data);
}

// POST 메서드 핸들러
export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  return Response.json({ name, email });
}
