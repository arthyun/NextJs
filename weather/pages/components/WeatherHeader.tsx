import React from 'react';
import { DailyTypes, FetchTypes } from './WeatherWrap';

export default function WeatherHeader({ location, today, daily }) {
  return (
    <section className='xl:w-4/12 flex flex-col justify-center items-center box-border border-2 border-red-600'>
      {/* T1H(기온), RN1(강수량), PTY(강수형태) */}
      <h3 className='text-lg'>{location[0]?.address?.region_2depth_name}</h3>
      <p className='text-4xl'>{today?.filter((item: FetchTypes) => item.category === 'T1H')[0]?.obsrValue}°C</p>
      <p className='text-sm'>{today?.filter((item: FetchTypes) => item.category === 'RN1')[0]?.obsrValue === '0' ? '맑음' : '흐림'}</p>
      <div className='flex gap-2 text-sm'>
        <p>최저: {daily?.filter((item: DailyTypes) => item.category === 'T1H' && item.fcstTime === '0700')[0]?.fcstValue}°C</p>
        <p>최고: {daily?.filter((item: DailyTypes) => item.category === 'T1H' && item.fcstTime === '1200')[0]?.fcstValue}°C</p>
      </div>
    </section>
  );
}
