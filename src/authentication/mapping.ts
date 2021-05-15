import { createSchema } from 'morphism';
import { LoginRequest, RegisterRequest } from './apiRequests';
import { LoginDto, RegisterDto, SuccessfulAuthenticationDto } from './business';
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

export const loginDtoToLoginRequestSchema = createSchema<
  LoginRequest,
  LoginDto
>({
  usernameOrEmail: (src) => src.usernameOrEmail,
  password: (src) => src.password,
});

export const successfulAuthenticationDtoToAuthenticationStateSchema =
  createSchema<AuthenticationState, SuccessfulAuthenticationDto>({
    loggedInUserId: (src) => src.loggedInUserId,
    accessToken: (src) => src.accessToken,
    refreshToken: (src) => src.refreshToken,
  });
