import React from 'react';
import { Metadata } from 'next';
import classes from './(styles)/write.module.scss';

export const metadata: Metadata = {
  title: 'Write | onBoard',
};

const Write = () => {
  return (
    <article className={classes.write_article}>
      <h2>새 글 작성</h2>
      {/* <ListContents list={list} classes={classes} /> */}
    </article>
  );
};

export default Write;
