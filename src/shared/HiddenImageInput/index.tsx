import React from 'react';
import HiddenFileInput, { HiddenFileInputProps } from '../HiddenFileInput';

export interface HiddenImageInputProps extends HiddenFileInputProps {}

const HiddenImageInput = React.forwardRef<
  HTMLInputElement,
  HiddenImageInputProps
>((props, ref) => {
  return (
    <HiddenFileInput accept={'image/png, image/jpeg'} {...props} ref={ref} />
  );
});

export default HiddenImageInput;
