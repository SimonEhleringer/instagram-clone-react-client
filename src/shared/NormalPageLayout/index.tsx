import React from 'react';
import './style.scss';

interface NormalPageLayoutProps {}

const NormalPageLayout: React.FC<NormalPageLayoutProps> = ({ children }) => {
  return (
    <div className='normal-page-layout'>
      <div className='normal-page-layout__content-wrapper'>{children}</div>
    </div>
  );
};

export default NormalPageLayout;
