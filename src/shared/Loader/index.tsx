import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export interface LoaderProps {
  color: string;
  size: string;
}

const Loader: React.FC<LoaderProps> = ({ color, size }) => {
  return <ClipLoader color={color} size={size} />;
};

export default Loader;
