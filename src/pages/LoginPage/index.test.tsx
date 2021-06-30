import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import {
  AuthenticationState,
  initialState,
} from '../../redux/authentication/slice';
import { Provider } from 'react-redux';
import {
  AccessAndRefreshTokenResponse,
  LoginRequest,
  requestLogin,
} from '../../api/authentication';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from '../../authentication/utils';
import { Route, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { ErrorResponseDto } from '../../shared/error';
import LoginPage from './index';
import { configureStore } from '../../config/store';
import { buildLoginPath, loginPath } from '../../routes';

jest.mock('../../api/authentication.ts');
const requestLoginMock = requestLogin as jest.MockedFunction<
  typeof requestLogin
>;

jest.mock('../../authentication/utils.ts');
const convertAccessAndRefreshTokenResponseToAuthenticationStateMock =
  convertAccessAndRefreshTokenResponseToAuthenticationState as jest.MockedFunction<
    typeof convertAccessAndRefreshTokenResponseToAuthenticationState
  >;

it('should call API and update store when API returns no error', async () => {
  const store = configureStore();
  const history = createMemoryHistory({ initialEntries: [buildLoginPath()] });

  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route path={loginPath} component={LoginPage} />
      </Router>
    </Provider>
  );

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
  expect(store.getState().authenticationState).toEqual(authenticationState);
  expect(history.location.pathname).toBe('/');
});

it('should call API and set errors when API returns an error', async () => {
  const store = configureStore();
  const history = createMemoryHistory({ initialEntries: [buildLoginPath()] });

  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route path={loginPath} component={LoginPage} />
      </Router>
    </Provider>
  );

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
  expect(store.getState().authenticationState).toEqual(initialState);
  expect(history.location.pathname).toBe(loginPath);

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
  const data: ErrorResponseDto = {
    errors: ['error'],
  };

  const config: AxiosRequestConfig = {};

  const response: AxiosResponse<ErrorResponseDto> = {
    data,
    status: 400,
    statusText: '',
    config,
    headers: [],
  };

  return response;
};
