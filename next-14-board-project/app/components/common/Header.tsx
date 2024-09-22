'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import BaseButton from '@/app/components/base/BaseButton';
import useAlert from '@/app/hooks/useAlert';
import { useRouter } from 'next/navigation';
// import { userStore } from '@/app/contexts/userStore';

const Header = () => {
  // 전역 alert
  if (typeof window !== 'undefined') window.alert = useAlert();

  // Zustand Test
  //   const bears = userStore((state) => state.bears);
  //   console.log(bears);

  const [search, setSearch] = useState<string>('');

  const router = useRouter();

  return (
    <header>
      <nav>
        <h1>GNB</h1>
        <ul>
          <li className='header_logo'>
            <Link href={'/'}>onBoard</Link>
          </li>
          <li className='header_menu'>
            <Link href={'/list'}>글 목록</Link>
          </li>
          <li className='header_menu'>
            <Link href={'/notice'}>공지사항</Link>
          </li>
        </ul>

        <article className='center_article'>
          <h3>검색부분</h3>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
            data-slot='icon'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            ></path>
          </svg>
          <input
            type='text'
            placeholder='검색어 입력'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                router.push(`/list?search=${search}`);
              }
            }}
          />
        </article>

        <article className='right_article'>
          <h3>로그인 부분</h3>
          <BaseButton
            type={'button'}
            title={'로그인'}
            //@ts-ignore
            onClick={() => alert('info', '로그인 버튼입니다.')}
            disabled={false}
          />
        </article>
      </nav>
    </header>
  );
};

export default Header;
