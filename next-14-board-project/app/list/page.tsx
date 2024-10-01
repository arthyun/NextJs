import React from 'react';
import classes from './(styles)/list.module.scss';
import ListContents from './(components)/ListContents';
// import { cookies } from 'next/headers';
// import Pagination from '@/app/components/common/Pagination';

// SSR
const getList = async (search: string) => {
  // // 테스트로 토큰을 보내보자
  // const accessToken = cookies().get('accessToken')?.value;

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_LOCAL_URL +
        '/api/list/' +
        `${search ? `?search=${search}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authrization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
        // next: { revalidate: 1500 },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const List = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const search = searchParams['search'] as string;
  const list = await getList(search);
  // console.log('결과 => ', list);

  return (
    <article className={classes.list_article}>
      <h2>글 목록</h2>
      <ListContents list={list} classes={classes} />
      {/* <Pagination
        //   totalItems={paginationData.total_results}
        //   itemsPerPage={10}
        totalPages={paginationData.total_pages}
        currentPage={paginationData.page}
        onPageChange={(page: number) =>
          setPaginationData({
            ...paginationData,
            page: page,
          })
        }
      /> */}
    </article>
  );
};

export default List;
