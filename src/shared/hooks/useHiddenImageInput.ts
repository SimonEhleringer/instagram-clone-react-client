import { useHiddenFileInput } from './useHiddenFileInput';

export const useHiddenImageInput = (
  onChange: React.ChangeEventHandler<HTMLInputElement>
) => {
  return useHiddenFileInput({
    accept: 'image/png, image/jpeg',
    onChange: onChange,
  });
};
