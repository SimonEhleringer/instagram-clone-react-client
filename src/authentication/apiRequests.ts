import { AxiosResponse } from 'axios';
import authenticationApi from '../config/authenticationApi';

export const requestRegister = async (request: RegisterRequest) => {
  console.log(request);

  const response: AxiosResponse<AccessAndRefreshTokenResponse> =
    await authenticationApi.post('register', {
      ...request,
    });

  console.log(response);

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
