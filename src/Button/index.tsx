import React from 'react';
import './style.scss';

interface Props {
  caption: string;
}

const Button: React.FC<Props> = ({ caption }) => {
  return <button className='button'>{caption}</button>;
};

export default Button;
