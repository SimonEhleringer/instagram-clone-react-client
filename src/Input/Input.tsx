import React, { FC } from 'react';
import './Input.scss';

const Input: FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = (props) => {
  return <input className='input' {...props} />;
};

export default Input;
