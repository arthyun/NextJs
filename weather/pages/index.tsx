import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import sigungu from '@/sigungu.json';
import SearchInput from '@/pages/components/SearchInput';

const inter = Inter({ subsets: ['latin'] });

type ResBody = {
  [key: string]: string | number;
};

const createParam = (urlData: ResBody) => {
  return Object.keys(urlData)
    .map((item) => `${encodeURIComponent(item)}=${encodeURIComponent(urlData[item])}`)
    .join('&');
};

// Main
export default function Home({ data }) {
  // console.log(data);

  // 시군구 데이터 우선 가공
  const defineSigungu = Object.entries(sigungu).map((item) => [item[0].split('/')[1], item[1]]);
  const resultSigungu = Object.fromEntries(defineSigungu);

  // 검색 함수
  const execFunc = (text: string) => {
    // console.log(text);
    if (text !== '') {
      if (text.length > 1) {
        for (const key in resultSigungu) {
          if (key.includes(text)) {
            // console.log(resultSigungu[key].lat, resultSigungu[key].long);
            const pushSearchResult: ResBody = {
              base_date: '20240626',
              nx: Math.floor(resultSigungu[key].lat),
              ny: Math.floor(resultSigungu[key].long)
            };
            router.push(`/?${createParam(pushSearchResult)}`);
          }
        }
      } else {
        alert('2자이상 입력하세요');
      }
    } else {
      alert('지역을 입력하세요.');
    }
  };

  const router = useRouter();

  const resBodyChanged: ResBody = {
    // 변경이 필요한 부분만 주석안함
    // serviceKey: '9D7Rg6V6wDr4R1GG9TV/Y1c4JU9ttSuq9KL8/+5PMw4tls0giUwdYXMH751nxznUp7lL3wQL0YDgFZYc/dNtwQ==',
    // pageNo: '1',
    // numOfRows: '10',
    // dataType: 'json',
    base_date: '20240626',
    // base_time: '0600',
    nx: '55',
    ny: '127'
  };

  return (
    <main className={`${inter.className}`}>
      <SearchInput type={`text`} placeholder={`원하는 지역을 입력하세요`} onChange={() => console.log('changed')} execFunc={execFunc} />
      {data?.body?.items?.item?.map((item: ResBody, index: number) => {
        return <p key={index}>{item.fcstTime}</p>;
      })}
      <button type='button' onClick={() => router.push(`/?${createParam(resBodyChanged)}`)}>
        동적 패치 테스트
      </button>
    </main>
  );
}

// SSR
export async function getServerSideProps({ query }) {
  // console.log(query);

  // ssr로 현재위치 받아오는 방법 찾아봐야함
  // if ('geolocation' in navigator) {
  //   // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
  //   navigator.geolocation.getCurrentPosition(({ coords }) => {
  //     const { latitude, longitude } = coords;
  //     console.log(latitude, longitude);
  //     // setLocation({ latitude, longitude });
  //   });
  // }

  const resBody: ResBody = {
    serviceKey: '9D7Rg6V6wDr4R1GG9TV/Y1c4JU9ttSuq9KL8/+5PMw4tls0giUwdYXMH751nxznUp7lL3wQL0YDgFZYc/dNtwQ==',
    pageNo: '1',
    numOfRows: '10',
    dataType: 'json',
    base_date: query.base_date ?? '20240627',
    base_time: '0600',
    nx: query.nx ?? '33',
    ny: query.ny ?? '127'
  };

  const response = await fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?${createParam(resBody)}`);
  const result = await response.json();

  return {
    props: {
      data: result.response
    }
  };
}
