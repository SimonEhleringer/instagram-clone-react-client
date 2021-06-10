import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './style.scss';

interface LoaderProps {
  loading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading = true, children }) => {
  return (
    <>
      {loading ? (
        <div data-testid='loader' className='loader'>
          <ClipLoader color='#8e8e8e' size='4rem' />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Loader;
