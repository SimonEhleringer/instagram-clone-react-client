import {
  buildJwtTokenWithoutSubject,
  buildJwtTokenWithUserIdAsSubject,
} from '../test-utils';
import { AccessTokenParseError, getUserIdFromAccessToken } from './accessToken';

describe('getUserIdFromAccessToken', () => {
  it('should parse JWT and return users ID', () => {
    const { jwtToken: accessToken, userId: expectedUserId } =
      buildJwtTokenWithUserIdAsSubject();

    const userId = getUserIdFromAccessToken(accessToken);

    expect(userId).toBe(expectedUserId);
  });

  it('should throw when access token does not contain a user ID', () => {
    const accessToken = buildJwtTokenWithoutSubject();

    expect(() => getUserIdFromAccessToken(accessToken)).toThrow(
      AccessTokenParseError
    );
  });
});
