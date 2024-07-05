import React, { useEffect, useState } from 'react';
import { DailyTypes, FetchTypes, LocationTypes } from './WeatherWrap';

export default function WeatherHeader({ location, today, daily }: { location: LocationTypes[]; today: FetchTypes[]; daily: DailyTypes[] }) {
  const [temp, setTemp] = useState<DailyTypes[]>([]);

  // 현재 날씨 분기처리
  const getWeatherDescription = (obsrValue: string) => {
    switch (obsrValue) {
      case '0':
        return '맑음';
      case '1':
        return '비';
      case '2':
        return '비/눈';
      case '3':
        return '눈';
      case '5':
        return '빗방울';
      case '6':
        return '빗방울눈날림';
      case '7':
        return '눈날림';
      default:
        return '흐림';
    }
  };

  const weatherValue = today?.filter((item: FetchTypes) => item.category === 'PTY')?.[0]?.obsrValue;
  const t1hValue = today?.filter((item: FetchTypes) => item.category === 'T1H')?.[0]?.obsrValue;

  useEffect(() => {
    setTemp(daily.filter((item) => item.baseDate === item.fcstDate).filter((v) => v.category === 'TMP'));
  }, [daily]);

  return (
    <section className='xl:w-4/12 flex flex-col gap-4 justify-center items-center box-border text-white'>
      {/* T1H(기온), RN1(강수량), PTY(강수형태) */}
      <h3 className='text-lg'>{location[0]?.address?.region_2depth_name}</h3>
      <p className='text-5xl'>{Math.ceil(Number(t1hValue))}°C</p>
      <p className='text-sm'>{weatherValue && getWeatherDescription(weatherValue)}</p>
      <div className='flex gap-2 text-sm'>
        <p>최저: {temp.find((item) => item.fcstTime === '0600')?.fcstValue}°C</p>
        <p>최고: {temp.find((item) => item.fcstTime === '1400')?.fcstValue}°C</p>
      </div>
    </section>
  );
}

/**
- 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
- 강수형태(PTY) 코드 : 
(초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7) 
(단기) 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4) 
 */
