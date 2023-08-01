import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler (req, res) {
    let session = await getServerSession(req, res, authOptions);

    if(req.method === 'POST'){
        // JSON.stringify로 보낸 값은 parse 후 사용해야함
        req.body = JSON.parse(req.body);

        let reqData = {
            comment: req.body.comment,
            parent: new ObjectId(req.body._id),
            author: session.user.email
        };

        const client = await connectDB;
        const db = await client.db('forum');
        const result = await db.collection('comment').insertOne(reqData);

        return res.status(200).json('저장완료');
    }

    // return res.status(200).redirect(302, '/list');
}