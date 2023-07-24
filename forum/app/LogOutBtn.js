'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';

const githubSrc = 'https://avatars.githubusercontent.com/u/99110257?v=4';
const googleSrc = 'https://lh3.googleusercontent.com/a/AAcHTtezYvqD50NAgZho3lb7Ssv3uPLmpeuDEqDQ7aq_7gqrUA=s96-c';

const LogOutBtn = () => {
  return (
    <>
      <Image style={{ verticalAlign: 'bottom', marginRight: '10px' }} src={googleSrc} width={40} height={40} alt="사용자 프로필" />
      <button
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
    </>
  );
};

export default LogOutBtn;
