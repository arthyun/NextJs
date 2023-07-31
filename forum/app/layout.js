import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';
import LoginBtn from './LoginBtn';
import LogOutBtn from './LogOutBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default async function RootLayout({ children }) {
  //서버에서 로그인 정보 가져오기
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar">
          <Link href="/" className="logo">
            Appleforum
          </Link>
          <Link href="/list">List</Link>
          <Link href="/write">Write</Link>
          <Link href="/register">Register</Link>

          {session ? <LogOutBtn /> : <LoginBtn />}
        </div>

        {children}
      </body>
    </html>
  );
}
