import { AxiosError, AxiosResponse } from 'axios';
import { AuthenticationState } from '../redux/authentication/slice';
import faker from 'faker';
import {
  FollowedResponseDto,
  PostResponseDto,
  PostsResponseDto,
  UserResponseDto,
} from '../api/shared-dtos';
import { FollowersResponseDto } from '../api/user-followers';
import { FeedPostResponseDto, FeedResponseDto } from '../api/me-feed';
import { SuggestionsResponseDto } from '../api/me-suggestions';
import { config } from 'node:process';
import { ErrorResponseDto } from '../shared/error';
import { AccessAndRefreshTokenResponseDto } from '../api/authentication';

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
  overrides?: Partial<PostsResponseDto>,
  postsLength?: number
): PostsResponseDto => {
  return {
    posts: makeArray(buildPostResponseDto, postsLength),
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

export const buildFeedResponseDto = (
  overrides?: Partial<FeedResponseDto>,
  feedLength?: number
): FeedResponseDto => {
  return {
    feed: makeArray(buildFeedPostResponseDto, feedLength),
    ...overrides,
  };
};

export const buildFeedPostResponseDto = (
  overrides?: Partial<FeedPostResponseDto>
): FeedPostResponseDto => {
  return {
    postId: faker.datatype.number(),
    text: faker.lorem.paragraph(),
    publicImageId: faker.datatype.string(),
    creationTime: faker.date.recent(),
    creator: buildUserResponseDto(),
    ...overrides,
  };
};

export const buildFollowersResponseDto = (
  overrides?: Partial<FollowersResponseDto>,
  followersLength?: number
): FollowersResponseDto => {
  return {
    followers: makeArray(buildUserResponseDto, followersLength),
    ...overrides,
  };
};

export const buildFollowedResponseDto = (
  overrides?: Partial<FollowedResponseDto>,
  followedLength?: number
): FollowedResponseDto => {
  return {
    followed: makeArray(buildUserResponseDto, followedLength),
    ...overrides,
  };
};

export const buildSuggestionsResponseDto = (
  overrides?: Partial<SuggestionsResponseDto>,
  suggestionsLength?: number
): SuggestionsResponseDto => {
  return {
    suggestions: makeArray(buildUserResponseDto, suggestionsLength),
    ...overrides,
  };
};

export const buildErrorResponseDto = (
  overrides?: Partial<ErrorResponseDto>,
  errorsLength?: number
): ErrorResponseDto => {
  return {
    errors: makeArray(() => faker.lorem.sentence(10), errorsLength),
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

export const buildAxiosError = <T extends unknown>(
  data: T,
  overrides?: Partial<AxiosError<T>>
): AxiosError<T> => {
  return {
    config: {},
    isAxiosError: true,
    message: faker.lorem.sentence(10),
    name: faker.datatype.string(),
    toJSON: () => {
      return {};
    },
    response: {
      config: {},
      data: data,
      headers: [],
      status: 400,
      statusText: 'Bad Request',
    },
    ...overrides,
  };
};

export const buildAccessAndRefreshTokenResponseDto = (
  overrides?: Partial<AccessAndRefreshTokenResponseDto>
): AccessAndRefreshTokenResponseDto => {
  return {
    accessToken: buildJwtTokenWithUserIdAsSubject().jwtToken,
    refreshToken: faker.datatype.uuid(),
    ...overrides,
  };
};

export const makeArray = <T extends unknown>(
  generator: () => T,
  length: number = faker.datatype.number({ min: 1, max: 10 })
): T[] => {
  return Array.from({ length }, generator);
};

export const buildMockedImage = () => {
  const imageBlob = 'someImage';
  const image = new File([imageBlob], 'image.png', { type: 'image/png' });
  const imageDataUri = 'data:image/png;base64,c29tZUltYWdl';

  return { imageBlob, image, imageDataUri };
};

export const buildMockedCloudinaryImageSource = (
  publicProfileImageId: string
) => `'https://mocked-cloudinary/${publicProfileImageId}`;

// Sub: dde9efb4-327e-4906-be48-036e7daecd80
// Secret: ABC
export const buildJwtTokenWithUserIdAsSubject = () => {
  return {
    userId: 'dde9efb4-327e-4906-be48-036e7daecd80',
    jwtToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZGU5ZWZiNC0zMjdlLTQ5MDYtYmU0OC0wMzZlN2RhZWNkODAifQ.v9sVHDE2nrdrjmCrpLG1ZGiNX1Zax5fAPGpsJbwCkyI',
  };
};

// Secret: ABC
export const buildJwtTokenWithoutSubject = () =>
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.CYY-KIKrF1-WEW_v6KU2z5I7aZrKjfv10ygYGqQCRyc';
