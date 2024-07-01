import React from 'react';
import { DailyTypes } from './WeatherWrap';

export default function WeatherWeek({ week }: { week: DailyTypes[] }) {
  // console.log(week.filter((item) => item.category === 'PCP')); //강수량
  // console.log(week.filter((item) => item.category === 'POP')); //강수확률
  // console.log(week.filter((item) => item.category === 'PTY')); //강수형태
  // console.log(week.filter((item) => item.category === 'SKY')); //하늘상태
  // console.log(week.filter((item) => item.category === 'TMP')); //기온

  return (
    <section className='xl:w-full xl:mt-6 md:mt-0 box-border rounded-xl text-white bg-black bg-opacity-15 p-4'>
      <h3>🗓️ 주간 일기예보</h3>
      <ul className='flex flex-col gap-2'>
        {/* {temp?.map((item, index) => {
          return (
            <li className='text-white text-lg' key={index}>
              <dl className='flex flex-col gap-2 items-center justify-center min-w-36 min-h-36'>
                <dt>{item.fcstTime.substring(0, 2)}시</dt>
                <dd className='text-4xl'>{rn1[index].fcstValue === '강수없음' ? '☀️' : '☔️'}</dd>
                <dd>{item.fcstValue}°C</dd>
              </dl>
            </li>
          );
        })} */}
        <li className='border-b-2 border-black'>
          <dl className='flex min-w-16 py-6 box-border'>
            <dt>지금</dt>
            <dd>☀️</dd>
            <dd>28°C</dd>
          </dl>
        </li>
        <li className='border-b-2 border-black'>
          <dl className='flex min-w-16 py-6 box-border'>
            <dt>오후 1시</dt>
            <dd>☁️</dd>
            <dd>29°C</dd>
          </dl>
        </li>
        <li className='border-b-2 border-black'>
          <dl className='flex min-w-16 py-6 box-border'>
            <dt>오후 2시</dt>
            <dd>☔️</dd>
            <dd>30°C</dd>
          </dl>
        </li>
      </ul>
    </section>
  );
}
