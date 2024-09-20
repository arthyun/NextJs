import { Dispatch, SetStateAction } from 'react';

export interface BaseInputTypes {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: Dispatch<SetStateAction<any>>;
  required: boolean;
  disabled: boolean;
}

export interface BaseButtonTypes {
  type: 'submit' | 'reset' | 'button' | undefined;
  title: string;
  onClick: (by: any) => void;
  disabled: boolean;
}