import React from 'react';

// SSR
const getListDetail = async (seq: string) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_LOCAL_URL + `/api/list/${seq}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const ListDetail = async ({ params }) => {
  const listDetail = await getListDetail(params.seq);
  // console.log(listDetail);

  return (
    <article>
      <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '2rem' }}>
        글 상세
      </h2>
      <p>{listDetail.seq}</p>
      <p>{listDetail.nick_name}</p>
      <p>{listDetail.title}</p>
      <p>{listDetail.content}</p>
      <p>{listDetail.like_count}</p>
      <p>{listDetail.view_count}</p>
      <p>{listDetail.reply_count}</p>
      <p>{listDetail.created_at}</p>
    </article>
  );
};

export default ListDetail;
