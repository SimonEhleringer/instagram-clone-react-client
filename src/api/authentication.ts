import { AxiosResponse } from 'axios';
import authenticationApi from '../config/authenticationApi';
import { RefreshTokenRequestDto } from './sharedDtos';

export const requestRegister = async (request: RegisterRequest) => {
  const response: AxiosResponse<AccessAndRefreshTokenResponse> =
    await authenticationApi.post(buildRegisterUrl(), {
      ...request,
    });

  return response;
};

export const buildRegisterUrl = () => '/register';

export const requestLogin = async (request: LoginRequest) => {
  const response: AxiosResponse<AccessAndRefreshTokenResponse> =
    await authenticationApi.post(buildLoginUrl(), request);

  return response;
};

export const buildLoginUrl = () => '/login';

// TODO: Add test
export const logout = async (request: RefreshTokenRequestDto) => {
  return await authenticationApi.post(buildLogoutUrl(), request);
};

export const buildLogoutUrl = () => 'logout';

export const refresh = (request: RefreshTokenRequestDto) => {
  return authenticationApi.post<AccessAndRefreshTokenResponse>(
    buildRefreshUrl(),
    request
  );
};

export const buildRefreshUrl = () => '/refreshAccessToken';

// requests
export type RegisterRequest = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};

export type LoginRequest = {
  usernameOrEmail: string;
  password: string;
};

// responses
export type AccessAndRefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
