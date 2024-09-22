'use client';
import React from 'react';
import { ListTypes } from '../(types)/ListTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faEye,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import BaseButton from '@/app/components/base/BaseButton';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

const ListContents = ({
  list,
  classes,
}: {
  list: ListTypes[];
  classes: any;
}) => {
  const router = useRouter();

  // 날짜 계산
  const confirmDate = (listTime?: any): any => {
    const time = listTime; // 주어진 날짜
    const date = dayjs(time); // 주어진 날짜를 dayjs로 변환
    const today = dayjs(); // 현재 날짜

    // 차이를 구하는 부분 (일 단위로 차이 계산)
    const calcDateInDays = today.diff(date, 'day'); // 일 단위 차이 계산
    const calcDateInHours = today.diff(date, 'hour'); // 시간 단위 차이 계산
    const calcDateInMinutes = today.diff(date, 'minute'); // 분 단위 차이 계산

    if (calcDateInHours > 0 && calcDateInHours <= 24) {
      return calcDateInHours + '시간 전';
    } else if (calcDateInHours > 24) {
      return calcDateInDays + '일 전';
    } else {
      return calcDateInMinutes + '분 전';
    }
  };

  // 선택
  const handleSelectList = (seq: number) => {
    // console.log(seq);
    router.push(`/list/${seq}`);
  };

  return (
    <>
      <BaseButton
        type={'button'}
        title={'새로운 글 작성'}
        onClick={() => router.push(`/write`)}
        disabled={false}
      />
      <ul>
        {list?.map((item) => {
          return (
            <li key={item.seq} onClick={() => handleSelectList(item.seq)}>
              <div className={classes.list_wrap}>
                <div className={classes.top_section}>
                  <span>{item.nick_name}</span>
                  <span>{confirmDate(item.created_at)}</span>
                </div>
                <div className={classes.center_section}>
                  <span>{item.title}</span>
                </div>
                <div className={classes.bottom_section}>
                  <span>
                    <FontAwesomeIcon icon={faEye} /> &nbsp;
                    {item.view_count}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faCommentDots} /> &nbsp;
                    {item.reply_count}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faThumbsUp} /> &nbsp;
                    {item.like_count}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ListContents;
