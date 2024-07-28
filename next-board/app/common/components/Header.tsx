import Link from 'next/link';
import React from 'react';
import Login from './Login';

const Header = () => {
  return (
    <header>
      <nav className='w-full px-4 border-b-[1px] border-white'>
        <ul className='flex justify-between box-border'>
          <div className='flex gap-2'>
            <li>
              <Link href='/' className='block px-10 py-6 bg-slate-400 hover:bg-red-200'>
                홈
              </Link>
            </li>
            <li>
              <Link href='/write' className='block px-10 py-6 bg-slate-400 hover:bg-red-200'>
                글 작성
              </Link>
            </li>
          </div>
          <div className='flex gap-2 items-center'>
            <Login />
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
