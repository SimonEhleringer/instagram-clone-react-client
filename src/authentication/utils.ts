import { getUserIdFromAccessToken } from './access-token';
import { AccessAndRefreshTokenResponseDto } from '../api/authentication';
import { AuthenticationState } from '../redux/authentication/slice';

export const convertAccessAndRefreshTokenResponseToAuthenticationState = (
  accessAndRefreshTokenResponse: AccessAndRefreshTokenResponseDto
) => {
  const { accessToken, refreshToken } = accessAndRefreshTokenResponse;

  const loggedInUserId = getUserIdFromAccessToken(accessToken);

  const result: AuthenticationState = {
    loggedInUserId,
    accessToken,
    refreshToken,
  };

  return result;
};
