import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";


export default async function Edit(props){
    //DB 불러오기
    const client = await connectDB;
    const db = await client.db('forum');
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.어쩌구) });
    // console.log(props);


    return (
        <div className="p-20">
            <h2>글 수정</h2>
            {/* form 태그의 method는 GET과 POST만 입력 가능(대문자) */}
            <form action="/api/post/edit" method="POST">
                <input name='title' defaultValue={result.title} />
                <input name='content' defaultValue={result.content} />
                <input style={{display: 'none'}} name='_id' defaultValue={result._id.toString()} />
                <button type="submit">제출</button>
            </form>
        </div>
    )
};