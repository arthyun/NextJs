import React from 'react';
import { Metadata } from 'next';
import classes from './(styles)/list.module.scss';

export const metadata: Metadata = {
  title: 'List | onBoard',
};

const ListLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={classes.list_section}>
      <h1>목록 및 상세</h1>
      {children}
    </section>
  );
};

export default ListLayout;
