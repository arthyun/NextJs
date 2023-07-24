import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res){
    //사용자 구분하여 삭제가 되게 안되게...
    let session = await getServerSession(req, res, authOptions);

    if(req.method == 'DELETE'){
        const client1 = await connectDB;
        const db1 = await client1.db('forum');
        const result1 = await db1.collection('post').findOne({ _id: new ObjectId(req.body) });

        if(result1.author === session.user.email){
            //DB 불러온 후 삭제하기 -> _id값을 불러오려면 삭제 시 id값도 보내줘야한다.
            const client2 = await connectDB;
            const db2 = await client2.db('forum');
            const result2 = await db2.collection('post').deleteOne({ _id: new ObjectId(req.body) });
        }
        // return res.status(200).redirect(302, '/list');
        return res.status(200).json('삭제완료');
    }
}
