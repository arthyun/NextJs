import React, { useEffect, useState } from 'react';
import { createGpsTransfer } from '@/util/convertXY';
import WeatherHeader from './WeatherHeader';
import WeatherDaily from './WeatherDaily';
import WeatherWeek from './WeatherWeek';
import BottomSheet from './BottomSheet';

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

export type FetchTypes = {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue?: string;
};

export type DailyTypes = FetchTypes & {
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
};

// 유틸
export const createParam = (urlData: ResBody) => {
  return Object.keys(urlData)
    .map((item) => `${encodeURIComponent(item)}=${encodeURIComponent(urlData[item])}`)
    .join('&');
};

export default function WeatherWrap() {
  // 상태
  const [location, setLocation] = useState<LocationTypes[]>([]);
  const [today, setToday] = useState<FetchTypes[]>([]);
  const [daily, setDaily] = useState<DailyTypes[]>([]);
  const [week, setWeek] = useState<DailyTypes[]>([]);

  // 현위치 조회
  const curLocation = async (lat: number, lng: number) => {
    const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAOAK_KEY as string}`
      }
    });
    const result = await response.json();
    setLocation(result.documents);
    return result;
  };

  // 실시간 날씨 조회
  const getCurData = async (lat: number, lng: number, date: string, time: string) => {
    const resBody: ResBody = {
      serviceKey: process.env.NEXT_PUBLIC_VWORLD_KEY as string,
      pageNo: '1',
      numOfRows: '10',
      dataType: 'json',
      base_date: date,
      base_time: '0630',
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
      serviceKey: process.env.NEXT_PUBLIC_VWORLD_KEY as string,
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

  // 주간 날씨 조회
  const getWeekData = async (lat: number, lng: number, date: string) => {
    const resBody: ResBody = {
      serviceKey: process.env.NEXT_PUBLIC_VWORLD_KEY as string,
      pageNo: '1',
      numOfRows: '1000',
      dataType: 'json',
      base_date: date,
      base_time: '0500',
      nx: lat,
      ny: lng
    };
    const response = await fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?${createParam(resBody)}`);
    const result = await response.json();
    setWeek(result.response.body.items.item);
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
          getDailyData(otherGpsTransfer.getxLat(), otherGpsTransfer.getyLon(), resultDate),
          getWeekData(otherGpsTransfer.getxLat(), otherGpsTransfer.getyLon(), resultDate)
        ])
          .then((res) => console.log('success'))
          .catch((err) => console.error(err));
      });
    }
  }, []);

  return (
    <>
      <WeatherHeader location={location} today={today} daily={daily} />
      <WeatherDaily daily={daily} />
      <WeatherWeek week={week} />
      <BottomSheet />
    </>
  );
}
