import React from 'react';
import './style.scss';

interface SlimPageLayoutProps {}

const SlimPageLayout: React.FC<SlimPageLayoutProps> = ({ children }) => {
  return (
    <div className='slim-page-layout'>
      <div className='slim-page-layout__content-wrapper'>{children}</div>
    </div>
  );
};

export default SlimPageLayout;
