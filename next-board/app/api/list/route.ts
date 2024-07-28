import { NextResponse } from 'next/server';
import executeQuery from '@/lib/database';

export async function GET(req: Request) {
  // Request 확인
  // console.log('테스트 ==> ', req);

  // DB 연결
  const sqlQuery = 'select * from users';
  const data = await executeQuery(sqlQuery, '');
  const result = JSON.parse(JSON.stringify(data));

  // 최종
  return NextResponse.json(result);
}
