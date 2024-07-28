import { getServerSession } from 'next-auth';

// async function getList() {
//   const response = await fetch('http://localhost:3000/api/list/', {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     credentials: 'include'
//   });
//   const result = response.json();
//   return result;
// }

export default async function Home() {
  const session = await getServerSession(); // SSR 메소드
  // console.log(session);
  // const data = await getList();
  // console.log(data);

  return <main className='flex min-h-screen flex-col items-center justify-between p-24'>아무것도 없음</main>;
}
