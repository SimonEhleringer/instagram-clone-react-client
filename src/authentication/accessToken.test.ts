import { AccessTokenParseError, getUserIdFromAccessToken } from "./accessToken";

describe("getUserIdFromAccessToken", () => {
  it("should parse JWT and return users ID", () => {
    // sub: dde9efb4-327e-4906-be48-036e7daecd80
    // secret: ABC
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZGU5ZWZiNC0zMjdlLTQ5MDYtYmU0OC0wMzZlN2RhZWNkODAifQ.v9sVHDE2nrdrjmCrpLG1ZGiNX1Zax5fAPGpsJbwCkyI";

    const expectedUserId = "dde9efb4-327e-4906-be48-036e7daecd80";

    const userId = getUserIdFromAccessToken(accessToken);

    expect(userId).toBe(expectedUserId);
  });

  it("should throw when access token does not contain a user ID", () => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.CYY-KIKrF1-WEW_v6KU2z5I7aZrKjfv10ygYGqQCRyc";

    expect(() => getUserIdFromAccessToken(accessToken)).toThrow(
      AccessTokenParseError
    );
  });
});
