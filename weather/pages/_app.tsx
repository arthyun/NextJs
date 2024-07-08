import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import Router from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  Router.events.on('routeChangeStart', (url) => {
    console.log(`Loading: ${url}`);
  });
  Router.events.on('routeChangeComplete', (url) => {
    console.log(`Complete: ${url}`);
  });
  Router.events.on('routeChangeError', (url) => {
    console.log(`Error: ${url}`);
  });

  return (
    <>
      <Head>
        <meta name='keywords' content='8DOC' />
        <meta name='description' content='안녕하세요. 전국 팔도의 날씨를 확인하는 사이트입니다.' />
        <meta http-equiv='title' content='8DOC' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <title>8DOC</title>
      </Head>
      <NextNProgress color='#29D' startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      <Component {...pageProps} />
    </>
  );
}
