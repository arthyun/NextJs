import React, { useEffect, useState } from 'react';
import { DailyTypes } from './WeatherWrap';

export default function WeatherWeek({ week }: { week: DailyTypes[] }) {
  // console.log(week);
  // console.log(week.filter((item) => item.category === 'PCP')); //강수량
  // console.log(week.filter((item) => item.category === 'POP')); //강수확률
  // console.log(week.filter((item) => item.category === 'PTY')); //강수형태
  // console.log(week.filter((item) => item.category === 'SKY')); //하늘상태
  // console.log(week.filter((item) => item.category === 'TMP')); //기온

  // 상태
  const [day1, setDay1] = useState<DailyTypes[]>([]);
  const [day2, setDay2] = useState<DailyTypes[]>([]);
  const [day3, setDay3] = useState<DailyTypes[]>([]);
  const [day4, setDay4] = useState<DailyTypes[]>([]);
  const [day5, setDay5] = useState<DailyTypes[]>([]);
  const [day6, setDay6] = useState<DailyTypes[]>([]);
  const [day7, setDay7] = useState<DailyTypes[]>([]);

  useEffect(() => {
    if (week.length > 0) {
      // 우선 SKY로 필터링
      const skys = week.filter((item) => item.category === 'SKY');
      const tmps = week.filter((item) => item.category === 'TMP');
      // console.log(tmps);

      // 7일치 분기처리
      setDay1(() => skys.filter((item) => item.fcstDate.slice(item.fcstDate.length - 2) === new Date().getDate().toString().padStart(2, '0')));
      setDay2(() => skys.filter((item) => item.fcstDate.slice(item.fcstDate.length - 2) === (new Date().getDate() + 1).toString().padStart(2, '0')));
      setDay3(() => skys.filter((item) => item.fcstDate.slice(item.fcstDate.length - 2) === (new Date().getDate() + 2).toString().padStart(2, '0')));
      setDay4(() => skys.filter((item) => item.fcstDate.slice(item.fcstDate.length - 2) === (new Date().getDate() + 3).toString().padStart(2, '0')));
      setDay5(() => skys.filter((item) => item.fcstDate.slice(item.fcstDate.length - 2) === (new Date().getDate() + 4).toString().padStart(2, '0')));
      setDay6(() => skys.filter((item) => item.fcstDate.slice(item.fcstDate.length - 2) === (new Date().getDate() + 5).toString().padStart(2, '0')));
      setDay7(() => skys.filter((item) => item.fcstDate.slice(item.fcstDate.length - 2) === (new Date().getDate() + 6).toString().padStart(2, '0')));
    }
  }, [week]);

  // "20240000"를 날짜로 변환 함수
  const dateString = day1?.[0]?.fcstDate;
  const changeDate = (dateString: string | undefined) => {
    const year = Number(dateString?.substring(0, 4));
    const month = Number(dateString?.substring(4, 6)) - 1;
    const day = Number(dateString?.substring(6, 8));
    return new Date(year, month, day);
  };

  // 요일 구하기 함수
  const confirmWeekNameSwitch = (str: number) => {
    switch (str) {
      case 1:
        return '월';
      case 2:
        return '화';
      case 3:
        return '수';
      case 4:
        return '목';
      case 5:
        return '금';
      case 6:
        return '토';
      default:
        return '일';
    }
  };
  const confirmWeekName = (realDate: string) => {
    const newDate = new Date(realDate);
    return confirmWeekNameSwitch(newDate.getDay());
  };

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
          <dl className='flex min-w-16 py-6 box-border gap-4'>
            <dt>오늘</dt>
            <dd>☀️</dd>
            <dd>18°C</dd>
            <dd>28°C</dd>
          </dl>
        </li>
        <li className='border-b-2 border-black'>
          <dl className='flex min-w-16 py-6 box-border gap-4'>
            <dt>토</dt>
            <dd>☁️</dd>
            <dd>29°C</dd>
            <dd>50°C</dd>
          </dl>
        </li>
        <li className='border-b-2 border-black'>
          <dl className='flex min-w-16 py-6 box-border gap-4'>
            <dt>일</dt>
            <dd>☔️</dd>
            <dd>20°C</dd>
            <dd>40°C</dd>
          </dl>
        </li>
      </ul>
    </section>
  );
}
