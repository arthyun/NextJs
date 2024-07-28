'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Login() {
  const { data: session, status } = useSession(); // CSR 메소드

  if (status === 'loading') {
    return null;
  }

  if (status === 'authenticated' && session) {
    return (
      <>
        <Image src={session.user?.image as string} width={30} height={30} alt='' className='object-cover rounded-full' />
        <p>{session.user?.name}</p>
        <button className='bg-red-600 px-4 py-2 rounded-md' onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <button className='bg-blue-600 px-4 py-2 rounded-md' onClick={() => signIn('google')}>
          Sign in with google
        </button>
        {/* <button className='bg-none border-gray-300 border py-2 px-6 rounded-md mb-2' onClick={() => signIn('github')}>
        Sign in with github
      </button> */}
      </>
    );
  }
}
