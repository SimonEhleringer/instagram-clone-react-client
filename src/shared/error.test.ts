import faker from 'faker';
import { buildAxiosError, buildErrorResponseDto } from '../test-utils';
import { getErrorsArrayFromError } from './error';

describe('getErrorsArrayFromError', () => {
  it('should return errors from error response DTO in axios error when error is axios error of error response DTO', () => {
    const errorResponseDto = buildErrorResponseDto({}, 3);
    const axiosError = buildAxiosError(errorResponseDto);

    const errorsArray = getErrorsArrayFromError(axiosError);

    expect(errorsArray).toBe(errorResponseDto.errors);
  });

  it('should return error message from axios error when error is axios error but not of errors response', () => {
    const message = faker.lorem.sentence(10);
    const axiosError = buildAxiosError({}, { message });

    const errorsArray = getErrorsArrayFromError(axiosError);

    expect(errorsArray.length).toBe(1);
    expect(errorsArray[0]).toBe(message);
  });

  it('should return error message from axios error when error is axios error but has no response object', () => {
    const message = faker.lorem.sentence(10);
    const axiosError = buildAxiosError({}, { response: undefined, message });

    const errorsArray = getErrorsArrayFromError(axiosError);

    expect(errorsArray.length).toBe(1);
    expect(errorsArray[0]).toBe(message);
  });

  it('should return error message from error when error is not an axios error', () => {
    const message = faker.lorem.sentence(10);
    const error = new Error(message);

    const errorsArray = getErrorsArrayFromError(error);

    expect(errorsArray.length).toBe(1);
    expect(errorsArray[0]).toBe(message);
  });
});
