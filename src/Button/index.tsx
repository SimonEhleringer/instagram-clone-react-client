import React from 'react';
import './style.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const Button: React.FC<Props> = (props) => {
  return (
    <button data-testid='button' {...props} className='button'>
      {props.children}
    </button>
  );
};

export default Button;
