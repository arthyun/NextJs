import Image from 'next/image';
import Chat from './(components)/Chat';

const getTest = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const result = await response.json();
  return result;
};

export default async function Home({ params }: any) {
  // console.log(params);

  // SSR TEST
  const test = await getTest();
  // console.log(test);

  return (
    <main className='flex min-h-screen flex-col justify-between p-24'>
      <div className='flex justify-end'>
        <Image className='dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert' src='/next.svg' alt='Next.js Logo' width={180} height={37} priority />
      </div>

      <Chat />
    </main>
  );
}
