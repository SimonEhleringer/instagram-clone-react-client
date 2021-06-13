import { AxiosResponse } from 'axios';
import authenticationApi from '../config/authenticationApi';
import { RefreshTokenRequestDto } from './sharedDtos';

export const requestRegister = async (request: RegisterRequest) => {
  const response: AxiosResponse<AccessAndRefreshTokenResponse> =
    await authenticationApi.post('register', {
      ...request,
    });

  return response;
};

export const requestLogin = async (request: LoginRequest) => {
  const response: AxiosResponse<AccessAndRefreshTokenResponse> =
    await authenticationApi.post('login', { ...request });

  return response;
};

// TODO: Add test
export const requestLogout = async (request: RefreshTokenRequestDto) => {
  return await authenticationApi.post('logout', request);
};

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
