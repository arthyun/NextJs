'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import BaseButton from '@/app/components/base/BaseButton';
import useAlert from '@/app/hooks/useAlert';
import { useRouter } from 'next/navigation';
import { modalStore } from '@/app/contexts/modalStore';
import { useSession } from 'next-auth/react';
import Login from '@/app/components/common/Login';
import ModalBox from '@/app/components/common/ModalBox';
import useModal from '@/app/hooks/useModal';

const Header = () => {
  // 전역 alert
  if (typeof window !== 'undefined') window.alert = useAlert();

  // Router
  const router = useRouter();

  // User Status
  const { data: session } = useSession();
  console.log(session);

  // Zustand
  const isOpen = modalStore((state) => state.isOpen);

  // States
  const [search, setSearch] = useState<string>('');

  // Modal Func
  const { modalOpen } = useModal();

  const handleOpenLoginModal = () => {
    modalOpen(<Login />, { name: 'Hello Modal~' });
  };

  return (
    <>
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
              onClick={handleOpenLoginModal}
              disabled={false}
            />
          </article>
        </nav>
      </header>

      {/* 로그인 모달 */}
      {isOpen && <ModalBox />}
    </>
  );
};

export default Header;
