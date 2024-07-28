import Link from 'next/link';
import { GetPost } from './Types';

const getPost = async () => {
  const response = await fetch('http://localhost:3000/api/post/', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  const result = response.json();
  return result;
};

export default async function Home() {
  const data: GetPost[] = await getPost();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <ul>
        {data?.map((item) => {
          return (
            <li key={item.id}>
              <Link href={`/detail/${item.id}/`} className='block p-10 my-4 box-border border-2 border-white'>
                <p>제목: {item.title}</p>
                <p>본문: {item.content}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
