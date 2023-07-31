import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write(){
    const session = await getServerSession(authOptions);
    console.log(session);

    return (
        <>
        {session ? 
        <div className="p-20"> 
            <h2>글 작성</h2>
            <form action="/api/post/new" method="POST">
                <input name='title' placeholder="글제목" />
                <input name='content' placeholder="글내용" />
                <button type="submit">제출</button>
            </form>
        </div>
        :
        <h3 style={{margin: '1rem 1.5rem'}}>로그인이 필요합니다...</h3>
        }
        </>
    )
};

{/* form 태그의 method는 GET과 POST만 입력 가능(대문자) */}

{/* <form action="/api/list" method="GET">
    <button type="submit">LIST 요청버튼</button>
</form>
<form action="/api/time" method="GET">
    <button type="submit">TIME 요청버튼</button>
</form> */}