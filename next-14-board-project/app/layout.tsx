import type { Metadata } from 'next';
import '@/app/assets/styles/common.scss';
import Header from '@/app/components/common/Header';
import Footer from '@/app/components/common/Footer';

export const metadata: Metadata = {
  title: 'onBoard',
  description: 'made by arthyun',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <link rel='icon' href='/favicon.ico' sizes='any' />
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
