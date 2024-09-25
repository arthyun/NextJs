import React from 'react';
import classes from './(styles)/write.module.scss';

const WriteLoading = () => {
  return (
    <section className={classes.skeleton_write_section}>
      <h1>새로운 글 작성</h1>
      <article className={classes.skeleton_write_article}>
        <h2>새 글 작성</h2>
        <form className={classes.skeleton_write_form}></form>
      </article>
    </section>
  );
};

export default WriteLoading;
