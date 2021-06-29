import React from 'react';
import Button from '../Button';
import './style.scss';

export interface InvisibleButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const InvisibleButton: React.FC<InvisibleButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <button className='invisible-button' {...rest}>
      {children}
    </button>
  );
};

export default InvisibleButton;
