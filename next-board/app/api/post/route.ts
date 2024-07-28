import { NextResponse } from 'next/server';
import executeQuery from '@/lib/database';

export async function GET(req: Request) {
  // // Request 확인
  // console.log('get data ==> ', req);

  // DB 연결
  const sqlQuery = 'select * from Post';
  const data = await executeQuery(sqlQuery, '');
  const result = JSON.parse(JSON.stringify(data));

  // 최종
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  // RequestBody 확인법
  const request = await req.json();
  // console.log(request.userName, request.title, request.content);

  // 우선 이름기반으로 아이디 조회
  const findNameQuery = `select id from User where name = '${request.userName}'`;
  const data = await executeQuery(findNameQuery, '');
  const userId = JSON.parse(JSON.stringify(data));
  // console.log(userId[0].id);

  if (!userId) {
    return NextResponse.json({ status: 'No Matched UserId', code: 400 });
  } else {
    // 찾은 아이디로 post insert
    const insertQuery = `insert into Post (title, content, reg_id) values ('${request.title}', '${request.content}', '${userId[0].id}')`;
    const data = await executeQuery(insertQuery, '');
    const result = JSON.parse(JSON.stringify(data));
    if (!result) {
      return NextResponse.json({ status: 'Post Insert Failed', code: 400 });
    } else {
      return NextResponse.json({ status: 'ok', code: 200 });
    }
  }
}
