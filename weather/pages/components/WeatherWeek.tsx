import React, { useCallback, useEffect, useState } from 'react';
import { DailyTypes } from './WeatherWrap';

type TempStructure = {
  weekName: string;
  minTemp: string;
  maxTemp: string;
};

export default function WeatherWeek({ week }: { week: DailyTypes[] }) {
  // console.log(week);
  // console.log(week.filter((item) => item.category === 'PCP')); //강수량
  // console.log(week.filter((item) => item.category === 'POP')); //강수확률
  // console.log(week.filter((item) => item.category === 'PTY')); //강수형태
  // console.log(week.filter((item) => item.category === 'SKY')); //하늘상태
  // console.log(week.filter((item) => item.category === 'TMP')); //기온

  // 상태
  const [avg, setAvg] = useState<number>(0);
  const [weekName, setWeekName] = useState<string[]>([]);
  const [todayTemp, setTodayTemp] = useState<TempStructure>({
    weekName: '',
    minTemp: '0',
    maxTemp: '0'
  });

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

  // 오늘날 강수 확률 평균
  const popCarculator = (week: DailyTypes[], type: string) => {
    if (type === 'today') {
      const todayPop = week.filter((v: DailyTypes) => v.category === 'POP' && v.fcstDate === v.baseDate);
      let cnt = 0;
      todayPop.forEach((item: DailyTypes) => {
        cnt += parseInt(item.fcstValue);
        return cnt;
      });
      return setAvg(Math.floor(cnt / todayPop.length));
    }
  };

  // 오늘날 최저, 최고 기온 확인
  const tmpCarculator = (week: DailyTypes[], type: string) => {
    if (type === 'today') {
      const todayTmp = week.filter((v: DailyTypes) => v.category === 'TMP' && v.fcstDate === v.baseDate);
      // let wkName = confirmWeekName(changeDate(todayTmp[0].fcstDate));
      let wkName = type === 'today' ? '오늘' : '확인필요';
      let minTmp = todayTmp.find((item) => item.fcstTime === '0600')?.fcstValue;
      let maxTmp = todayTmp.find((item) => item.fcstTime === '1400')?.fcstValue;
      return setTodayTemp({
        weekName: wkName ?? '확인필요',
        minTemp: minTmp ?? '0',
        maxTemp: maxTmp ?? '0'
      });
    }
  };

  // 요일 구하기
  const weekNameCarculator = useCallback(
    (week: DailyTypes[]) => {
      let defineSet = new Set();
      if (week !== undefined) {
        week.forEach((item) => {
          defineSet.add(confirmWeekName(changeDate(item.fcstDate)));
        });
        setWeekName(() => Array.from(defineSet) as string[]);
      }
    },
    [confirmWeekName]
  );

  useEffect(() => {
    // week 배열 데이터 들어온 후에 동작
    if (week.length > 0) {
      // 오늘날 강수 확률 평균
      popCarculator(week, 'today');
      // 오늘날 기온
      tmpCarculator(week, 'today');
      // 요일 구하기
      weekNameCarculator(week);
    }
  }, [week, weekNameCarculator]);

  useEffect(() => {
    if (weekName.length > 0) console.log(weekName);
  }, [weekName]);

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
            <dt>{todayTemp?.weekName}</dt>
            <dd>{avg > 33 && avg < 66 ? '☁️' : avg > 66 && avg <= 100 ? '☔️' : '☀️'} </dd>
            <dd>{todayTemp?.minTemp}°C</dd>
            <dd>{todayTemp?.maxTemp}°C</dd>
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
