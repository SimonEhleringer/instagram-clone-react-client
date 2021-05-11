import jwtDecode, { JwtPayload } from 'jwt-decode';

export const getUserIdFromAccessToken = (accessToken: string) => {
  const { sub } = jwtDecode<JwtPayload>(accessToken);

  if (!sub) {
    throw new AccessTokenParseError(accessToken);
  }

  return sub;
};

export class AccessTokenParseError extends Error {
  constructor(accessToken: string) {
    super(`Das Access-Token (${accessToken}) konnte nicht verarbeitet werden.`);
  }
}
