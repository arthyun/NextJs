import React from 'react';
import classes from './(styles)/list.module.scss';

// SSR
const getList = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_URL + '/api/list/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const List = async ({ params, searchParams }) => {
  const list = await getList();
  console.log('결과 => ', list);

  return <div className={classes.list_div}>List</div>;
};

export default List;
