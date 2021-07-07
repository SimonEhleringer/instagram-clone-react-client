import React from 'react';
import './style.scss';
import Loader from '../Loader';

interface PageLoaderProps {
  isLoading?: boolean;
}

// TODO: color as variable
const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading = true,
  children,
}) => {
  return (
    <>
      {isLoading ? (
        <div data-testid='page-loader' className='page-loader'>
          <Loader color='#8e8e8e' size='3rem' />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default PageLoader;
