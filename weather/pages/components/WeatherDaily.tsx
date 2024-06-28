import React from 'react';

export default function WeatherDaily() {
  return (
    <section className='xl:w-8/12 flex flex-col gap-2 justify-center px-[10px] box-border border-2 border-blue-600'>
      <h3>🕙 시간별 일기예보</h3>

      <ul className='flex gap-2'>
        <li className='border-2 border-black'>
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
        </li>
      </ul>
    </section>
  );
}
