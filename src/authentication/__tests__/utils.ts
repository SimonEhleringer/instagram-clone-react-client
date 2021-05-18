import { AccessAndRefreshTokenResponse } from '../apiRequests';
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from '../utils';
import { getUserIdFromAccessToken } from '../../accessToken';

jest.mock('../../accessToken');
const mockedGetUserIdFromAccessToken =
  getUserIdFromAccessToken as jest.MockedFunction<
    typeof getUserIdFromAccessToken
  >;

describe('convertAccessAndRefreshTokenResponseToAuthenticationState', () => {
  it('should convert successfully', () => {
    const accessToken = 'accessToken';
    const refreshToken = 'refreshToken';
    const loggedInUserId = 'userId';

    const accessAndRefreshTokenResponse: AccessAndRefreshTokenResponse = {
      accessToken,
      refreshToken,
    };

    mockedGetUserIdFromAccessToken.mockReturnValue(loggedInUserId);

    const actual = convertAccessAndRefreshTokenResponseToAuthenticationState(
      accessAndRefreshTokenResponse
    );

    expect(actual).toStrictEqual({ accessToken, refreshToken, loggedInUserId });
    expect(mockedGetUserIdFromAccessToken).toBeCalledWith(accessToken);
  });
});
