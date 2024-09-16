'use client';
import Link from 'next/link';
import React from 'react';
import BaseButton from '@/app/components/base/BaseButton';
// import { userStore } from '@/app/contexts/userStore';

const Header = () => {
  // Zustand Test
  //   const bears = userStore((state) => state.bears);
  //   console.log(bears);

  return (
    <header>
      <nav>
        <ul>
          <li className='header_logo'>
            <Link href={'/'}>onBoard</Link>
          </li>
          <li className='header_menu'>
            <Link href={'/list'}>List</Link>
          </li>
          <li className='header_menu'>
            <Link href={'/notice'}>Notice</Link>
          </li>
        </ul>

        <article className='center_article'>
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
          <input type='text' placeholder='검색어 입력' />
        </article>

        <article className='right_article'>
          <BaseButton
            type={'button'}
            title={'로그인'}
            onClick={() => console.log('login button')}
            disabled={false}
          />
        </article>
      </nav>
    </header>
  );
};

export default Header;
