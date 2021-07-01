import React from 'react';

export interface HiddenFileInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const HiddenFileInput = React.forwardRef<
  HTMLInputElement,
  HiddenFileInputProps
>((props, ref) => {
  return <input type='file' style={{ display: 'none' }} {...props} ref={ref} />;
});

export default HiddenFileInput;
