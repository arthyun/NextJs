import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home | Next App'
};

export default function Home() {
  return (
    <main className='w-full h-screen relative'>
      <div className='rounded-lg box-border bg-red-500 hover:animate-pulse cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Link href='/video' className='block px-6 py-4 text-white text-center text-4xl font-bold'>
          On Air
        </Link>
      </div>
    </main>
  );
}
