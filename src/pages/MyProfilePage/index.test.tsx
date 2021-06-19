import resourceApi from '../../config/resourceApi';
import { buildGetUsersFollowersUrl } from '../../api/userFollowers';
import { buildGetUsersFollowedUrl } from '../../api/userFollowed';
import { when } from 'jest-when';
import { buildGetUserUrl } from '../../api/user';
import { buildGetUsersPostsUrl } from '../../api/userPost';
import {
  MockedLoginPage,
  buildAuthenticationState,
  buildAxiosResponseWithData,
  buildAxiosResponseWithoutData,
  buildFollowedResponseDto,
  buildFollowersResponseDto,
  buildPostsResponseDto,
  buildUserResponseDto,
  renderWithProviders,
} from '../../test-utils';
import MyProfilePage from '.';
import { Route } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import { configureStore } from '../../config/store';
import { initialState } from '../../redux/authentication/slice';
import userEvent from '@testing-library/user-event';
import { buildLogoutUrl } from '../../api/authentication';
import ProtectedRoute from '../../shared/ProtectedRoute';

jest.mock('../../config/resourceApi.ts');
const mockedResourceApi = resourceApi as jest.Mocked<typeof resourceApi>;

jest.mock(
  'cloudinary-react',
  () => require('../../test-utils/mock-objects/cloudinary').default
);

it('should load data and show profile when data is loaded and no errors occurred', async () => {
  const user = buildUserResponseDto();
  const posts = buildPostsResponseDto();
  const followers = buildFollowersResponseDto();
  const followed = buildFollowedResponseDto();

  when(mockedResourceApi.get)
    .calledWith(buildGetUserUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(user))
    .calledWith(buildGetUsersPostsUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(posts))
    .calledWith(buildGetUsersFollowersUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(followers))
    .calledWith(buildGetUsersFollowedUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(followed));

  const store = configureStore();

  store.getState().authenticationState = {
    ...initialState,
    loggedInUserId: user.userId,
  };

  renderWithProviders(<Route path='/profiles/me' component={MyProfilePage} />, {
    route: '/profiles/me',
    store: store,
  });

  expect(screen.getByTestId('loader')).toBeInTheDocument();

  await waitFor(() =>
    expect(
      screen.getByRole('heading', { name: user.username })
    ).toBeInTheDocument()
  );
  expect(
    screen.getByRole('heading', { name: user.fullName })
  ).toBeInTheDocument();

  expect(screen.getByText(/Beiträge/)).toHaveTextContent(
    `${posts.posts.length} Beiträge`
  );
  expect(screen.getByText(/Abonennten/)).toHaveTextContent(
    `${followers.followers.length} Abonennten`
  );
  expect(screen.getByText(/abonniert/)).toHaveTextContent(
    `${followed.followed.length} abonniert`
  );

  expect(
    screen.getByAltText(`${user.username}-profile-image`)
  ).toBeInTheDocument();

  posts.posts.forEach((post) => {
    expect(screen.getByAltText(post.publicImageId)).toBeInTheDocument();
  });
});

it('should log user out when log out button is pressed', async () => {
  const user = buildUserResponseDto();
  const posts = buildPostsResponseDto();
  const followers = buildFollowersResponseDto();
  const followed = buildFollowedResponseDto();

  when(mockedResourceApi.get)
    .calledWith(buildGetUserUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(user))
    .calledWith(buildGetUsersPostsUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(posts))
    .calledWith(buildGetUsersFollowersUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(followers))
    .calledWith(buildGetUsersFollowedUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(followed));

  when(mockedResourceApi.post)
    .calledWith(buildLogoutUrl())
    .mockResolvedValueOnce(buildAxiosResponseWithoutData());

  const store = configureStore();

  store.getState().authenticationState = buildAuthenticationState({
    loggedInUserId: user.userId,
  });

  renderWithProviders(
    <>
      <ProtectedRoute path='/profiles/me' component={MyProfilePage} />
      <Route path='/login' component={MockedLoginPage} />
    </>,
    {
      route: '/profiles/me',
      store: store,
    }
  );

  const logoutButton = await screen.findByRole('button', { name: /Abmelden/ });

  userEvent.click(logoutButton);

  await waitFor(() =>
    expect(screen.getByTestId('login-page')).toBeInTheDocument()
  );
});
