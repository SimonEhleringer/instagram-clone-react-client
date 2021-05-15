import { createSchema } from 'morphism';
import { RegisterRequest } from './apiRequests';
import { RegisterDto, SuccessfulRegisterDto } from './business';
import { AuthenticationState } from './store';

export const registerDtoToRegisterRequestSchema = createSchema<
  RegisterRequest,
  RegisterDto
>({
  email: (src) => src.email,
  fullName: (src) => src.fullName,
  username: (src) => src.username,
  password: (src) => src.password,
});

export const successfulRegisterDtoToAuthenticationStateSchema = createSchema<
  AuthenticationState,
  SuccessfulRegisterDto
>({
  loggedInUserId: (src) => src.loggedInUserId,
  accessToken: (src) => src.accessToken,
  refreshToken: (src) => src.refreshToken,
});
