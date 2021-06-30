import { AxiosError } from 'axios';

export type ErrorResponseDto = {
  errors: string[];
};

const isAxiosError = (error: Error): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

const isErrorResponseDto = (response: any): response is ErrorResponseDto => {
  return (response as ErrorResponseDto).errors !== undefined;
};

export const getErrorsArrayFromError = (e: Error) => {
  if (!isAxiosError(e)) {
    return [e.message];
  }

  const axiosError = e as AxiosError<ErrorResponseDto>;

  if (!axiosError.response || !isErrorResponseDto(axiosError.response.data)) {
    return [axiosError.message];
  }

  return axiosError.response.data.errors;
};
