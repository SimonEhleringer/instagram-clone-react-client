import jwtDecode, { JwtPayload } from 'jwt-decode';
import { AccessTokenParseError, getUserIdFromAccessToken } from './accessToken';

jest.mock('jwt-decode');
const jwtDecodeMock = jwtDecode as jest.MockedFunction<typeof jwtDecode>;

describe('getUserIdFromAccessToken', () => {
  it('should parse JWT and return users ID', () => {
    const accessToken = 'accessToken';

    const expected = 'userId';

    const jwtPayload: JwtPayload = {
      sub: expected,
    };

    jwtDecodeMock.mockReturnValue(jwtPayload);

    const actual = getUserIdFromAccessToken(accessToken);

    expect(actual).toBe(expected);
    expect(jwtDecodeMock).toBeCalledWith(accessToken);
  });

  it('should throw when no ID is returned', () => {
    const accessToken = 'accessToken';

    const jwtPayload: JwtPayload = {};

    jwtDecodeMock.mockReturnValue(jwtPayload);

    expect(() => getUserIdFromAccessToken(accessToken)).toThrow(
      AccessTokenParseError
    );
    expect(jwtDecodeMock).toBeCalledWith(accessToken);
  });
});
