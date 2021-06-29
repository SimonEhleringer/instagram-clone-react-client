import { useRef } from 'react';

export const useHiddenInput = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pretendClickOnFileInput = () => {
    fileInputRef.current?.click();
  };

  return { fileInputRef, pretendClickOnFileInput };
};
