import React from 'react';
import { border } from '../../scss/variables';
import Loader from '../Loader';
import './style.scss';

interface PageLoaderProps {
  isLoading?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading = true,
  children,
}) => {
  return (
    <>
      {isLoading ? (
        <div data-testid='page-loader' className='page-loader'>
          <Loader color={border} size='3rem' />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default PageLoader;
