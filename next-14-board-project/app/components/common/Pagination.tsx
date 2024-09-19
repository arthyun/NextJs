'use client';
import { FC, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  totalItems?: number;
  itemsPerPage?: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (by: number) => void;
}

const Pagination: FC<IProps> = ({ totalPages, currentPage, onPageChange }) => {
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 페이지 리스트 생성
  //   const pageNumbers = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(i);
  //   }

  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useMemo(() => {
    if (totalPages && currentPage) {
      // startpage : 현재 페이지 기반으로 페이지네이션 시작하는 페이지 (예: 현재 4페이지라면 startpage는 1, 현재 56페이지라면 startpage는 51)
      const startpage = Math.floor((currentPage - 1) / 10) * 10 + 1;
      // <startpage부터 마지막 페이지까지 남은 갯수>와 <10개> 중 작은 수만큼 길이로 현재 페이지부터 순차 배열 생성
      const result = new Array(Math.min(totalPages - startpage + 1, 10))
        .fill(null)
        .map((_n, i) => i + startpage);
      return setPageNumbers(result);
    }
  }, [totalPages, currentPage]);

  return (
    <div className={classes.movie_pagination}>
      <ul>
        {/* 이전 페이지 버튼 */}
        {currentPage !== 1 ? (
          <li className={classes.prev_page}>
            <button
              type='button'
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faCircleLeft} />
            </button>
          </li>
        ) : null}
        {/* 페이지 넘버 버튼 */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? `${classes.active}` : ''}
          >
            <button type='button' onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}
        {/* 다음 페이지 버튼 */}
        {currentPage !== totalPages ? (
          <li className={classes.next_page}>
            <button
              type='button'
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FontAwesomeIcon icon={faCircleRight} />
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default Pagination;
