import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

export default async function handler(req, res){

    if(req.method === 'POST'){
        //암호화 하기
        let hash = await bcrypt.hash(req.body.password, 10);
        // console.log(hash);
        req.body.password = hash; //요청받은 바디값을 hash로 변환

        //DB 불러온 후 insert 하기
        const client = await connectDB;
        const db = await client.db('forum');
        let result = await db.collection('user_cred').insertOne(req.body);
        
        return res.status(200).json('가입성공');
    }
}