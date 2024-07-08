import React, { useCallback, useEffect, useState } from 'react';
import { DailyTypes } from './WeatherWrap';

type WeekResultTypes = {
  weekName: string;
  data: string[];
  rainAvg: number;
};

export default function WeatherWeek({ week }: { week: DailyTypes[] }) {
  // PCP - 강수량
  // POP - 강수확률
  // PTY - 강수형태
  // SKY - 하늘상태
  // TMP - 기온

  // 상태
  const [avg, setAvg] = useState<number>(0);
  const [weekWeather, setWeekWeather] = useState<WeekResultTypes[]>([]);

  // "20240000" 형식의 날짜를 변환해주는 함수
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
  const confirmWeekName = useCallback((realDate: string | Date) => {
    const newDate = new Date(realDate);
    return confirmWeekNameSwitch(newDate.getDay());
  }, []);

  // 요일, 강수량평균, 최저, 최고기온 계산 함수
  const weatherCarculator = useCallback(
    (week: DailyTypes[]) => {
      // 요일명 계산
      let weekNameSet = new Set();
      if (week !== undefined) {
        week.forEach((item) => {
          weekNameSet.add(confirmWeekName(changeDate(item.fcstDate)));
        });
        const weekNameTotal = Array.from(weekNameSet) as string[];

        // 일주일치 계산
        // 오늘
        const todayTotal = week.filter((item) => item.category === 'TMP' && item.baseDate === item.fcstDate);
        let todaySet = new Set();
        todayTotal.forEach((item) => todaySet.add(item.fcstValue));
        const todayResult = Array.from(todaySet).sort() as string[];
        // 오늘 강수확률
        const todayPop = week.filter((v: DailyTypes) => v.category === 'POP' && v.baseDate === v.fcstDate);
        let todayCnt = 0;
        todayPop.forEach((item: DailyTypes) => (todayCnt += parseInt(item.fcstValue)));
        const todayPopAvg = Math.floor(todayCnt / todayPop.length);

        // 내일
        const firstTotal = week.filter((v) => v.category === 'TMP' && v.fcstDate === getNextDayFormatted(1));
        let firstSet = new Set();
        firstTotal.forEach((item) => firstSet.add(item.fcstValue));
        const firstResult = Array.from(firstSet).sort() as string[];
        // 내일 강수확률
        const firstPop = week.filter((v: DailyTypes) => v.category === 'POP' && v.fcstDate === getNextDayFormatted(1));
        let firstCnt = 0;
        firstPop.forEach((item: DailyTypes) => (firstCnt += parseInt(item.fcstValue)));
        const firstPopAvg = Math.floor(firstCnt / firstPop.length);

        // 모레
        const secondTotal = week.filter((v) => v.category === 'TMP' && v.fcstDate === getNextDayFormatted(2));
        let secondSet = new Set();
        secondTotal.forEach((item) => secondSet.add(item.fcstValue));
        const secondResult = Array.from(secondSet).sort() as string[];
        // 모레 강수확률
        const secondPop = week.filter((v: DailyTypes) => v.category === 'POP' && v.fcstDate === getNextDayFormatted(2));
        let secondCnt = 0;
        secondPop.forEach((item: DailyTypes) => (secondCnt += parseInt(item.fcstValue)));
        const secondPopAvg = Math.floor(secondCnt / secondPop.length);

        // 글피
        const thirdTotal = week.filter((v) => v.category === 'TMP' && v.fcstDate === getNextDayFormatted(3));
        let thirdSet = new Set();
        thirdTotal.forEach((item) => thirdSet.add(item.fcstValue));
        const thirdResult = Array.from(thirdSet).sort() as string[];
        // 글피 강수확률
        const thirdPop = week.filter((v: DailyTypes) => v.category === 'POP' && v.fcstDate === getNextDayFormatted(3));
        let thirdCnt = 0;
        thirdPop.forEach((item: DailyTypes) => (thirdCnt += parseInt(item.fcstValue)));
        const thirdPopAvg = Math.floor(thirdCnt / thirdPop.length);

        // 최종 결과물 ({weekName: '', data: ''} 형태로 제작할 것)
        const realResult = weekNameTotal.reduce((acc: WeekResultTypes[], cur, index) => {
          acc.push({
            weekName: cur,
            data: index === 0 ? todayResult : index === 1 ? firstResult : index === 2 ? secondResult : thirdResult,
            rainAvg: index === 0 ? todayPopAvg : index === 1 ? firstPopAvg : index === 2 ? secondPopAvg : thirdPopAvg
          });
          return acc;
        }, []);
        return setWeekWeather(realResult);
      }
    },
    [confirmWeekName]
  );

  // 다음날 날짜 형식에 맞춰 출력하기
  const getNextDayFormatted = (num: number) => {
    // 현재 날짜를 가져옴
    let today = new Date();
    // 다음 날 날짜를 구함
    today.setDate(today.getDate() + num);
    // 연도, 월, 일 값을 추출함
    let year = today.getFullYear();
    let month: string | number = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줌
    let day: string | number = today.getDate();
    // 월과 일이 한 자리 수일 경우 앞에 0을 붙임
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    // 최종 형식으로 반환
    return `${year}${month}${day}`;
  };

  useEffect(() => {
    // week 배열 데이터 들어온 후에 동작
    if (week.length > 0) {
      // 전체 데이터 계산식을 포함한 총 집합
      weatherCarculator(week);
    }
  }, [week, weatherCarculator]);

  return (
    <section className='xl:w-full xl:mt-6 md:mt-0 box-border rounded-xl text-white bg-black bg-opacity-15 p-4 md:h-[300px] 2sm:h-[180px]'>
      <h3>🗓️ 주간 일기예보</h3>
      <ul className='weekScrollArea flex flex-col gap-2 mt-4 2sm:h-[240px] overflow-y-scroll'>
        {weekWeather?.map((item, index) => {
          return (
            <li className='border-b-[1px] border-[#bbb]' key={index}>
              <dl className='flex min-w-16 py-4 box-border items-center text-center font-light md:text-[22px] 2sm:text-[14px]'>
                <dt className='font-normal md:w-[10%] 2sm:w-[15%]'>{item.weekName}</dt>
                <dd className='md:w-[10%] 2sm:w-[15%]'>{item.rainAvg > 33 && item.rainAvg < 66 ? '☁️' : item.rainAvg > 66 && item.rainAvg <= 100 ? '☔️' : '☀️'} </dd>
                <dd className='md:w-[15%] 2sm:w-[20%]'>{item.data[0]}°C</dd>
                <dd className='block h-[10px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg overflow-hidden md:w-[50%] 2sm:w-[30%]'><span className='block w-[10px] h-[10px] bg-transparent border-2 border-[#fff] rounded-lg indent-[999px] overflow-hidden relative' style={{ left: item.rainAvg ? `${item.rainAvg}%` : '0%' }}>circle</span></dd>
                <dd className='md:w-[15%] 2sm:w-[20%]'>{item.data.length !== 1 ? item.data[weekWeather.length - 1] : item.data[0]}°C</dd>
              </dl>
            </li>
          );
        })}
        <li className='border-b-[1px] border-[#bbb]'>
          <dl className='flex min-w-16 py-4 box-border items-center text-center text-[20px] font-light'>
            <dt className='w-[10%] font-normal'>토</dt>
            <dd className='w-[10%]'>{avg > 33 && avg < 66 ? '☁️' : avg > 66 && avg <= 100 ? '☔️' : '☀️'} </dd>
            <dd className='w-[15%]'>29°C</dd>
            <dd className='block w-[50%] min-w-20 h-[14px] bg-orange-400 rounded-lg'></dd>
            <dd className='w-[15%]'>50°C</dd>
          </dl>
        </li>
        <li className='border-b-[1px] border-[#bbb]'>
          <dl className='flex min-w-16 py-4 box-border items-center text-center text-[20px] font-light'>
            <dt className='w-[10%] font-normal'>토</dt>
            <dd className='w-[10%]'>{avg > 33 && avg < 66 ? '☁️' : avg > 66 && avg <= 100 ? '☔️' : '☀️'} </dd>
            <dd className='w-[15%]'>29°C</dd>
            <dd className='block w-[50%] min-w-20 h-[14px] bg-orange-400 rounded-lg'></dd>
            <dd className='w-[15%]'>50°C</dd>
          </dl>
        </li>{' '}
        <li className='border-b-[1px] border-[#bbb]'>
          <dl className='flex min-w-16 py-4 box-border items-center text-center text-[20px] font-light'>
            <dt className='w-[10%] font-normal'>토</dt>
            <dd className='w-[10%]'>{avg > 33 && avg < 66 ? '☁️' : avg > 66 && avg <= 100 ? '☔️' : '☀️'} </dd>
            <dd className='w-[15%]'>29°C</dd>
            <dd className='block w-[50%] min-w-20 h-[14px] bg-orange-400 rounded-lg'></dd>
            <dd className='w-[15%]'>50°C</dd>
          </dl>
        </li>
      </ul>
    </section>
  );
}
