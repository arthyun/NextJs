import { NextResponse } from 'next/server';
import executeQuery from '@/lib/database';

export async function GET(req: Request, { params }) {
  // 쿼리스트링 확인법
  console.log(params);

  // DB 연결
  const sqlQuery = `select * from Post where id = ${params.id}`;
  const data = await executeQuery(sqlQuery, '');
  const result = JSON.parse(JSON.stringify(data));

  // 최종
  return NextResponse.json(result);
}
