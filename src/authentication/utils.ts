import { getUserIdFromAccessToken } from "../authentication/accessToken";
import { AccessAndRefreshTokenResponse } from "../api/authentication";
import { AuthenticationState } from "../redux/authentication/slice";

export const convertAccessAndRefreshTokenResponseToAuthenticationState = (
  accessAndRefreshTokenResponse: AccessAndRefreshTokenResponse
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
