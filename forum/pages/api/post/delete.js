import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){

    if(req.method == 'DELETE'){
        // console.log(req.body.id);

        //DB 불러온 후 삭제하기 -> _id값을 불러오려면 삭제 시 id값도 보내줘야한다.
        const client = await connectDB;
        const db = await client.db('forum');
        const result = await db.collection('post').deleteOne({ _id: new ObjectId(req.body) });
        console.log(result);

        // return res.status(200).redirect(302, '/list');
        return res.status(200).json('삭제완료');
    }
}
