import { authenticationReducer, AuthenticationState, setState } from "./slice";

describe("reducer", () => {
  it("should set state", () => {
    const initialState: AuthenticationState = {
      accessToken: "",
      refreshToken: "",
    };

    const newState: AuthenticationState = {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      loggedInUserId: "loggedInUserId",
    };

    const updatedState = authenticationReducer(
      initialState,
      setState(newState)
    );

    expect(updatedState).toEqual(newState);
  });
});
