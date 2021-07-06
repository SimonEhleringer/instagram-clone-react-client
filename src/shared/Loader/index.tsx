import React from 'react';
import { FadeLoader } from 'react-spinners';
import ReactLoader from 'react-loader-spinner';

export interface LoaderProps {
  color: string;
  size: string;
}

const Loader: React.FC<LoaderProps> = ({ color, size }) => {
  return <ReactLoader type='Oval' color={color} height={size} width={size} />;
};

export default Loader;
