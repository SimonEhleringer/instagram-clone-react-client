import { AxiosResponse } from 'axios';
import { AuthenticationState } from '../redux/authentication/slice';
import faker from 'faker';
import { UserResponseDto } from '../api/meFollowed';
import { PostResponseDto, PostsResponseDto } from '../api/sharedDtos';
import { FollowersResponseDto } from '../api/userFollowers';
import { FollowedResponseDto } from '../api/userFollowed';

export const buildAuthenticationState = (
  overrides?: Partial<AuthenticationState>
): AuthenticationState => {
  return {
    accessToken: faker.datatype.string(),
    refreshToken: faker.datatype.uuid(),
    loggedInUserId: faker.datatype.uuid(),
    ...overrides,
  };
};

export const buildUserResponseDto = (
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

export const buildPostsResponseDto = (
  overrides?: Partial<PostsResponseDto>
): PostsResponseDto => {
  return {
    posts: makeArray(buildPostResponseDto),
    ...overrides,
  };
};

export const buildPostResponseDto = (
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

export const buildFollowersResponseDto = (
  overrides?: Partial<FollowersResponseDto>
): FollowersResponseDto => {
  return {
    followers: makeArray(buildUserResponseDto),
    ...overrides,
  };
};

export const buildFollowedResponseDto = (
  overrides?: Partial<FollowedResponseDto>
): FollowedResponseDto => {
  return {
    followed: makeArray(buildUserResponseDto),
    ...overrides,
  };
};

export const buildAxiosResponseWithData = <T extends unknown>(
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

export const buildAxiosResponseWithoutData = (
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

export const makeArray = <T extends unknown>(
  generator: () => T,
  length: number = faker.datatype.number(10)
): T[] => {
  return Array.from({ length }, generator);
};
