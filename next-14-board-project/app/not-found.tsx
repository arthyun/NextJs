'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import '@/app/assets/styles/common.scss';

const NotFound = () => {
  const router = useRouter();

  const handleReturn = () => {
    router.replace('/');
  };

  return (
    <section className='not_found'>
      <article>
        <h1>찾을 수 없는 페이지입니다.</h1>
        <p>에러코드 : 404</p>
        <button type='button' onClick={handleReturn}>
          돌아가기
        </button>
      </article>
    </section>
  );
};

export default NotFound;
