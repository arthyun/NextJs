import { connectDB } from '@/util/database';
import Image from 'next/image';
import logo from '/public/next.svg';

export default async function Home() {
  //DB 불러오기
  const client = await connectDB;
  const db = await client.db('forum');

  //post라는 collection을 찾아서 배열로 변경해달라는 변수
  let result = await db.collection('post').find().toArray();
  console.log(result);

  return (
    <div style={{ padding: '2.5rem 1.5rem', boxSizing: 'border-box' }}>
      <Image src={logo} width={320} height={65} style={{ marginRight: '20px' }} alt="logo" />
      <span style={{ fontSize: '30px' }}>13버전 분석...</span>
    </div>
  );
}
