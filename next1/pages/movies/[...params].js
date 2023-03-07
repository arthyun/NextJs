// -> /movies/[id]
// router를 콘솔에 찍어보면 query -> id 값이 바로 URL에 넣은 id값이 온다.
import Seo from '../../components/Seo';
import { useRouter } from "next/router";

export default function Detail(props){
    const router = useRouter();
    const [title, id] = props.params || [];

    return (
        <div>
            <Seo title={title} />
            <h3>{title}</h3>
            <h4>{id}</h4>
        </div>
    )
}

// 기존의 router를 사용한 router.query.params는 CSR에서 작동한다. 
// SEO최적을 위해 먼저 서버에서 내용물을 확인하고 싶다면 getServerSideProps -> context를 찍어보자
// 찍어낸 context는 터미널에서 확인된다.
export function getServerSideProps({ params: {params} }) {
    return {
        props: {
            params,
        }
    };
};