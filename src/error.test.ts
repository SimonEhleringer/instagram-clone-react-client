import { AxiosError, AxiosRequestConfig } from 'axios';

// import {
//   ErrorResponse,
//   getErrorsArrayFromError,
//   isAxiosError,
//   isErrorResponse,
// } from './error';
import * as testModule from './error';
// jest.mock('./error.ts');

// const isAxiosErrorMock = isAxiosError as jest.MockedFunction<
//   typeof isAxiosError
// >;
// const isErrorResponseMock = isErrorResponse as jest.MockedFunction<
//   typeof isErrorResponse
// >;

describe('isAxiosError', () => {
  it('should return true when error is axios error', () => {
    const config: AxiosRequestConfig = {};

    const error: AxiosError = {
      config,
      isAxiosError: true,
      message: 'error',
      name: 'name',
      toJSON: () => {
        return {};
      },
    };

    const expected = true;

    const actual = testModule.isAxiosError(error);

    expect(actual).toBe(expected);
  });

  it('should return false when error is not an axios error', () => {
    const error: Error = {
      message: 'error',
      name: 'name',
    };

    const expected = false;

    const actual = testModule.isAxiosError(error);

    expect(actual).toBe(expected);
  });
});

describe('isErrorResponse', () => {
  it('should return true when error is error response', () => {
    const errorResponse: testModule.ErrorResponse = {
      errors: ['error'],
    };

    const expected = true;

    const actual = testModule.isErrorResponse(errorResponse);

    expect(actual).toBe(expected);
  });

  it('should return false when error is not an error response', () => {
    const error: Error = {
      message: 'error',
      name: 'name',
    };

    const expected = false;

    const actual = testModule.isErrorResponse(error);

    expect(actual).toBe(expected);
  });
});

describe('getErrorsArrayFromError', () => {
  it('should return errors from error response when error is axios error of errors response', () => {
    const config: AxiosRequestConfig = {};

    const errorResponse: testModule.ErrorResponse = {
      errors: ['error in error response'],
    };

    const axiosError: AxiosError<testModule.ErrorResponse> = {
      config,
      isAxiosError: true,
      message: 'message',
      name: 'name',
      toJSON: () => {
        return {};
      },
      response: {
        config,
        data: errorResponse,
        headers: [],
        status: 400,
        statusText: '',
      },
    };

    jest.spyOn(testModule, 'isAxiosError').mockReturnValue(true);
    jest.spyOn(testModule, 'isErrorResponse').mockReturnValue(true);

    const errorsArray = testModule.getErrorsArrayFromError(axiosError);

    expect(errorsArray).toBe(errorResponse.errors);
  });

  it('should return error message from axios error when error is axios error but not of errors response', () => {
    const message = 'error message in axios error';

    const axiosError: AxiosError = {
      config: {},
      isAxiosError: true,
      message,
      name: 'name',
      toJSON: () => {
        return {};
      },
      response: {
        config: {},
        data: {},
        headers: [],
        status: 1,
        statusText: '',
      },
    };

    jest.spyOn(testModule, 'isAxiosError').mockReturnValue(true);
    jest.spyOn(testModule, 'isErrorResponse').mockReturnValue(false);

    const errorsArray = testModule.getErrorsArrayFromError(axiosError);

    expect(errorsArray.length).toBe(1);
    expect(errorsArray[0]).toBe(message);
  });

  it('should return error message from axios error when error is axios error but has no response object', () => {
    const message = 'error message in axios error';

    const axiosError: AxiosError = {
      config: {},
      isAxiosError: true,
      message,
      name: 'name',
      toJSON: () => {
        return {};
      },
    };

    const errorsArray = testModule.getErrorsArrayFromError(axiosError);

    jest.spyOn(testModule, 'isAxiosError').mockReturnValue(true);

    expect(errorsArray.length).toBe(1);
    expect(errorsArray[0]).toBe(message);
  });

  it('should return error message from error when error is not an axios error', () => {
    const message = 'error message in error';

    const error: Error = {
      message,
      name: 'name',
    };

    const errorsArray = testModule.getErrorsArrayFromError(error);

    expect(errorsArray.length).toBe(1);
    expect(errorsArray[0]).toBe(message);
  });
});
