import React from 'react';
import { Metadata } from 'next';
import classes from './(styles)/write.module.scss';

export const metadata: Metadata = {
  title: 'List | onBoard',
};

const WriteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={classes.write_section}>
      <h1>새로운 글 작성</h1>
      {children}
    </section>
  );
};

export default WriteLayout;
