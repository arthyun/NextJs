import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
    //DB 불러오기
    const client = await connectDB;
    const db = await client.db('forum');
    let result = await db.collection('post').find().toArray();

    return (
        <div className="list-bg">
            {
                result.map((el, i) => {
                    return (
                    <div className="list-item" key={i}>
                        <Link href={`/detail/${el._id}`}>
                            <h4>{el.title}</h4>
                        </Link>

                        <DetailLink/>
                        
                        <p>{el.content}</p>
                    </div>
                    )
                })
            }
        </div>
        )
} 