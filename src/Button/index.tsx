import React from 'react';
import './style.scss';

interface Props {
  testId?: string;
  htmlInputProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}

const Button: React.FC<Props> = ({ htmlInputProps, testId, children }) => {
  return (
    <button {...htmlInputProps} data-testid={testId} className='button'>
      {children}
    </button>
  );
};

export default Button;
