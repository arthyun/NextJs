'use client';
import React, { FC } from 'react';
import classes from '../styles/base.module.scss';
import { BaseButtonTypes } from '../types/baseTypes';

const BaseButton: FC<BaseButtonTypes> = ({
  type,
  title,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={classes.base_button}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default BaseButton;
