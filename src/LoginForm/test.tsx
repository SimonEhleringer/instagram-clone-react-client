import React from 'react';
import {
  fireEvent,
  render,
  cleanup,
  Matcher,
  MatcherOptions,
  RenderResult,
} from '@testing-library/react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { AuthenticationState } from '../authentication/store';
import LoginForm from './index';
import { Provider } from 'react-redux';
import { requestLogin } from '../authentication/apiRequests';

jest.mock('../authentication/apiRequests');
const requestLoginMock = requestLogin as jest.MockedFunction<
  typeof requestLogin
>;

const mockStore = configureStore<AuthenticationState>([]);

let store: MockStoreEnhanced<AuthenticationState, {}>;

let component: RenderResult<
  typeof import('c:/Users/simon/source/repos/instagram-clone-react-client/node_modules/@testing-library/dom/types/queries'),
  HTMLElement
>;

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

  store = mockStore(initialState);

  store.dispatch = jest.fn();

  // TODO: Maybe a mock handleLoginSuccess?
  component = render(
    <Provider store={store}>
      <LoginForm handleLoginSuccess={() => {}} />
    </Provider>
  );

  getByTestId = component.getByTestId;
});

// TODO: Snapshot test
// it('test', () => {
//   expect(component.).toMatchSnapshot();
// })

it('should call API and update store', () => {
  const formEl = getByTestId('authentication-form');

  requestLoginMock.mockResolvedValue();

  fireEvent.submit(formEl);
});
