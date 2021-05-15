import React, { FC } from 'react';
import './style.scss';

interface Props {
  htmlInputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  innerRef?: React.LegacyRef<HTMLInputElement>;
}

const Input: FC<Props> = ({ htmlInputProps, innerRef }) => {
  return <input className='input' ref={innerRef} {...htmlInputProps} />;
};

export default Input;
