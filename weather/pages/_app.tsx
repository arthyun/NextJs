import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='keywords' content='8DOC' />
        <meta name='description' content='안녕하세요. 전국 팔도의 날씨를 확인하는 사이트입니다.' />
        <meta http-equiv='title' content='8DOC' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <title>8DOC</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
