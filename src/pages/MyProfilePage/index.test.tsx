import resourceApi from '../../config/resourceApi';
import { buildGetUsersFollowersUrl } from '../../api/userFollowers';
import { buildGetUsersFollowedUrl } from '../../api/userFollowed';
import { when } from 'jest-when';
import { buildGetUserUrl } from '../../api/user';
import { buildGetUsersPostsUrl } from '../../api/userPost';
import {
  buildAuthenticationState,
  buildAxiosResponseWithData,
  buildAxiosResponseWithoutData,
  buildFollowedResponseDto,
  buildFollowersResponseDto,
  buildPostsResponseDto,
  buildUserResponseDto,
  renderWithProviders,
  renderMockedLoginRoute,
  buildMockedCloudinaryImageSource,
} from '../../test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { configureStore } from '../../config/store';
import { initialState } from '../../redux/authentication/slice';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import { buildMyProfilePath, renderMyProfileRoute } from '../../routes';
import {
  buildChangeProfileImageUrl,
  ProfileImageRequestDto,
} from '../../api/meProfileImage';
import { UserResponseDto } from '../../api/meFollowed';
import { buildGetMeUrl } from '../../api/me';

jest.mock('../../config/resourceApi.ts');
const mockedResourceApi = resourceApi as jest.Mocked<typeof resourceApi>;

jest.mock('../../config/authenticationApi.ts');

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

  renderWithProviders(renderMyProfileRoute(), {
    route: buildMyProfilePath(),
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

it('should show placeholder text for posts when user has no posts', async () => {
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
    .mockResolvedValueOnce(buildAxiosResponseWithData(followed));

  const store = configureStore();

  store.getState().authenticationState = {
    ...initialState,
    loggedInUserId: user.userId,
  };

  renderWithProviders(renderMyProfileRoute(), {
    route: buildMyProfilePath(),
    store: store,
  });

  await waitFor(() =>
    expect(
      screen.getByText('Noch keine Beiträge vorhanden')
    ).toBeInTheDocument()
  );
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

  const store = configureStore();

  store.getState().authenticationState = buildAuthenticationState({
    loggedInUserId: user.userId,
  });

  renderWithProviders(
    <>
      {renderMyProfileRoute()}
      {renderMockedLoginRoute()}
    </>,
    {
      route: buildMyProfilePath(),
      store: store,
    }
  );

  const logoutButton = await screen.findByRole('button', { name: /Abmelden/ });

  userEvent.click(logoutButton);

  await waitFor(() =>
    expect(screen.getByTestId('login-page')).toBeInTheDocument()
  );
});

it('should pretent click on hidden input when profile image is pressed', () => {
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

  renderWithProviders(renderMyProfileRoute(), {
    route: buildMyProfilePath(),
    store: store,
  });

  const fileInputClick = jest.spyOn(
    screen.getByTestId('hiddenFileInput'),
    'click'
  );

  userEvent.click(screen.getByTestId('invisibleButton'));

  expect(fileInputClick).toHaveBeenCalled();
});

it('should upload new profile image and show it when new image is selected', async () => {
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
    .mockResolvedValue(buildAxiosResponseWithData(followers))
    .calledWith(buildGetUsersFollowedUrl(user.userId))
    .mockResolvedValue(buildAxiosResponseWithData(followed));

  const store = configureStore();

  store.getState().authenticationState = {
    ...initialState,
    loggedInUserId: user.userId,
  };

  renderWithProviders(renderMyProfileRoute(), {
    route: buildMyProfilePath(),
    store: store,
  });

  const imageBlob = 'imageDataUri';
  const image = new File([imageBlob], 'image.png', { type: 'image/png' });
  const imageDataUri = 'data:image/png;base64,aW1hZ2VEYXRhVXJp';

  const newUser: UserResponseDto = {
    ...user,
    publicProfileImageId: faker.datatype.string(),
  };

  const profileImageRequestDto: ProfileImageRequestDto = {
    imageDataUri,
  };

  mockedResourceApi.post.mockResolvedValue(buildAxiosResponseWithData(newUser));

  // when(mockedResourceApi.post)
  //   .calledWith(buildChangeProfileImageUrl(), profileImageRequestDto)
  //   .mockResolvedValue(buildAxiosResponseWithData(newUser));

  when(mockedResourceApi.get)
    .calledWith(buildGetUserUrl(newUser.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(newUser));

  const test = screen.getByTestId('hiddenFileInput');

  console.log(test);

  fireEvent.change(test, {
    target: {
      files: [image],
    },
  });

  const profileImage = screen.queryByAltText(
    `${newUser.username}-profile-image`
  );

  await waitFor(() =>
    expect(profileImage).toHaveAttribute(
      'src',
      buildMockedCloudinaryImageSource(newUser.publicProfileImageId!)
    )
  );

  // expect(
  //   await screen.findByAltText(`${newUser.username}-profile-image`)
  // ).toHaveAttribute(
  //   'src',
  //   buildMockedCloudinaryImageSource(newUser.publicProfileImageId!)
  // );

  expect(mockedResourceApi.post).toHaveBeenCalled();
});
