import { AxiosResponse } from 'axios';
import authenticationApi from '../config/authenticationApi';

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
