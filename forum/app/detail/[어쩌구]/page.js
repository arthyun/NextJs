import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import { notFound } from "next/navigation";

export default async function Detail(props){
    //DB 불러오기
    const client = await connectDB;
    const db = await client.db('forum');
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.어쩌구)});
    
    //url로 입력한 값은 props로 확인 가능하다.
    // console.log(props);

    if(result === null) {
        return notFound();
    };
    
    return (
        <div>
            <h2>상세페이지</h2>
            <h3>{result.title}</h3>
            <p>{result.content}</p>

            {/* 댓글 컴포넌트 자리 */}
            <Comment _id={result._id.toString()} />
        </div>
    )
};