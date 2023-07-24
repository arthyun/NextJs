import { connectDB } from "@/util/database";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from 'next-auth';

export default async function handler (req, res) {
    let session = await getServerSession(req, res, authOptions);
    if(session){
        //로그인 정보가 있다면 객체에 author 추가
        req.body.author = session.user.email;
    }
    console.log(req.body);

    if(req.method == 'POST'){
        // console.log(req.body);

        //예외처리
        if(req.body.title === '' || req.body.content === ''){
            return res.status(500).json('공백 없게 해주세요.');
        }

        //DB 불러온 후 저장하기
        const client = await connectDB;
        const db = await client.db('forum');
        let result = await db.collection('post').insertOne(req.body);

        return res.status(200).redirect(302, '/list');
    }
}