'use client'

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DetailLink(){
    let router = useRouter();
    let pathname = usePathname();
    let searchParams = useSearchParams();
    let params = useParams();

    console.log('현재 URL : ' + pathname);
    console.log('쿼리 스트링 값 : ' + searchParams);
    console.log('다이나믹 라우트 값 : ' + params);

    return (
        <>
            <button onClick={() => router.push('/')}>버튼</button>
            {/* <button onClick={() => router.forward()}>버튼</button>
            <button onClick={() => router.back()}>버튼</button>
            <button onClick={() => router.refresh()}>새로고침</button>
            <button onClick={() => router.prefetch('/')}>패치</button> */}
        </>
        )
};