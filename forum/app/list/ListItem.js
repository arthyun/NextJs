'use client'

import Link from "next/link";
// import { useEffect } from "react";

export default function ListItem(props){

    // useEffect(() => {
        //서버에 부탁해서 DB데이터를 result에 담아준다.
    // }, []);

    return (
        <div>
            {
                props.result.map((el, i) => {
                    return (
                    <div className="list-item" key={i}>
                        <Link href={`/detail/${el._id}`}>
                            <h4>{el.title}</h4>
                        </Link>

                        <Link href={`/edit/${el._id}`}>수정</Link>

                        <span className="delBtn" onClick={(e) => {
                            fetch('/api/post/delete', {
                                method: 'DELETE',
                                body: el._id
                            }).then((res) => {
                                return res.json();
                            }).then((message) => {
                                console.log(message);
                                e.target.parentElement.style.opacity = 0;
                                setTimeout(() => {
                                    e.target.parentElement.style.display = 'none';
                                }, 1000);
                            }).catch((err) => {
                                console.log(err);
                            });
                        }}>삭제</span>
                        
                        <p>{el.content}</p>
                    </div>
                    )
                })
            }
        </div>
    )
}