import { connectDB } from "@/util/database";

export default async function List() {
    //DB 불러오기
    const client = await connectDB;
    const db = await client.db('forum');
    let result = await db.collection('post').find().toArray();
    // console.log(result);

    return (
        <div className="list-bg">
            {
                result.map((el, i) => {
                    return (
                    <div className="list-item" key={i}>
                        <h4>{el.title}</h4>
                        <p>{el.content}</p>
                    </div>
                    )
                })
            }
        </div>
        )
} 