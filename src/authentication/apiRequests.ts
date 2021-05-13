import { AxiosResponse } from 'axios';
import authenticationApi from '../config/authenticationApi';

export const register = async (request: RegisterRequest) => {
  console.log(request);

  const response: AxiosResponse<AccessAndRefreshTokenResponse> =
    await authenticationApi.post('register', {
      ...request,
    });

  return response;
};

export const requestRegister = async (
  registerRequest: RegisterRequest_Test
) => {
  const response: AxiosResponse<AuthenticationResponse> =
    await authenticationApi.post('/Authentication/Register', {
      ...registerRequest,
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

export interface RegisterRequest_Test {
  username: string;
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  jwtToken: string;
  refreshToken: string;
}

// responses
export type AccessAndRefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
