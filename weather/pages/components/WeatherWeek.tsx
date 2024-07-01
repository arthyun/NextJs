import React from 'react';
import { DailyTypes } from './WeatherWrap';

export default function WeatherWeek({ week }: { week: DailyTypes[] }) {
  console.log(week.filter((item) => item.category === 'PCP')); //강수량
  console.log(week.filter((item) => item.category === 'POP')); //강수확률
  console.log(week.filter((item) => item.category === 'PTY')); //강수형태
  console.log(week.filter((item) => item.category === 'SKY')); //하늘상태
  console.log(week.filter((item) => item.category === 'TMP')); //기온

  return <section className='xl:w-full box-border  border-2 border-green-600'>WeatherWeek</section>;
}
