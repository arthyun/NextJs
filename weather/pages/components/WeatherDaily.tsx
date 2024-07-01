import React, { useEffect, useState } from 'react';
import { DailyTypes } from './WeatherWrap';

export default function WeatherDaily({ daily }: { daily: DailyTypes[] }) {
  const [temp, setTemp] = useState<DailyTypes[]>([]);
  const [rn1, setRn1] = useState<DailyTypes[]>([]);

  useEffect(() => {
    setTemp(() => daily.filter((item) => item.category === 'T1H'));
    setRn1(() => daily.filter((item) => item.category === 'RN1'));
  }, [daily]);

  return (
    <section className='xl:w-8/12 flex flex-col gap-2 justify-center px-[10px] box-border border-2 border-blue-600'>
      <h3>🕙 시간별 일기예보</h3>

      <ul className='flex gap-2 overflow-x-scroll'>
        {temp?.map((item, index) => {
          return (
            <li className='border-2 border-black text-lg' key={index}>
              <dl className='flex flex-col gap-2 items-center justify-center min-w-36 min-h-36'>
                <dt>{item.fcstTime.substring(0, 2)}시</dt>
                <dd className='text-4xl'>{rn1[index].fcstValue === '강수없음' ? '☀️' : '☔️'}</dd>
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
