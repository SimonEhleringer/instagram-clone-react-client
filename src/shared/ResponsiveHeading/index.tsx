import React from 'react';
import './style.scss';

export interface ResponsiveHeadingProps {}

const ResponsiveHeading: React.FC<ResponsiveHeadingProps> = ({ children }) => {
  return <h1 className='responsive-heading'>{children}</h1>;
};

export default ResponsiveHeading;
