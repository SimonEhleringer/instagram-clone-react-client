import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import { when } from 'jest-when';
import { ProfileImageRequestDto } from '../../api/me-profile-image';
import {
  FollowedResponseDto,
  PostsResponseDto,
  UserResponseDto,
} from '../../api/shared-dtos';
import { buildGetUserUrl } from '../../api/user';
import { buildGetUsersFollowedUrl } from '../../api/user-followed';
import {
  buildGetUsersFollowersUrl,
  FollowersResponseDto,
} from '../../api/user-followers';
import { buildGetUsersPostsUrl } from '../../api/user-post';
import resourceApi from '../../config/resource-api';
import { configureStore, StoreType } from '../../config/store';
import { initialState } from '../../redux/authentication/slice';
import { buildMyProfilePath } from '../../routes/path';
import { renderMyProfileRoute } from '../../routes/renderers';
import {
  buildAxiosResponseWithData,
  buildFollowedResponseDto,
  buildFollowersResponseDto,
  buildMockedCloudinaryImageSource,
  buildMockedImage,
  buildPostsResponseDto,
  buildUserResponseDto,
  renderMockedLoginRoute,
  renderWithProviders,
} from '../../test-utils';

jest.mock('../../config/resource-api.ts');
const mockedResourceApi = resourceApi as jest.Mocked<typeof resourceApi>;

jest.mock('../../config/authentication-api.ts');

jest.mock(
  'cloudinary-react',
  () => require('../../test-utils/mock-objects/cloudinary').default
);

jest.mock(
  'react-lazyload',
  () => require('../../test-utils/mock-objects/react-lazyload').default
);

let user: UserResponseDto;
let posts: PostsResponseDto;
let followers: FollowersResponseDto;
let followed: FollowedResponseDto;
let store: StoreType;

beforeEach(() => {
  user = buildUserResponseDto();
  posts = buildPostsResponseDto();
  followers = buildFollowersResponseDto();
  followed = buildFollowedResponseDto();

  when(mockedResourceApi.get)
    .calledWith(buildGetUserUrl(user.userId))
    .mockResolvedValue(buildAxiosResponseWithData(user))
    .calledWith(buildGetUsersPostsUrl(user.userId))
    .mockResolvedValue(buildAxiosResponseWithData(posts))
    .calledWith(buildGetUsersFollowersUrl(user.userId))
    .mockResolvedValue(buildAxiosResponseWithData(followers))
    .calledWith(buildGetUsersFollowedUrl(user.userId))
    .mockResolvedValue(buildAxiosResponseWithData(followed));

  store = configureStore();

  store.getState().authenticationState = {
    ...initialState,
    loggedInUserId: user.userId,
  };
});

it('should load data and show profile when data is loaded and no errors occurred', async () => {
  renderWithProviders(renderMyProfileRoute(), {
    route: buildMyProfilePath(),
    store: store,
  });

  expect(screen.getByTestId('page-loader')).toBeInTheDocument();

  await waitFor(() =>
    expect(
      screen.getByRole('heading', { name: user.username })
    ).toBeInTheDocument()
  );
  expect(
    screen.getByRole('heading', { name: user.fullName })
  ).toBeInTheDocument();

  expect(screen.getByText(/Beitr??ge/)).toHaveTextContent(
    `${posts.posts.length} Beitr??ge`
  );
  expect(screen.getByText(/Abonennten/)).toHaveTextContent(
    `${followers.followers.length} Abonennten`
  );
  expect(screen.getByText(/abonniert/)).toHaveTextContent(
    `${followed.followed.length} abonniert`
  );

  expect(screen.getByAltText(`${user.username}-profile-image`)).toHaveAttribute(
    'src',
    buildMockedCloudinaryImageSource(user.publicProfileImageId!)
  );

  posts.posts.forEach((post) => {
    expect(screen.getByAltText(post.publicImageId)).toHaveAttribute(
      'src',
      buildMockedCloudinaryImageSource(post.publicImageId)
    );
  });
});

it('should show placeholder text for posts when user has no posts', async () => {
  posts = buildPostsResponseDto({}, 0);

  when(mockedResourceApi.get)
    .calledWith(buildGetUsersPostsUrl(user.userId))
    .mockResolvedValue(buildAxiosResponseWithData(posts));

  renderWithProviders(renderMyProfileRoute(), {
    route: buildMyProfilePath(),
    store: store,
  });

  await waitFor(() =>
    expect(
      screen.getByText('Noch keine Beitr??ge vorhanden')
    ).toBeInTheDocument()
  );
});

it('should log user out when log out button is pressed', async () => {
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

it('should pretent click on hidden input when profile image is pressed', async () => {
  renderWithProviders(renderMyProfileRoute(), {
    route: buildMyProfilePath(),
    store: store,
  });

  const fileInputClick = jest.spyOn(
    await screen.findByTestId('change-profile-image-hidden-file-input'),
    'click'
  );

  userEvent.click(screen.getByAltText(`${user.username}-profile-image`));

  expect(fileInputClick).toHaveBeenCalled();
});

it('should upload new profile image and show it when new image is selected', async () => {
  renderWithProviders(renderMyProfileRoute(), {
    route: buildMyProfilePath(),
    store: store,
  });

  const { image, imageDataUri } = buildMockedImage();

  const newUser: UserResponseDto = {
    ...user,
    publicProfileImageId: faker.datatype.string(),
  };

  const profileImageRequestDto: ProfileImageRequestDto = {
    imageDataUri,
  };

  when(mockedResourceApi.get)
    .calledWith(buildGetUserUrl(newUser.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(newUser));

  fireEvent.change(
    await screen.findByTestId('change-profile-image-hidden-file-input'),
    {
      target: {
        files: [image],
      },
    }
  );

  await waitFor(() =>
    expect(
      screen.getByAltText(`${newUser.username}-profile-image`)
    ).toHaveAttribute(
      'src',
      buildMockedCloudinaryImageSource(newUser.publicProfileImageId!)
    )
  );

  expect(mockedResourceApi.post).toHaveBeenCalledWith(
    expect.anything(),
    profileImageRequestDto
  );
});
