import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){

    if(req.method == 'POST'){
        //예외처리
        if(req.body.title === '' || req.body.content === ''){
            return res.status(500).json('공백 없게 해주세요.');
        }

        //DB 불러온 후 수정하기 -> _id값을 불러오려면 수정 페이지에서 id값도 보내줘야한다.
        const client = await connectDB;
        const db = await client.db('forum');

        //요청온 데이터 재가공 -> _id값과 분리하는것이 목적
        const newReqBody = { 
            title: req.body.title, 
            content: req.body.content 
        };
        const result = await db.collection('post').updateOne(
            { _id: new ObjectId(req.body._id) }, { $set: newReqBody }
            );
        // console.log(result);
        return res.status(200).redirect(302, '/list');
    }
}
