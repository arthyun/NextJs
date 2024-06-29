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

  return (
    <main className={`${inter.className} w-full xl:flex xl:flex-row xl:flex-wrap md:flex md:flex-col relative pt-10`}>
      <SearchInput type={`text`} placeholder={`원하는 지역을 입력하세요`} onChange={() => console.log('changed')} execFunc={execFunc} />
      <WeatherHeader />
      <WeatherDaily />
      <WeatherWeek />
      <BottomSheet />
    </main>
  );
}

// // SSR
// export async function getServerSideProps({ query }) {
//   // console.log(query);

//   const resBody: ResBody = {
//     serviceKey: process.env.NEXT_PUBLIC_VWORLD_KEY as string,
//     pageNo: '1',
//     numOfRows: '10',
//     dataType: 'json',
//     base_date: query.base_date ?? '20240627',
//     base_time: '0600',
//     nx: query.nx ?? '33',
//     ny: query.ny ?? '127'
//   };

//   const response = await fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?${createParam(resBody)}`);
//   const result = await response.json();

//   return {
//     props: {
//       data: result?.response
//     }
//   };
// }
