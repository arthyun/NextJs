import { connectDB } from "@/util/database";


export default async function Home() {
  //DB 불러오기
  const client = await connectDB;
  const db = await client.db('forum');

  //post라는 collection을 찾아서 배열로 변경해달라는 변수
  let result = await db.collection('post').find().toArray();
  console.log(result);


  return (
    <div>안녕</div>
  )
};
