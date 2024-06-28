import React, { useEffect, useState } from 'react';
import { createGpsTransfer } from '@/util/convertXY';

// 타입
type ResBody = {
  [key: string]: string | number;
};

type LocationTypes = {
  address: {
    address_name: string;
    main_address_no: string;
    mountain_yn: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    sub_address_no: string;
    zip_code: string;
  };
  road_address: {
    address_name: string;
    building_name: string;
    main_building_no: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    sub_building_no: string;
    underground_yn: string;
    zone_no: string;
  };
};

type FetchTypes = {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
};

type DailyTypes = FetchTypes & {
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
};

// 유틸
const createParam = (urlData: ResBody) => {
  return Object.keys(urlData)
    .map((item) => `${encodeURIComponent(item)}=${encodeURIComponent(urlData[item])}`)
    .join('&');
};

export default function WeatherHeader() {
  // 상태
  const [location, setLocation] = useState<LocationTypes[]>([]);
  const [today, setToday] = useState<FetchTypes[]>([]);
  const [daily, setDaily] = useState<DailyTypes[]>([]);

  // 현위치 조회
  const curLocation = async (lat: number, lng: number) => {
    const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `KakaoAK 9e1e25ce894be38c63974de5693b0e20`
      }
    });
    const result = await response.json();
    setLocation(result.documents);
    return result;
  };

  // 실시간 날씨 조회
  const getCurData = async (lat: number, lng: number, date: string, time: string) => {
    const resBody: ResBody = {
      serviceKey: '9D7Rg6V6wDr4R1GG9TV/Y1c4JU9ttSuq9KL8/+5PMw4tls0giUwdYXMH751nxznUp7lL3wQL0YDgFZYc/dNtwQ==',
      pageNo: '1',
      numOfRows: '10',
      dataType: 'json',
      base_date: date,
      base_time: time,
      nx: lat,
      ny: lng
    };
    const response = await fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?${createParam(resBody)}`);
    const result = await response.json();
    setToday(result.response.body.items.item);
    return result;
  };

  // 하루치 날씨 조회
  const getDailyData = async (lat: number, lng: number, date: string) => {
    const resBody: ResBody = {
      serviceKey: '9D7Rg6V6wDr4R1GG9TV/Y1c4JU9ttSuq9KL8/+5PMw4tls0giUwdYXMH751nxznUp7lL3wQL0YDgFZYc/dNtwQ==',
      pageNo: '1',
      numOfRows: '100',
      dataType: 'json',
      base_date: date,
      base_time: '0630',
      nx: lat,
      ny: lng
    };
    const response = await fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?${createParam(resBody)}`);
    const result = await response.json();
    setDaily(result.response.body.items.item);
    return result;
  };

  useEffect(() => {
    // 현재위치 받아오는 방법 찾아봐야함 (ssr에서 동작하지 않음)
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords, timestamp }) => {
        const { latitude, longitude } = coords;
        // 오늘날짜 계산
        const curDate = new Date(timestamp);
        const year = curDate.getFullYear().toString();
        const month = (curDate.getMonth() + 1).toString().padStart(2, '0');
        const day = curDate.getDate().toString().padStart(2, '0');
        const resultDate = year + month + day;

        // 현재시간 계산
        const timezone = curDate.getHours().toString().padStart(2, '0') + '00';

        // 기존 위치 정보를 xy좌표로 계산
        const otherGpsTransfer = createGpsTransfer(latitude, longitude);
        otherGpsTransfer.transfer(otherGpsTransfer, 0);
        // console.log(otherGpsTransfer.getxLat());
        // console.log(otherGpsTransfer.getyLon());

        // 데이터 연동 (현재 3가지 fetch)
        Promise.allSettled([
          curLocation(latitude, longitude),
          getCurData(otherGpsTransfer.getxLat(), otherGpsTransfer.getyLon(), resultDate, timezone),
          getDailyData(otherGpsTransfer.getxLat(), otherGpsTransfer.getyLon(), resultDate)
        ])
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
      });
    }
  }, []);

  return (
    <section className='xl:w-4/12 flex flex-col items-center box-border border-2 border-red-600'>
      {/* T1H(기온), RN1(강수량), PTY(강수형태) */}
      <h3 className='text-lg'>{location[0]?.address?.region_2depth_name}</h3>
      <p className='text-4xl'>{today?.filter((item) => item.category === 'T1H')[0]?.obsrValue}°C</p>
      <p className='text-sm'>{today?.filter((item) => item.category === 'RN1')[0]?.obsrValue === '0' ? '맑음' : '흐림'}</p>
      <div className='flex gap-2 text-sm'>
        <p>최저: {daily?.filter((item) => item.category === 'T1H' && item.fcstTime === '0700')[0]?.fcstValue}°C</p>
        <p>최고: {daily?.filter((item) => item.category === 'T1H' && item.fcstTime === '1200')[0]?.fcstValue}°C</p>
      </div>
    </section>
  );
}
