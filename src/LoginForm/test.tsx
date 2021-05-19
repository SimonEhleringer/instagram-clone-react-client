import React from "react";
import {
  fireEvent,
  render,
  cleanup,
  Matcher,
  MatcherOptions,
  RenderResult,
} from "@testing-library/react";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { AuthenticationState } from "../authentication/store";
import LoginForm from "./index";
import { Provider } from "react-redux";
import {
  AccessAndRefreshTokenResponse,
  LoginRequest,
  requestLogin,
} from "../authentication/apiRequests";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from "../authentication/utils";

jest.mock("../authentication/apiRequests");
const requestLoginMock = requestLogin as jest.MockedFunction<
  typeof requestLogin
>;

jest.mock("../authentication/utils");
const convertAccessAndRefreshTokenResponseToAuthenticationStateMock =
  convertAccessAndRefreshTokenResponseToAuthenticationState as jest.MockedFunction<
    typeof convertAccessAndRefreshTokenResponseToAuthenticationState
  >;

const mockStore = configureStore<AuthenticationState>([]);

let store: MockStoreEnhanced<AuthenticationState, {}>;

let component: RenderResult<
  typeof import("@testing-library/dom/types/queries"),
  HTMLElement
>;

let getByTestId: (
  text: Matcher,
  options?: MatcherOptions | undefined,
  waitForElementOptions?: unknown
) => HTMLElement;

let handleLoginSuccessMock = jest.fn(() => {});

beforeEach(() => {
  const initialState: AuthenticationState = {
    loggedInUserId: undefined,
    accessToken: "",
    refreshToken: "",
  };

  store = mockStore(initialState);

  store.dispatch = jest.fn();

  // TODO: Maybe a mock handleLoginSuccess?
  component = render(
    <Provider store={store}>
      <LoginForm handleLoginSuccess={handleLoginSuccessMock} />
    </Provider>
  );

  getByTestId = component.getByTestId;
});

// TODO: Snapshot test
// it('test', () => {
//   expect(component.).toMatchSnapshot();
// })

it("should call API and update store", () => {
  const formEl = getByTestId("authentication-form");
  const usernameOrEmailInputEl = getByTestId("usernameOrEmail-input");
  const passwordInputEl = getByTestId("password-input");

  const apiResponse = getMockedAxiosResponse();

  requestLoginMock.mockResolvedValue(apiResponse);

  convertAccessAndRefreshTokenResponseToAuthenticationStateMock.mockReturnValue(
    apiResponse.data
  );

  const usernameOrEmail = "usernameOrEmail";
  const password = "password";

  fireEvent.input(usernameOrEmailInputEl, {
    target: {
      value: usernameOrEmail,
    },
  });

  fireEvent.input(passwordInputEl, {
    target: {
      value: password,
    },
  });

  const formData: LoginRequest = {
    usernameOrEmail,
    password,
  };

  fireEvent.submit(formEl);

  expect(requestLoginMock).toHaveBeenCalledWith(formData);
});

const getMockedAxiosResponse = () => {
  const data: AccessAndRefreshTokenResponse = {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  };

  const config: AxiosRequestConfig = {};

  const response: AxiosResponse<AccessAndRefreshTokenResponse> = {
    data,
    status: 200,
    statusText: "",
    config,
    headers: [],
  };

  return response;
};
