'use client';
import React, { ChangeEvent, useState } from 'react';
import BaseButton from '@/app/components/base/BaseButton';
import dayjs from 'dayjs';
import { ReplyTypes } from '../../(types)/ListTypes';

const DetailReply = ({
  data,
  classes,
}: {
  data: ReplyTypes[];
  classes: any;
}) => {
  const [reply, setReply] = useState<string>('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setReply(value);
  };

  const handleSubmit = () => {
    if (reply !== '') {
      console.log(reply);
    } else {
      alert('error', '댓글을 입력하지 않았습니다.');
    }
  };

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

  //   // 댓글 더미 데이터
  //   const replyList = [
  //     {
  //       seq: 1,
  //       board_seq: 7,
  //       nick_name: '관리자',
  //       content: '댓글입니다.111111111',
  //       created_at: '2024-09-22T14:42:44',
  //     },
  //     {
  //       seq: 2,
  //       board_seq: 7,
  //       nick_name: '관리자',
  //       content: '댓글입니다.222222222',
  //       created_at: '2024-09-21T10:42:44',
  //     },
  //     {
  //       seq: 3,
  //       board_seq: 7,
  //       nick_name: '관리자',
  //       content: '댓글입니다.33333333333',
  //       created_at: '2024-09-20T07:42:44',
  //     },
  //   ];

  return (
    <div className={classes.reply_wrap}>
      <h4>{data.length}개의 댓글</h4>
      <div className={classes.reply_input}>
        <input
          type='text'
          placeholder='댓글을 입력해주세요 (최대 100자)'
          maxLength={100}
          value={reply}
          onChange={handleOnChange}
        />
        <BaseButton
          type={'button'}
          title={'댓글쓰기'}
          onClick={handleSubmit}
          disabled={false}
        />
      </div>
      <div className={classes.reply_list}>
        {data.map((item) => {
          return (
            <div key={item.seq} className={classes.reply_list_div}>
              <div className={classes.reply_top}>
                <span>{item.nick_name}</span>
                <span>{confirmDate(item.created_at)}</span>
              </div>
              <div className={classes.reply_center}>
                <p>{item.content}</p>
              </div>
              {/* 따봉기능 미추가 */}
              {/* <div className={classes.reply_bottom}>
                <span></span>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailReply;
