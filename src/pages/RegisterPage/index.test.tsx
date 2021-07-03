import {
  AuthenticationState,
  initialState,
} from '../../redux/authentication/slice';
import { createMemoryHistory } from 'history';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import {
  AccessAndRefreshTokenResponse,
  RegisterRequest,
  requestRegister,
} from '../../api/authentication';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from '../../authentication/utils';
import { ErrorResponseDto } from '../../shared/error';
import RegisterPage from '.';
import { configureStore } from '../../config/store';
import { buildRegisterPath, registerPath } from '../../routes/path';

jest.mock('../../api/authentication.ts');
const requestRegisterMock = requestRegister as jest.MockedFunction<
  typeof requestRegister
>;

jest.mock('../../authentication/utils.ts');
const convertAccessAndRefreshTokenResponseToAuthenticationStateMock =
  convertAccessAndRefreshTokenResponseToAuthenticationState as jest.MockedFunction<
    typeof convertAccessAndRefreshTokenResponseToAuthenticationState
  >;

it('should call API and update state when API call was successful', async () => {
  const history = createMemoryHistory({
    initialEntries: [buildRegisterPath()],
  });
  const store = configureStore();

  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route path={registerPath} component={RegisterPage} />
      </Router>
    </Provider>
  );

  const authenticationFormEl = getByTestId('authentication-form');
  const emailInputEl = getByTestId('emailInput');
  const usernameInputEl = getByTestId('usernameInput');
  const fullNameInputEl = getByTestId('fullNameInput');
  const passwordEl = getByTestId('passwordInput');

  const apiResponseData: AccessAndRefreshTokenResponse = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  };

  const apiConfig: AxiosRequestConfig = {};

  const apiResponse: AxiosResponse<AccessAndRefreshTokenResponse> = {
    data: apiResponseData,
    config: apiConfig,
    headers: [],
    status: 200,
    statusText: '',
  };

  requestRegisterMock.mockResolvedValue(apiResponse);

  const authenticationState: AuthenticationState = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    loggedInUserId: 'loggedInUserId',
  };

  convertAccessAndRefreshTokenResponseToAuthenticationStateMock.mockReturnValue(
    authenticationState
  );

  const email = 'email';
  const username = 'username';
  const fullName = 'fullName';
  const password = 'password';

  fireEvent.change(emailInputEl, {
    target: {
      value: email,
    },
  });

  fireEvent.change(usernameInputEl, {
    target: {
      value: username,
    },
  });

  fireEvent.change(fullNameInputEl, {
    target: {
      value: fullName,
    },
  });

  fireEvent.change(passwordEl, {
    target: {
      value: password,
    },
  });

  const formData: RegisterRequest = {
    email,
    fullName,
    password,
    username,
  };

  fireEvent.submit(authenticationFormEl);

  await waitFor(() =>
    expect(requestRegisterMock).toHaveBeenLastCalledWith(formData)
  );
  expect(
    convertAccessAndRefreshTokenResponseToAuthenticationStateMock
  ).toHaveBeenCalledWith(apiResponseData);
  expect(store.getState().authenticationState).toEqual(authenticationState);
  expect(history.location.pathname).toBe('/');
});

it('should call API and display errors when API call failed', async () => {
  const history = createMemoryHistory({
    initialEntries: [buildRegisterPath()],
  });
  const store = configureStore();

  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route path={registerPath} component={RegisterPage} />
      </Router>
    </Provider>
  );

  const authenticationFormEl = getByTestId('authentication-form');
  const emailInputEl = getByTestId('emailInput');
  const usernameInputEl = getByTestId('usernameInput');
  const fullNameInputEl = getByTestId('fullNameInput');
  const passwordEl = getByTestId('passwordInput');

  const apiResponseData: ErrorResponseDto = {
    errors: ['error'],
  };

  const apiResponseConfig: AxiosRequestConfig = {};

  const apiResponse: AxiosResponse<ErrorResponseDto> = {
    data: apiResponseData,
    config: apiResponseConfig,
    headers: [],
    status: 400,
    statusText: '',
  };

  requestRegisterMock.mockRejectedValue(apiResponse);

  const email = 'email';
  const username = 'username';
  const fullName = 'fullName';
  const password = 'password';

  fireEvent.change(emailInputEl, {
    target: {
      value: email,
    },
  });

  fireEvent.change(usernameInputEl, {
    target: {
      value: username,
    },
  });

  fireEvent.change(fullNameInputEl, {
    target: {
      value: fullName,
    },
  });

  fireEvent.change(passwordEl, {
    target: {
      value: password,
    },
  });

  const formData: RegisterRequest = {
    email,
    fullName,
    password,
    username,
  };

  fireEvent.submit(authenticationFormEl);

  await waitFor(() =>
    expect(requestRegisterMock).toHaveBeenCalledWith(formData)
  );
  expect(
    convertAccessAndRefreshTokenResponseToAuthenticationStateMock
  ).not.toHaveBeenCalled();
  expect(store.getState().authenticationState).toEqual(initialState);
  expect(history.location.pathname).toBe(registerPath);

  const errorsEl = getByTestId('errors');
  expect(errorsEl.childElementCount).toBe(1);
});
