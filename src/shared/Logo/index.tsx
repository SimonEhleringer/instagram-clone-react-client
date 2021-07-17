import React from 'react';
import './style.scss';

export interface LogoProps {
  size: string;
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <h1 className='logo' style={{ fontSize: size }}>
      Instagram Klon
    </h1>
  );
};

export default Logo;
