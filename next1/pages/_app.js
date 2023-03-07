import '@/styles/globals.css';
import Layout from "../components/Layout";


// _app.js파일은 페이지가 렌더링 될때마다 가장 먼저 읽는 파일이다.(중요!)
export default function App({ Component, pageProps }) {
  return (
    <>
      {/* 전역으로 사용 할 컴포넌트는 이곳에서 배치 */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* 전역 설정법 -> global 추가 */}
      <style jsx global>
        {`
          nav {
            padding: 1rem;
          }
          span {
            color: #333;
            cursor: pointer;
            font-weight: bold;
          }
          a {
            margin-left: 10px;
            color: #333;
          } 
        `}
      </style>
    </>
  );
};
