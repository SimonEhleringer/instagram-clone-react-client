import { AuthenticationState } from '../authentication/store';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { Matcher, MatcherOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import RegisterForm from '.';

const mockStore = configureStore<AuthenticationState>([]);

let storeMock: MockStoreEnhanced<AuthenticationState, {}>;

const handleRegisterSuccessMock = jest.fn(() => {});

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

  const history = createMemoryHistory();

  const component = render(
    <Provider store={storeMock}>
      <Router history={history}>
        <RegisterForm handleRegisterSuccess={handleRegisterSuccessMock} />
      </Router>
    </Provider>
  );

  getByTestId = component.getByTestId;
});
