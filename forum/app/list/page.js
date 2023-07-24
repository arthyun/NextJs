import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

//렌더링 방식 설정 -> force-dynamic or force-static
export const dynamic = 'force-dynamic';

//첫 방문 시 캐싱되게...
// export const revalidate = 60;

export default async function List() {

    //DB 불러오기
    const client = await connectDB;
    const db = await client.db('forum');
    let result = await db.collection('post').find().toArray();
    //_id 오류 해결
    result = result.map((el)=>{
        el._id = el._id.toString();
        return el;
    });
    // get 요청을 캐싱하려면..
    // await fetch('URL', { cache: 'force-cache' or 'no-store'(실시간 갱신) })
    // 시간을 정해두고 데이터를 갱신...
    // await fetch('URL', { next: { revalidate: 60 } })

    return (
        <div className="list-bg">
            <ListItem result={result} />
        </div>
        )
}