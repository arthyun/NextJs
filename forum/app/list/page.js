import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export default async function List() {
    //DB 불러오기
    const client = await connectDB;
    const db = await client.db('forum');
    let result = await db.collection('post').find().toArray();

    return (
        <div className="list-bg">
            <ListItem result={result} />
        </div>
        )
} 