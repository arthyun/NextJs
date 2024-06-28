import React from 'react';

export default function WeatherHeader() {
  return (
    <section className='xl:w-4/12 flex flex-col items-center box-border border-2 border-red-600'>
      <h3 className='text-lg'>경기도</h3>
      <p className='text-4xl'>30°C</p>
      <p className='text-sm'>맑음</p>
      <div className='flex gap-2 text-sm'>
        <p>최저: 20°C</p>
        <p>최고: 30°C</p>
      </div>
    </section>
  );
}
