import React, { FC } from 'react';
import './style.scss';

const Input: FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = (props) => {
  return <input className='input' {...props} />;
};

export default Input;
