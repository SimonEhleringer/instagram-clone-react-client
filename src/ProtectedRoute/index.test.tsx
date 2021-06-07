import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory, State } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import ProtectedRoute from '.';

type MockAuthenticationState = {
  loggedInUserId?: string;
};

type MockReduxState = {
  authenticationState: MockAuthenticationState;
};

const mockStore = configureMockStore<MockReduxState>();

let storeMock: MockStoreEnhanced<MockReduxState>;

let history: MemoryHistory<State>;

it('should redirect to login route when user is not logged in', () => {
  const initialState = getInitialState();

  render(
    <Setup initialState={initialState}>
      <ProtectedRoute path='/' component={componentToRender} />
    </Setup>
  );

  expect(history.location.pathname).toBe('/login');
});

it('should show component when user is logged in and component prop is given', () => {
  const initialState = getInitialState();
  initialState.authenticationState.loggedInUserId = 'loggedInUserId';

  const { getByTestId } = render(
    <Setup initialState={initialState}>
      <ProtectedRoute path='/' component={componentToRender} />
    </Setup>
  );

  const renderedEl = getByTestId('componentToRender');

  expect(history.location.pathname).toBe('/');
  expect(renderedEl).toBeInTheDocument();
});

it('should show children when user is logged in and children are given', () => {
  const initialState = getInitialState();
  initialState.authenticationState.loggedInUserId = 'loggedInUserId';

  const { getByTestId } = render(
    <Setup initialState={initialState}>
      <ProtectedRoute path='/'>{componentToRender}</ProtectedRoute>
    </Setup>
  );

  const renderedEl = getByTestId('componentToRender');

  expect(history.location.pathname).toBe('/');
  expect(renderedEl).toBeInTheDocument();
});

interface SetupProps {
  initialState: MockReduxState;
}

const Setup: React.FC<SetupProps> = ({ initialState, children }) => {
  storeMock = mockStore(initialState);

  history = createMemoryHistory();

  return (
    <Provider store={storeMock}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

const componentToRender = () => <div data-testid='componentToRender'></div>;

const getInitialState = () => {
  const initialState: MockReduxState = {
    authenticationState: { loggedInUserId: undefined },
  };

  return initialState;
};
