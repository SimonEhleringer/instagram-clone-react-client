import { AxiosError } from 'axios';

export type ErrorResponse = {
  errors: string[];
};

export const isAxiosError = (error: Error): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

export const isErrorResponse = (response: any): response is ErrorResponse => {
  return (response as ErrorResponse).errors !== undefined;
};

export const getErrorsArrayFromSagaError = (e: Error) => {
  if (!isAxiosError(e)) {
    return [e.message];
  }

  const axiosError = e as AxiosError<ErrorResponse>;

  if (!axiosError.response || !isErrorResponse(axiosError.response.data)) {
    return [axiosError.message];
  }

  return axiosError.response.data.errors;
};
