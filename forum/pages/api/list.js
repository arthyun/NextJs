import { connectDB } from "@/util/database";

export default async function listApi(req, res){
    //DB 불러오기
    const client = await connectDB;
    const db = await client.db('forum');
    let result = await db.collection('post').find().toArray();

    if(req.method == 'GET'){
        return res.status(200).json(result);
    }
};