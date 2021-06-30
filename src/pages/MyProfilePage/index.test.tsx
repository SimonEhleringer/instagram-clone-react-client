import resourceApi from '../../config/resourceApi';
import {
  buildGetUsersFollowersUrl,
  FollowersResponseDto,
} from '../../api/userFollowers';
import {
  buildGetUsersFollowedUrl,
  FollowedResponseDto,
} from '../../api/userFollowed';
import { when } from 'jest-when';
import { buildGetUserUrl } from '../../api/user';
import { buildGetUsersPostsUrl } from '../../api/userPost';
import {
  buildAuthenticationState,
  buildAxiosResponseWithData,
  buildFollowedResponseDto,
  buildFollowersResponseDto,
  buildPostsResponseDto,
  buildUserResponseDto,
  renderWithProviders,
  renderMockedLoginRoute,
  buildMockedCloudinaryImageSource,
} from '../../test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { configureStore, StoreType } from '../../config/store';
import { initialState } from '../../redux/authentication/slice';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import { buildMyProfilePath, renderMyProfileRoute } from '../../routes';
import { ProfileImageRequestDto } from '../../api/meProfileImage';
import { UserResponseDto } from '../../api/meFollowed';
import { PostsResponseDto } from '../../api/sharedDtos';

jest.mock('../../config/resourceApi.ts');
const mockedResourceApi = resourceApi as jest.Mocked<typeof resourceApi>;

jest.mock('../../config/authenticationApi.ts');

jest.mock(
  'cloudinary-react',
  () => require('../../test-utils/mock-objects/cloudinary').default
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
      screen.getByText('Noch keine Beiträge vorhanden')
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
    await screen.findByTestId('changeProfileImageHiddenFileInput'),
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

  // TODO: Use builder
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

  when(mockedResourceApi.get)
    .calledWith(buildGetUserUrl(newUser.userId))
    .mockResolvedValueOnce(buildAxiosResponseWithData(newUser));

  fireEvent.change(
    await screen.findByTestId('changeProfileImageHiddenFileInput'),
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
