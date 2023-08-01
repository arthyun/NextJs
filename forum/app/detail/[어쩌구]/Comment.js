'use client'

import { useEffect, useState } from "react";

export default function Comment({ _id }){
    const [comment1, setComment1] = useState('');
    const [comment2, setComment2] = useState([]);
    const [reFreshComment, setReFreshComment] = useState(false);

    useEffect(() => {
        //GET 요청 시 query string로 부모 id값 전달
        fetch(`/api/comment/bring?id=${_id}`)
        .then(res => res.json())
        .then(data => setComment2(data));
    }, [reFreshComment]);

    return (
        <div>
            <hr/>
            <h4>댓글</h4>
            {
                comment2.map(el => {
                    return (
                        <div key={el._id}>
                            <p>작성자: {el.author}</p>
                            <p>내용: {el.comment}</p>
                            <hr/>
                        </div>
                    )
                })
            }
            <input value={comment1} onChange={(e) => setComment1(e.target.value)} />
            <button type="button" onClick={() => {
                // console.log(comment);
                fetch('/api/comment/new', {
                    method: 'POST',
                    body: JSON.stringify({
                        comment: comment1,
                        _id: _id
                    })
                }).then(res => res.json())
                .then(() => setReFreshComment(!reFreshComment));
                setComment1('');
            }}>댓글전송</button>
        </div>
    )
}