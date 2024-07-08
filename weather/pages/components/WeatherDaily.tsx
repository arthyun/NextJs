import React, { useEffect, useState } from 'react';
import { DailyTypes } from './WeatherWrap';

export default function WeatherDaily({ daily }: { daily: DailyTypes[] }) {
  const [temp, setTemp] = useState<DailyTypes[]>([]);
  const [sky, setSky] = useState<DailyTypes[]>([]);

  const confirmSky = (value: string) => {
    // 맑음(1), 구름많음(3), 흐림(4)
    switch (value) {
      case '1':
        return '☀️';
      case '3':
        return '🌥️';
      case '4':
        return '☁️';
      default:
        return '☔️';
    }
  };

  const nowHour = new Date().getHours().toString().padStart(2, '0') + '00';

  useEffect(() => {
    setTemp(daily.filter((item) => item.baseDate === item.fcstDate).filter((v) => v.category === 'TMP'));
    setSky(daily.filter((item) => item.baseDate === item.fcstDate).filter((v) => v.category === 'SKY'));
  }, [daily]);

  return (
    <section className='xl:w-8/12 flex flex-col gap-2 justify-center box-border rounded-xl text-white bg-black bg-opacity-15 p-4'>
      <h3>🕙 시간별 일기예보</h3>
      <ul className='dailyScrollArea flex mt-4 overflow-x-scroll md:gap-2 2sm:gap-0'>
        {temp?.map((item, index) => {
          return (
            <li className={`text-white ${item.fcstTime === nowHour && 'bg-white bg-opacity-20 rounded-lg'} font-light box-border md:text-lg md:p-0 2sm:text-[14px] 2sm:p-2`} key={index}>
              <dl className='flex flex-col gap-2 items-center justify-center md:min-w-36 md:min-h-36 2sm:w-20 2sm:h-20 2sm:gap-[5px]'>
                <dt>{item.fcstTime.substring(0, 2)}시</dt>
                <dd className='md:text-4xl 2sm:text-3xl'>{confirmSky(sky[index].fcstValue)}</dd>
                <dd>{item.fcstValue}°C</dd>
              </dl>
            </li>
          );
        })}
        {/* <li className='border-2 border-black'>
          <dl className='flex flex-col items-center min-w-16'>
            <dt>지금</dt>
            <dd>☀️</dd>
            <dd>28°C</dd>
          </dl>
        </li>
        <li className='border-2 border-black'>
          <dl className='flex flex-col items-center min-w-16'>
            <dt>오후 1시</dt>
            <dd>☁️</dd>
            <dd>29°C</dd>
          </dl>
        </li>
        <li className='border-2 border-black'>
          <dl className='flex flex-col items-center min-w-16'>
            <dt>오후 2시</dt>
            <dd>☔️</dd>
            <dd>30°C</dd>
          </dl>
        </li> */}
      </ul>
    </section>
  );
}
