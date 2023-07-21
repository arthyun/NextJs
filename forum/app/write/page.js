export default function Write(){

    return (
        <div className="p-20">
            <h2>글 작성</h2>
            {/* form 태그의 method는 GET과 POST만 입력 가능(대문자) */}
            <form action="/api/post/new" method="POST">
                <input name='title' placeholder="글제목" />
                <input name='content' placeholder="글내용" />
                <button type="submit">제출</button>
            </form>
            {/* <form action="/api/list" method="GET">
                <button type="submit">LIST 요청버튼</button>
            </form>
            <form action="/api/time" method="GET">
                <button type="submit">TIME 요청버튼</button>
            </form> */}
        </div>
    )
}