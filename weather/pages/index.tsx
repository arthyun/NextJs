import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import sigungu from '@/sigungu.json';
import SearchInput from '@/pages/components/SearchInput';
import WeatherHeader from '@/pages/components/WeatherHeader';
import WeatherDaily from '@/pages/components/WeatherDaily';
import WeatherWeek from '@/pages/components/WeatherWeek';
import BottomSheet from './components/BottomSheet';

const inter = Inter({ subsets: ['latin'] });

type ResBody = {
  [key: string]: string | number;
};

type ResSigungu = {
  city: string;
  dong: string;
  nx: number;
  ny: number;
  sigungu: string;
};

const createParam = (urlData: ResBody) => {
  return Object.keys(urlData)
    .map((item) => `${encodeURIComponent(item)}=${encodeURIComponent(urlData[item])}`)
    .join('&');
};

// Main
export default function Home({ data }) {
  // ssr 데이터
  // console.log(data);

  // 시군구 데이터 우선 가공
  // console.log(sigungu['data']);
  // const defineSigungu = Object.entries(sigungu).map((item) => [item[0].split('/')[1], item[1]]);
  // const resultSigungu = Object.fromEntries(defineSigungu);

  // 검색 함수
  const execFunc = (text: string) => {
    if (text !== '') {
      if (text.length > 1) {
        let lat: string = '';
        let lng: string = '';
        sigungu['data'].forEach((item: ResSigungu) => {
          if (item.city.includes(text) || item.sigungu.includes(text)) {
            lat = item.nx.toString();
            lng = item.ny.toString();
          }
        });
        const pushSearchResult: ResBody = {
          base_date: '20240626',
          nx: lat,
          ny: lng
        };
        router.push(`/?${createParam(pushSearchResult)}`);
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
    <main className={`${inter.className} w-full xl:flex xl:flex-row xl:flex-wrap md:flex md:flex-col relative pt-10`}>
      <SearchInput type={`text`} placeholder={`원하는 지역을 입력하세요`} onChange={() => console.log('changed')} execFunc={execFunc} />
      <WeatherHeader />
      <WeatherDaily />
      <WeatherWeek />
      <BottomSheet />
      {/* 
      {data?.body?.items?.item?.map((item: ResBody, index: number) => {
        return <p key={index}>{item.fcstTime}</p>;
      })}
      <button type='button' onClick={() => router.push(`/?${createParam(resBodyChanged)}`)}>
        동적 패치 테스트
      </button> */}
    </main>
  );
}

// SSR
export async function getServerSideProps({ query }) {
  // console.log(query);

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

/*
POP
강수확률

PTY
강수형태
 
PCP
1시간 강수량
 
REH
습도
 
SNO
1시간 신적설
 
SKY
하늘상태
 
TMP
1시간 기온
 
TMN
일 최저기온
 
TMX
일 최고기온
 
UUU
풍속(동서성분)
 
VVV
풍속(남북성분)
 
WAV
파고
 
VEC
풍향
 
WSD
풍속

초단기실황
T1H
기온
 
RN1
1시간 강수량
 
UUU
동서바람성분
 
VVV
남북바람성분
 
REH
습도
 
PTY
강수형태
 
VEC
풍향
 
WSD
풍속

초단기예보
T1H
기온
 
RN1
1시간 강수량
 
SKY
하늘상태
 
UUU
동서바람성분
 
VVV
남북바람성분
 
REH
습도
 
PTY
강수형태
 
LGT
낙뢰
 
VEC
풍향
 
WSD
풍속
*/
