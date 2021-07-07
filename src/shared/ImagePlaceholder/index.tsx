import { render } from '@testing-library/react';
import React from 'react';
import { useState } from 'react';
import './style.scss';

export enum ImagePlaceholderShape {
  square,
  circle,
}

export interface ImagePlaceholderProps {
  widthInPx: number;
  shape: ImagePlaceholderShape;
  render: (onLoad: () => void) => JSX.Element;
}

// TODO: Add tests
const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  widthInPx,
  shape,
  render,
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  const onLoad = () => setHasLoaded(true);

  return (
    <div
      className={`image-placeholder ${
        !hasLoaded ? 'image-placeholder--image-loading' : ''
      }`}
    >
      {render(onLoad)}
      <div
        style={{ width: widthInPx }}
        className={`image-placeholder__placeholder ${
          shape === ImagePlaceholderShape.circle
            ? 'image-placeholder__placeholder--circle'
            : ''
        } ${hasLoaded ? 'image-placeholder__placeholder--image-loaded' : ''}`}
      />
    </div>
  );
};

export default ImagePlaceholder;
