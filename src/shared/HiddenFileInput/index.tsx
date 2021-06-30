import React from 'react';
import { HiddenImageInputProps } from '../HiddenImageInput';

export interface HiddenFileInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

// TODO: data-testid should be passed only as props
const HiddenFileInput = React.forwardRef<
  HTMLInputElement,
  HiddenImageInputProps
>((props, ref) => {
  return (
    <input
      data-testid='hiddenFileInput'
      type='file'
      style={{ display: 'none' }}
      {...props}
      ref={ref}
    />
  );
});

export default HiddenFileInput;
