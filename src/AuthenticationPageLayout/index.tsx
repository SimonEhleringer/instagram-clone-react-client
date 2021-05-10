import React from 'react';
import './style.scss';

interface Props {}

const AuthenticationPageLayout: React.FC<Props> = ({ children }) => {
  return <div className='authentication-page-layout'>{children}</div>;
};

export default AuthenticationPageLayout;
