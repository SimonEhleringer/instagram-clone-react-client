import authenticationApi from '../../config/authenticationApi';

import {
  AccessAndRefreshTokenResponse,
  LoginRequest,
  RegisterRequest,
  requestLogin,
  requestRegister,
} from '../apiRequests';

jest.mock('../../config/authenticationApi');
const mockedAuthenticationApi = authenticationApi as jest.Mocked<
  typeof authenticationApi
>;

describe('requestLogin', () => {
  it('should return response', async () => {
    const accessAndRefreshTokenResponse: AccessAndRefreshTokenResponse = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    const expected = {
      data: accessAndRefreshTokenResponse,
    };

    mockedAuthenticationApi.post.mockResolvedValueOnce(expected);

    const request: LoginRequest = {
      usernameOrEmail: 'usernameOrEmail',
      password: 'password',
    };

    const actual = await requestLogin(request);

    expect(mockedAuthenticationApi.post).toHaveBeenCalledWith('login', request);
    expect(actual).toBe(expected);
  });

  it('should throw', async () => {
    const errorMessage = 'Mocked Error';

    mockedAuthenticationApi.post.mockRejectedValueOnce(new Error(errorMessage));

    const request: LoginRequest = {
      usernameOrEmail: 'usernameOrEmail',
      password: 'password',
    };

    await expect(requestLogin(request)).rejects.toThrow(errorMessage);
    expect(mockedAuthenticationApi.post).toHaveBeenCalledWith('login', request);
  });
});

describe('requestRegister', () => {
  it('should return response', async () => {
    const accessAndRefreshTokenResponse: AccessAndRefreshTokenResponse = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    const expected = {
      data: accessAndRefreshTokenResponse,
    };

    mockedAuthenticationApi.post.mockResolvedValueOnce(expected);

    const request: RegisterRequest = {
      email: 'email',
      fullName: 'fullName',
      password: 'password',
      username: 'username',
    };

    const actual = await requestRegister(request);

    expect(mockedAuthenticationApi.post).toHaveBeenCalledWith(
      'register',
      request
    );
    expect(actual).toBe(expected);
  });

  it('should throw', async () => {
    const errorMessage = 'Mocked Error';

    mockedAuthenticationApi.post.mockRejectedValueOnce(new Error(errorMessage));

    const request: RegisterRequest = {
      email: 'email',
      fullName: 'fullName',
      password: 'password',
      username: 'username',
    };

    await expect(requestRegister(request)).rejects.toThrow(errorMessage);
    expect(mockedAuthenticationApi.post).toHaveBeenCalledWith(
      'register',
      request
    );
  });
});
