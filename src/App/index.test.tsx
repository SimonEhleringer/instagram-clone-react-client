import { fireEvent, screen } from '@testing-library/react';
import { Routes } from '.';
import { configureStore, StoreType } from '../config/store';
import { initialState } from '../redux/authentication/slice';
import {
  buildIndexPath,
  buildMyProfilePath,
  buildNewPostPath,
  buildNewPostPathname,
  buildSuggestionsPath,
  buildUserProfilePath,
} from '../routes/path';
import {
  buildAuthenticationState,
  buildMockedImage,
  MockedIndexPage,
  MockedLoginPage,
  MockedMyProfilePage,
  MockedNewPostPage,
  MockedRegisterPage,
  MockedSuggestionsPage,
  MockedUserProfilePage,
  renderWithProviders,
} from '../test-utils';
import faker from 'faker';
import userEvent from '@testing-library/user-event';

jest.mock('../routes/renderers.tsx', () => {
  const actual = jest.requireActual('../routes/renderers.tsx');

  return {
    renderIndexRoute: () => actual.renderIndexRoute(MockedIndexPage),
    renderRegisterRoute: () => actual.renderRegisterRoute(MockedRegisterPage),
    renderLoginRoute: () => actual.renderLoginRoute(MockedLoginPage),
    renderSuggestionsRoute: () =>
      actual.renderSuggestionsRoute(MockedSuggestionsPage),
    renderNewPostRoute: () => actual.renderNewPostRoute(MockedNewPostPage),
    renderMyProfileRoute: () =>
      actual.renderMyProfileRoute(MockedMyProfilePage),
    renderUserProfileRoute: () =>
      actual.renderUserProfileRoute(MockedUserProfilePage),
  };
});

let store: StoreType;

beforeEach(() => {
  store = configureStore();
  store.getState().authenticationState = buildAuthenticationState();
});

it.each([
  [buildIndexPath()],
  [buildSuggestionsPath()],
  [buildNewPostPathname()],
  [buildMyProfilePath()],
  [buildUserProfilePath(faker.datatype.uuid())],
])(
  'should render login route when user is not logged in and route is "%s"',
  (route) => {
    store.getState().authenticationState = { ...initialState };

    renderWithProviders(<Routes />, {
      route,
      store,
    });

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  }
);

it.each([
  [buildIndexPath(), 'index-page'],
  [buildSuggestionsPath(), 'suggestions-page'],
  [
    buildNewPostPath({ selectedImageDataUri: buildMockedImage().imageDataUri }),
    'new-post-page',
  ],
  [buildMyProfilePath(), 'my-profile-page'],
  [buildUserProfilePath(faker.datatype.uuid()), 'user-profile-page'],
])(
  'should render "%s" route when user is logged in',
  (route, mockedPageTestId) => {
    renderWithProviders(<Routes />, {
      route,
      store,
    });

    expect(screen.getByTestId(mockedPageTestId)).toBeInTheDocument();
  }
);

it('should navigate throw all routes when routes in header are pressed successively', async () => {
  renderWithProviders(<Routes />, {
    store,
  });

  const { image } = buildMockedImage();

  fireEvent.change(screen.getByTestId('hiddenNewPostInput'), {
    target: {
      files: [image],
    },
  });

  expect(await screen.findByTestId('new-post-page')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('suggestionsPageLink'));

  expect(screen.getByTestId('suggestions-page')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('myProfilePageLink'));

  expect(screen.getByTestId('my-profile-page')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('indexPageLink'));

  expect(screen.getByTestId('index-page')).toBeInTheDocument();
});
