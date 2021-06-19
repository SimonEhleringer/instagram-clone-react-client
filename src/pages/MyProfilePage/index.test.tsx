import { UserResponseDto } from '../../api/meFollowed';
import resourceApi from '../../config/resourceApi';
import faker from 'faker';
import { PostResponseDto, PostsResponseDto } from '../../api/sharedDtos';
import {
  buildGetUsersFollowersUrl,
  FollowersResponseDto,
} from '../../api/userFollowers';
import {
  buildGetUsersFollowedUrl,
  FollowedResponseDto,
} from '../../api/userFollowed';
import { AxiosResponse } from 'axios';
import { when } from 'jest-when';
import { buildGetUserUrl } from '../../api/user';
import { buildGetUsersPostsUrl } from '../../api/userPost';
import { render } from 'react-dom';
import { renderWithProviders } from '../../testUtils';
import MyProfilePage from '.';
import { Route } from 'react-router-dom';
import { getByAltText, screen, waitFor } from '@testing-library/react';
import { configureStore } from '../../config/store';
import {
  AuthenticationState,
  initialState,
} from '../../redux/authentication/slice';
import userEvent from '@testing-library/user-event';
import { buildLogoutUrl } from '../../api/authentication';
import ProtectedRoute from '../../shared/ProtectedRoute';
import { Switch } from 'react-router-dom';

// TODO: Add to utils
jest.mock('../../config/resourceApi.ts');
const mockedResourceApi = resourceApi as jest.Mocked<typeof resourceApi>;

jest.mock('cloudinary-react', () => cloudinaryMockObj);

const cloudinaryMockObj = {
  Image: (props: any) => <img alt={props.alt} />,
  Transformation: () => null,
};

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

// TODO: Add to utils
const buildAuthenticationState = (
  overrides?: Partial<AuthenticationState>
): AuthenticationState => {
  return {
    accessToken: faker.datatype.string(),
    refreshToken: faker.datatype.uuid(),
    loggedInUserId: faker.datatype.uuid(),
    ...overrides,
  };
};

const buildUserResponseDto = (
  overrides?: Partial<UserResponseDto>
): UserResponseDto => {
  return {
    userId: faker.datatype.uuid(),
    fullName: faker.name.findName(),
    username: faker.internet.userName(),
    publicProfileImageId: faker.datatype.string(),
    ...overrides,
  };
};

const buildPostsResponseDto = (
  overrides?: Partial<PostsResponseDto>
): PostsResponseDto => {
  return {
    posts: makeArray(buildPostResponseDto),
    ...overrides,
  };
};

const buildPostResponseDto = (
  overrides?: Partial<PostResponseDto>
): PostResponseDto => {
  return {
    postId: faker.datatype.number(),
    text: faker.lorem.paragraph(),
    publicImageId: faker.datatype.string(),
    creationTime: faker.date.recent(),
    ...overrides,
  };
};

const buildFollowersResponseDto = (
  overrides?: Partial<FollowersResponseDto>
): FollowersResponseDto => {
  return {
    followers: makeArray(buildUserResponseDto),
    ...overrides,
  };
};

const buildFollowedResponseDto = (
  overrides?: Partial<FollowedResponseDto>
): FollowedResponseDto => {
  return {
    followed: makeArray(buildUserResponseDto),
    ...overrides,
  };
};

const buildAxiosResponseWithData = <T extends unknown>(
  data: T,
  overrides?: Partial<AxiosResponse<T>>
): AxiosResponse<T> => {
  return {
    config: {},
    data: data,
    headers: [],
    status: 200,
    statusText: 'OK',
    ...overrides,
  };
};

const buildAxiosResponseWithoutData = (
  overrides?: Partial<AxiosResponse>
): AxiosResponse => {
  return {
    config: {},
    data: {},
    headers: [],
    status: 200,
    statusText: 'OK',
    ...overrides,
  };
};

const makeArray = <T extends unknown>(
  generator: () => T,
  length: number = faker.datatype.number(10)
): T[] => {
  return Array.from({ length }, generator);
};

const MockedLoginPage: React.FC = () => (
  <div data-testid='login-page'>Login page</div>
);
