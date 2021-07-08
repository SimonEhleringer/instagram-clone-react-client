import React from 'react';
import './style.scss';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input className='input' ref={ref} {...props} />;
});

export default Input;
