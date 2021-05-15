import { AxiosResponse } from 'axios';
import { morphism } from 'morphism';
import { getUserIdFromAccessToken } from '../accessToken';
import { AccessAndRefreshTokenResponse, requestRegister } from './apiRequests';
import { registerDtoToRegisterRequestSchema } from './mapping';

export const register = async (registerDto: RegisterDto) => {
  const request = morphism(registerDtoToRegisterRequestSchema, registerDto);

  const response: AxiosResponse<AccessAndRefreshTokenResponse> =
    await requestRegister(request);

  const { accessToken, refreshToken } = response.data;

  const loggedInUserId = getUserIdFromAccessToken(accessToken);

  const result: SuccessfulRegisterDto = {
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

export interface SuccessfulRegisterDto {
  loggedInUserId: string;
  accessToken: string;
  refreshToken: string;
}
