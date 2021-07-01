import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import {
  buildAddFollowUrl,
  buildDeleteFollowUrl,
  buildGetLoggedInUsersFollowedUrl,
} from '../../api/meFollowed';
import { buildGetUserUrl } from '../../api/user';
import {
  buildGetUsersFollowedUrl,
  FollowedResponseDto,
} from '../../api/userFollowed';
import {
  buildGetUsersFollowersUrl,
  FollowersResponseDto,
} from '../../api/userFollowers';
import { buildGetUsersPostsUrl } from '../../api/userPost';
import resourceApi from '../../config/resourceApi';
import { configureStore } from '../../config/store';
import { buildUserProfilePath, renderUserProfileRoute } from '../../routes';
import {
  buildAuthenticationState,
  buildAxiosResponseWithData,
  buildAxiosResponseWithoutData,
  buildFollowedResponseDto,
  buildFollowersResponseDto,
  buildPostsResponseDto,
  buildUserResponseDto,
  renderWithProviders,
} from '../../test-utils';

jest.mock('../../config/resourceApi.ts');
const mockedResourceApi = resourceApi as jest.Mocked<typeof resourceApi>;

jest.mock(
  'cloudinary-react',
  () => require('../../test-utils/mock-objects/cloudinary').default
);

it('should load data and show profile when data is loaded', async () => {
  const loggedInUser = buildUserResponseDto();
  const loggedInUsersFollowed = buildFollowedResponseDto();

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
    .mockResolvedValueOnce(buildAxiosResponseWithData(followed))
    .calledWith(buildGetLoggedInUsersFollowedUrl())
    .mockResolvedValueOnce(buildAxiosResponseWithData(loggedInUsersFollowed));

  const store = configureStore();
  store.getState().authenticationState = buildAuthenticationState({
    loggedInUserId: loggedInUser.userId,
  });

  renderWithProviders(renderUserProfileRoute(), {
    route: buildUserProfilePath(user.userId),
    store,
  });

  expect(screen.getByTestId('pageLoader')).toBeInTheDocument();

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

it('should show posts placeholder when user has no posts', async () => {
  const loggedInUser = buildUserResponseDto();
  const loggedInUsersFollowed = buildFollowedResponseDto();

  const user = buildUserResponseDto();
  const posts = buildPostsResponseDto({}, 0);
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
    .mockResolvedValueOnce(buildAxiosResponseWithData(followed))
    .calledWith(buildGetLoggedInUsersFollowedUrl())
    .mockResolvedValueOnce(buildAxiosResponseWithData(loggedInUsersFollowed));

  const store = configureStore();
  store.getState().authenticationState = buildAuthenticationState({
    loggedInUserId: loggedInUser.userId,
  });

  renderWithProviders(renderUserProfileRoute(), {
    route: buildUserProfilePath(user.userId),
    store,
  });

  await waitFor(() =>
    expect(
      screen.getByText('Noch keine Beiträge vorhanden')
    ).toBeInTheDocument()
  );
});

it('should show follow button when logged in user does not follow user and show unfollow button when follow button is pressed', async () => {
  const loggedInUser = buildUserResponseDto();
  const loggedInUsersFollowed = buildFollowedResponseDto();

  const user = buildUserResponseDto();
  const posts = buildPostsResponseDto();
  const followers = buildFollowersResponseDto();
  const followed = buildFollowedResponseDto();

  when(mockedResourceApi.get)
    .calledWith(buildGetUserUrl(user.userId))
    .mockResolvedValue(buildAxiosResponseWithData(user))
    .calledWith(buildGetUsersPostsUrl(user.userId))
    .mockResolvedValue(buildAxiosResponseWithData(posts))
    .calledWith(buildGetUsersFollowersUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(followers))
    .calledWith(buildGetUsersFollowedUrl(user.userId))
    .mockResolvedValue(buildAxiosResponseWithData(followed))
    .calledWith(buildGetLoggedInUsersFollowedUrl())
    .mockResolvedValueOnce(buildAxiosResponseWithData(loggedInUsersFollowed));

  const store = configureStore();
  store.getState().authenticationState = buildAuthenticationState({
    loggedInUserId: loggedInUser.userId,
  });

  renderWithProviders(renderUserProfileRoute(), {
    route: buildUserProfilePath(user.userId),
    store,
  });

  const followButton = await screen.findByRole('button', {
    name: 'Abonnieren',
  });

  expect(followButton).toBeInTheDocument();

  when(mockedResourceApi.post)
    .calledWith(buildAddFollowUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithoutData());

  const newFollowers: FollowersResponseDto = {
    followers: [...followers.followers, loggedInUser],
  };

  const newLoggedInUsersFollowed: FollowedResponseDto = {
    followed: [...loggedInUsersFollowed.followed, user],
  };

  when(mockedResourceApi.get)
    .calledWith(buildGetUsersFollowersUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(newFollowers))
    .calledWith(buildGetLoggedInUsersFollowedUrl())
    .mockResolvedValueOnce(
      buildAxiosResponseWithData(newLoggedInUsersFollowed)
    );

  userEvent.click(followButton);

  await waitFor(() =>
    expect(
      screen.getByRole('button', { name: 'Nicht mehr folgen' })
    ).toBeInTheDocument()
  );

  expect(screen.getByText(/Abonennten/)).toHaveTextContent(
    `${newFollowers.followers.length} Abonennten`
  );
});

it('should showun follow button when logged in user follow user and show follow button when unfollow button is pressed', async () => {
  const loggedInUser = buildUserResponseDto();
  const loggedInUsersFollowed = buildFollowedResponseDto();

  const user = buildUserResponseDto();
  const posts = buildPostsResponseDto();
  const followers = buildFollowersResponseDto();
  const followed = buildFollowedResponseDto();

  followers.followers.push(loggedInUser);
  loggedInUsersFollowed.followed.push(user);

  when(mockedResourceApi.get)
    .calledWith(buildGetUserUrl(user.userId))
    .mockResolvedValue(buildAxiosResponseWithData(user))
    .calledWith(buildGetUsersPostsUrl(user.userId))
    .mockResolvedValue(buildAxiosResponseWithData(posts))
    .calledWith(buildGetUsersFollowersUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(followers))
    .calledWith(buildGetUsersFollowedUrl(user.userId))
    .mockResolvedValue(buildAxiosResponseWithData(followed))
    .calledWith(buildGetLoggedInUsersFollowedUrl())
    .mockResolvedValueOnce(buildAxiosResponseWithData(loggedInUsersFollowed));

  const store = configureStore();
  store.getState().authenticationState = buildAuthenticationState({
    loggedInUserId: loggedInUser.userId,
  });

  renderWithProviders(renderUserProfileRoute(), {
    route: buildUserProfilePath(user.userId),
    store,
  });

  const unfollowButton = await screen.findByRole('button', {
    name: 'Nicht mehr folgen',
  });

  expect(unfollowButton).toBeInTheDocument();

  when(mockedResourceApi.post)
    .calledWith(buildDeleteFollowUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithoutData());

  const newFollowers: FollowersResponseDto = {
    followers: followers.followers.filter(
      (follower) => follower.userId !== loggedInUser.userId
    ),
  };

  const newLoggedInUsersFollowed: FollowedResponseDto = {
    followed: loggedInUsersFollowed.followed.filter(
      (u) => u.userId !== user.userId
    ),
  };

  when(mockedResourceApi.get)
    .calledWith(buildGetUsersFollowersUrl(user.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(newFollowers))
    .calledWith(buildGetLoggedInUsersFollowedUrl())
    .mockResolvedValueOnce(
      buildAxiosResponseWithData(newLoggedInUsersFollowed)
    );

  userEvent.click(unfollowButton);

  await waitFor(() =>
    expect(
      screen.getByRole('button', { name: 'Abonnieren' })
    ).toBeInTheDocument()
  );

  expect(screen.getByText(/Abonennten/)).toHaveTextContent(
    `${newFollowers.followers.length} Abonennten`
  );
});
