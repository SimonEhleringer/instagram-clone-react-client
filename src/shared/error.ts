import { AxiosError } from 'axios';
import * as thisModule from './error';

export type ErrorResponseDto = {
  errors: string[];
};

export const isAxiosError = (error: Error): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

export const isErrorResponse = (
  response: any
): response is ErrorResponseDto => {
  return (response as ErrorResponseDto).errors !== undefined;
};

export const getErrorsArrayFromError = (e: Error) => {
  if (!thisModule.isAxiosError(e)) {
    return [e.message];
  }

  const axiosError = e as AxiosError<ErrorResponseDto>;

  if (
    !axiosError.response ||
    !thisModule.isErrorResponse(axiosError.response.data)
  ) {
    return [axiosError.message];
  }

  return axiosError.response.data.errors;
};
