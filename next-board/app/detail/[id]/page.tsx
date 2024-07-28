import { GetPost } from '@/app/Types';

const getPostDetail = async ({ id }: { id: string }) => {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  const result = response.json();
  return result;
};

export default async function DetailPage({ params }) {
  const data: GetPost = await getPostDetail(params);

  return (
    <>
      <h3 className='text-3xl font-bold'>글 상세</h3>
      <div>
        <h3 className='text-xl font-bold'>{data[0].title}</h3>
        <p>{data[0].content}</p>

        {/* 댓글 영역 */}
        <div className='commentArea mt-10 py-4 border-t-2 border-white'>댓글없음</div>
      </div>
    </>
  );
}
