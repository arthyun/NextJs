'use client';
import React, { FC } from 'react';
import classes from '../styles/base.module.scss';
import { BaseInputTypes } from '../types/baseTypes';

const BaseInput: FC<BaseInputTypes> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
  disabled,
  readonly,
}) => {
  return (
    <label className={classes.base_input}>
      {name}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        readOnly={readonly}
      />
    </label>
  );
};

export default BaseInput;
