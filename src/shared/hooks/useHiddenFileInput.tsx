import { useRef } from 'react';

export const useHiddenFileInput = (
  fileInputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pretendClickOnFileInput = () => {
    fileInputRef.current?.click();
  };

  const fileInput = (
    <input
      data-testid='hiddenFileInput'
      ref={fileInputRef}
      type='file'
      style={{ display: 'none' }}
      {...fileInputProps}
    />
  );

  return { fileInput, pretendClickOnFileInput };
};
