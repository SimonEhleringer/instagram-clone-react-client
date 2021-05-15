import { AxiosResponse } from 'axios';
import { morphism } from 'morphism';
import { getUserIdFromAccessToken } from '../accessToken';
import {
  AccessAndRefreshTokenResponse,
  requestLogin,
  requestRegister,
} from './apiRequests';
import {
  loginDtoToLoginRequestSchema,
  registerDtoToRegisterRequestSchema,
} from './mapping';

export const register = async (registerDto: RegisterDto) => {
  const request = morphism(registerDtoToRegisterRequestSchema, registerDto);

  const response: AxiosResponse<AccessAndRefreshTokenResponse> =
    await requestRegister(request);

  return convertAccessAndRefreshTokenResponseToSuccessfulAuthenticationDto(
    response.data
  );
};

export const login = async (loginDto: LoginDto) => {
  const request = morphism(loginDtoToLoginRequestSchema, loginDto);

  const response = await requestLogin(request);

  return convertAccessAndRefreshTokenResponseToSuccessfulAuthenticationDto(
    response.data
  );
};

const convertAccessAndRefreshTokenResponseToSuccessfulAuthenticationDto = (
  accessAndRefreshTokenResponse: AccessAndRefreshTokenResponse
) => {
  const { accessToken, refreshToken } = accessAndRefreshTokenResponse;

  const loggedInUserId = getUserIdFromAccessToken(accessToken);

  const result: SuccessfulAuthenticationDto = {
    loggedInUserId,
    accessToken,
    refreshToken,
  };

  return result;
};

// dtos
export interface RegisterDto {
  email: string;
  fullName: string;
  username: string;
  password: string;
}

export interface LoginDto {
  usernameOrEmail: string;
  password: string;
}

export interface SuccessfulAuthenticationDto {
  loggedInUserId: string;
  accessToken: string;
  refreshToken: string;
}
