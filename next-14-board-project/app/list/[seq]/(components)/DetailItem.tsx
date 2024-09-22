import React, { Fragment } from 'react';
import { ListTypes } from '../../(types)/ListTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faEye,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

const DetailItem = ({ data, classes }: { data: ListTypes[]; classes: any }) => {
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

  return (
    <div className={classes.detail_contents}>
      {data.map((item) => {
        return (
          <Fragment key={item.seq}>
            <div className={classes.detail_top}>
              <p>{item.nick_name}</p>
              <p>{confirmDate(item.created_at)}</p>
            </div>

            <div className={classes.detail_center}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>

            <div className={classes.detail_bottom}>
              <div>
                <FontAwesomeIcon icon={faEye} />
                <span>{item.view_count}</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} />
                <span>{item.reply_count}</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{item.like_count}</span>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default DetailItem;
