import type { Metadata } from 'next';
import '@/app/assets/styles/common.scss';
import Header from '@/app/components/common/Header';
import Footer from '@/app/components/common/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <h1 style={{ display: 'none' }}>전체 레이아웃</h1>

        <Header />
        <main>{children}</main>
        <Footer />

        {/* 공통 알럿 */}
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
      </body>
    </html>
  );
}