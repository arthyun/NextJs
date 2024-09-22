import React from 'react';
import classes from '../(styles)/list.module.scss';

const Loading = () => {
  return (
    <article className={classes.skeleton_detail_article}>
      <h2>글 상세</h2>

      <div className={classes.skeleton_detail_contents}>
        <div className={classes.skeleton_detail_top}>
          <p></p>
          <p></p>
        </div>

        <div className={classes.skeleton_detail_center}>
          <h3></h3>
          <p></p>
        </div>

        <div className={classes.skeleton_detail_bottom}>
          <div>
            <span></span>
          </div>
          <div>
            <span></span>
          </div>
          <div>
            <span></span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Loading;
