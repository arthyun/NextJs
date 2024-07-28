'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

const Page = ({ params, searchParams }) => {
  const { data: session, status } = useSession(); // CSR 메소드
  console.log(session);

  return (
    <>
      <h3 className='text-3xl font-bold'>글 작성하기</h3>
      <form>
        <label htmlFor='title'>제목</label>
        <input type='text' id='title' placeholder='title' />
        <label htmlFor='content'>본문</label>
        <input type='text' id='content' placeholder='content' />
        <button type='submit'>작성</button>
      </form>
    </>
  );
};

export default Page;
