import { AxiosResponse } from 'axios';
import authenticationApi from '../config/authenticationApi';

export const register = async (request: RegisterRequest) => {
  const response: AxiosResponse<AccessAndRefreshTokenResponse> =
    await authenticationApi.post('login', {
      ...request,
    });

  return response;
};

// requests
export type RegisterRequest = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};

// responses
export type AccessAndRefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
