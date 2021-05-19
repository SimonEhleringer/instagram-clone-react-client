import React from 'react';
import {
  fireEvent,
  render,
  cleanup,
  Matcher,
  MatcherOptions,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { AuthenticationState, setState } from '../authentication/store';
import LoginForm from './index';
import { Provider } from 'react-redux';
import {
  AccessAndRefreshTokenResponse,
  LoginRequest,
  requestLogin,
} from '../authentication/apiRequests';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from '../authentication/utils';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { ErrorResponse } from '../sagaError';

jest.mock('../authentication/apiRequests');
const requestLoginMock = requestLogin as jest.MockedFunction<
  typeof requestLogin
>;

jest.mock('../authentication/utils');
const convertAccessAndRefreshTokenResponseToAuthenticationStateMock =
  convertAccessAndRefreshTokenResponseToAuthenticationState as jest.MockedFunction<
    typeof convertAccessAndRefreshTokenResponseToAuthenticationState
  >;

const mockStore = configureStore<AuthenticationState>([]);

let store: MockStoreEnhanced<AuthenticationState, {}>;

let component: RenderResult<
  typeof import('@testing-library/dom/types/queries'),
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
    accessToken: '',
    refreshToken: '',
  };

  store = mockStore(initialState);

  store.dispatch = jest.fn();

  const history = createMemoryHistory();

  component = render(
    <Provider store={store}>
      <Router history={history}>
        <LoginForm handleLoginSuccess={handleLoginSuccessMock} />
      </Router>
    </Provider>
  );

  getByTestId = component.getByTestId;
});

it('should call API and update store when API returns no error', async () => {
  const formEl = getByTestId('authentication-form');
  const usernameOrEmailInputEl = getByTestId('usernameOrEmailInput');
  const passwordInputEl = getByTestId('passwordInput');

  const apiResponse = getMockedSuccessfulAxiosResponse();

  requestLoginMock.mockResolvedValue(apiResponse);

  const authenticationState: AuthenticationState = {
    loggedInUserId: 'loggedInUserId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  };

  convertAccessAndRefreshTokenResponseToAuthenticationStateMock.mockReturnValue(
    authenticationState
  );

  const usernameOrEmail = 'usernameOrEmail';
  const password = 'password';

  fireEvent.change(usernameOrEmailInputEl, {
    target: {
      value: usernameOrEmail,
    },
  });

  fireEvent.change(passwordInputEl, {
    target: {
      value: password,
    },
  });

  const formData: LoginRequest = {
    usernameOrEmail,
    password,
  };

  fireEvent.submit(formEl);

  await waitFor(() => expect(requestLoginMock).toHaveBeenCalledWith(formData));
  expect(
    convertAccessAndRefreshTokenResponseToAuthenticationStateMock
  ).toHaveBeenCalledWith(apiResponse.data);
  expect(store.dispatch).toHaveBeenCalledWith(setState(authenticationState));
  expect(handleLoginSuccessMock).toHaveBeenCalled();
});

it('should call API and set errors when API returns an error', async () => {
  const formEl = getByTestId('authentication-form');
  const usernameOrEmailInputEl = getByTestId('usernameOrEmailInput');
  const passwordInputEl = getByTestId('passwordInput');

  const apiResponse = getMockedFailedAxiosResponse();

  requestLoginMock.mockRejectedValue(apiResponse);

  const usernameOrEmail = 'usernameOrEmail';
  const password = 'password';

  fireEvent.change(usernameOrEmailInputEl, {
    target: {
      value: usernameOrEmail,
    },
  });

  fireEvent.change(passwordInputEl, {
    target: {
      value: password,
    },
  });

  const formData: LoginRequest = {
    usernameOrEmail,
    password,
  };

  fireEvent.submit(formEl);

  await waitFor(() => expect(requestLoginMock).toHaveBeenCalledWith(formData));
  expect(
    convertAccessAndRefreshTokenResponseToAuthenticationStateMock
  ).not.toHaveBeenCalled();
  expect(store.dispatch).not.toHaveBeenCalled();
  expect(handleLoginSuccessMock).not.toHaveBeenCalled();

  const errorsEl = getByTestId('errors');
  expect(errorsEl.childElementCount).toBe(1);
});

const getMockedSuccessfulAxiosResponse = () => {
  const data: AccessAndRefreshTokenResponse = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  };

  const config: AxiosRequestConfig = {};

  const response: AxiosResponse<AccessAndRefreshTokenResponse> = {
    data,
    status: 200,
    statusText: '',
    config,
    headers: [],
  };

  return response;
};

const getMockedFailedAxiosResponse = () => {
  const data: ErrorResponse = {
    errors: ['error'],
  };

  const config: AxiosRequestConfig = {};

  const response: AxiosResponse<ErrorResponse> = {
    data,
    status: 400,
    statusText: '',
    config,
    headers: [],
  };

  return response;
};
