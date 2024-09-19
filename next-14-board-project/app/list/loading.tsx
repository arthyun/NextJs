import React from 'react';
import classes from './(styles)/list.module.scss';

const Loading = () => {
  const dummy = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

  return (
    <ul className={classes.skeleton_ul}>
      {dummy.map((item, index) => {
        return (
          <li key={index}>
            <div className={classes.skeleton_list_wrap}>
              <div className={classes.skeleton_top_section}>
                <span></span>
                <span></span>
              </div>
              <div className={classes.skeleton_center_section}>
                <span></span>
              </div>
              <div className={classes.skeleton_bottom_section}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Loading;
