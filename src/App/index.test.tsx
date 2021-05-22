import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { render } from '@testing-library/react';
import App from '.';
import { AuthenticationState } from '../authentication/store';
import { ReduxState } from '../config/store';
import { Provider } from 'react-redux';

const mockStore = configureStore<ReduxState>([]);

type MockState = {
  authenticationState: AuthenticationState;
};

let storeMock: MockStoreEnhanced<MockState, {}>;

it('should show index page when user is logged in', () => {
  const initialState = getInitialState();
  initialState.authenticationState.loggedInUserId = 'loggedInUserId';

  renderComponent(initialState);

  expect(window.location.pathname).toBe('/');
});

it('should show login page when user is not logged in', () => {
  const initialState = getInitialState();

  renderComponent(initialState);

  expect(window.location.pathname).toBe('/login');
});

const renderComponent = (initialState: MockState) => {
  storeMock = mockStore(initialState);
  return render(
    <Provider store={storeMock}>
      <App />
    </Provider>
  );
};

const getInitialState = () => {
  const initialState: MockState = {
    authenticationState: {
      accessToken: '',
      refreshToken: '',
      loggedInUserId: undefined,
    },
  };
  return initialState;
};
