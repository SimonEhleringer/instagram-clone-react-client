import { AuthenticationState, setState } from '../../authentication/store';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import {
  fireEvent,
  Matcher,
  MatcherOptions,
  render,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import {
  AccessAndRefreshTokenResponse,
  RegisterRequest,
  requestRegister,
} from '../../authentication/apiRequests';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from '../../authentication/utils';
import { ErrorResponse } from '../../error';
import RegisterPage from '.';

jest.mock('../../authentication/apiRequests.ts');
const requestRegisterMock = requestRegister as jest.MockedFunction<
  typeof requestRegister
>;

jest.mock('../../authentication/utils.ts');
const convertAccessAndRefreshTokenResponseToAuthenticationStateMock =
  convertAccessAndRefreshTokenResponseToAuthenticationState as jest.MockedFunction<
    typeof convertAccessAndRefreshTokenResponseToAuthenticationState
  >;

const mockStore = configureStore<AuthenticationState>([]);

let storeMock: MockStoreEnhanced<AuthenticationState, {}>;

const history = createMemoryHistory();

let getByTestId: (
  text: Matcher,
  options?: MatcherOptions | undefined,
  waitForElementOptions?: unknown
) => HTMLElement;

beforeEach(() => {
  const initialState: AuthenticationState = {
    loggedInUserId: undefined,
    accessToken: '',
    refreshToken: '',
  };

  storeMock = mockStore(initialState);

  storeMock.dispatch = jest.fn();

  history.push('/register');
  const component = render(
    <Provider store={storeMock}>
      <Router history={history}>
        <Route path='/register' component={RegisterPage} />
      </Router>
    </Provider>
  );

  getByTestId = component.getByTestId;
});

it('should call API and update state when API call was successful', async () => {
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
  expect(storeMock.dispatch).toHaveBeenCalledWith(
    setState(authenticationState)
  );
  expect(history.location.pathname).toBe('/');
});

it('should call API and display errors when API call failed', async () => {
  const authenticationFormEl = getByTestId('authentication-form');
  const emailInputEl = getByTestId('emailInput');
  const usernameInputEl = getByTestId('usernameInput');
  const fullNameInputEl = getByTestId('fullNameInput');
  const passwordEl = getByTestId('passwordInput');

  const apiResponseData: ErrorResponse = {
    errors: ['error'],
  };

  const apiResponseConfig: AxiosRequestConfig = {};

  const apiResponse: AxiosResponse<ErrorResponse> = {
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
  expect(storeMock.dispatch).not.toHaveBeenCalled();
  expect(history.location.pathname).toBe('/register');

  const errorsEl = getByTestId('errors');
  expect(errorsEl.childElementCount).toBe(1);
});
