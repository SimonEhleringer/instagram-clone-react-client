import React from 'react';
import { CircularProgress } from '@material-ui/core';

export interface LoaderProps {
  color: string;
  size: string;
}

const Loader: React.FC<LoaderProps> = ({ color, size }) => {
  return <CircularProgress size={size} style={{ color: color }} />;
};

export default Loader;
