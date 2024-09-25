'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import BaseButton from '@/app/components/base/BaseButton';
import dayjs from 'dayjs';
import { ReplyTypes } from '../../(types)/ListTypes';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const DetailReply = ({
  data,
  board_seq,
  classes,
}: {
  data: ReplyTypes[];
  board_seq: string;
  classes: any;
}) => {
  const router = useRouter();

  const { data: session } = useSession();

  const [reply, setReply] = useState({
    nick_name: '',
    content: '',
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setReply({
      ...reply,
      content: value,
    });
  };

  const handleSubmit = async () => {
    if (reply.content !== '') {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_LOCAL_URL + `/api/list/${board_seq}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reply),
          }
        );
        const result = await res.json();
        if (result.message === 'ok') {
          //@ts-ignore
          alert('success', '댓글이 등록 되었습니다.');
          // 입력창 초기화
          setReply({
            ...reply,
            content: '',
          });
          return router.refresh();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      //@ts-ignore
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

  useEffect(() => {
    if (session) {
      setReply({
        ...reply,
        nick_name: session.user.name as string,
      });
    }
  }, [session]);

  return (
    <div className={classes.reply_wrap}>
      <h4>{data.length}개의 댓글</h4>
      <div className={classes.reply_input}>
        <input
          name='reply'
          type='text'
          placeholder={
            session
              ? '댓글을 입력해주세요. (최대 100자)'
              : '로그인이 필요합니다.'
          }
          maxLength={100}
          value={reply.content}
          onChange={handleOnChange}
          disabled={session ? false : true}
        />
        <BaseButton
          type={'button'}
          title={'댓글쓰기'}
          onClick={handleSubmit}
          disabled={session ? false : true}
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
