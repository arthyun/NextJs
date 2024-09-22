import { Metadata } from 'next';
import React from 'react';
import classes from '../(styles)/list.module.scss';
import DetailItem from './(components)/DetailItem';
import DetailReply from './(components)/DetailReply';

export const metadata: Metadata = {
  title: 'Detail | onBoard',
};

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
        cache: 'no-store',
        // next: { revalidate: 60 },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const ListDetail = async ({ params }: { params: { seq: string } }) => {
  const listDetail = await getListDetail(params.seq);
  // console.log(listDetail);

  return (
    <article className={classes.detail_article}>
      <h2>글 상세</h2>
      <DetailItem data={listDetail.board} classes={classes} />
      <DetailReply data={listDetail.reply} classes={classes} />
    </article>
  );
};

export default ListDetail;
