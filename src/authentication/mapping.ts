import { createSchema } from 'morphism';
import { getUserIdFromAccessToken } from '../accessToken';
import { AccessAndRefreshTokenResponse, RegisterRequest } from './apiRequests';
import { AuthenticationState, RegisterPayload } from './store';

export const registerPayloadToRegisterRequestSchema = createSchema<
  RegisterRequest,
  RegisterPayload
>({
  email: (src) => src.email,
  fullName: (src) => src.fullName,
  username: (src) => src.username,
  password: (src) => src.password,
});

export const accessAndRefreshTokenResponseToAuthenticationStateSchema =
  createSchema<AuthenticationState, AccessAndRefreshTokenResponse>({
    accessToken: (src) => src.accessToken,
    refreshToken: (src) => src.refreshToken,
    loggedInUserId: (src) => getUserIdFromAccessToken(src.accessToken),
  });
