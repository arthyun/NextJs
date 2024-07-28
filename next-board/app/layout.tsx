import './assets/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SessionWrapper from './common/components/SessionWrapper';
import Header from './common/components/Header';
import Footer from './common/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home | Next App',
  description: 'Made by arthyun'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionWrapper>
          <Header />
          {children}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
