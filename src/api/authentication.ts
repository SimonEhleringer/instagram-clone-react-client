import { AxiosResponse } from 'axios';
import authenticationApi from '../config/authentication-api';

export const register = async (request: RegisterRequestDto) => {
  const response: AxiosResponse<AccessAndRefreshTokenResponseDto> =
    await authenticationApi.post(buildRegisterUrl(), {
      ...request,
    });

  return response;
};

export const buildRegisterUrl = () => '/register';

export const login = async (request: LoginRequestDto) => {
  const response: AxiosResponse<AccessAndRefreshTokenResponseDto> =
    await authenticationApi.post(buildLoginUrl(), request);

  return response;
};

export const buildLoginUrl = () => '/login';

export const logout = async (request: RefreshTokenRequestDto) => {
  return await authenticationApi.post(buildLogoutUrl(), request);
};

export const buildLogoutUrl = () => 'logout';

export const refresh = (request: RefreshTokenRequestDto) => {
  return authenticationApi.post<AccessAndRefreshTokenResponseDto>(
    buildRefreshUrl(),
    request
  );
};

export const buildRefreshUrl = () => '/refreshAccessToken';

export type RegisterRequestDto = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};

export interface RefreshTokenRequestDto {
  refreshToken: string;
}

export type LoginRequestDto = {
  usernameOrEmail: string;
  password: string;
};

export type AccessAndRefreshTokenResponseDto = {
  accessToken: string;
  refreshToken: string;
};
