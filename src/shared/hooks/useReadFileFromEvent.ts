export const useReadFileFromEvent = () => {
  const readFileFromEvent = (
    e: React.ChangeEvent<HTMLInputElement>,
    onFileRead: (dataUri: string) => void
  ) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      if (typeof reader.result !== 'string') {
        return;
      }

      onFileRead(reader.result);
    };
  };

  return { readFileFromEvent };
};
