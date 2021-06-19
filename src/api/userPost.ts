import resourceApi from '../config/resourceApi';
import { PostsResponseDto } from './sharedDtos';

export const getUsersPosts = async (userId: string) => {
  return await resourceApi.get<PostsResponseDto>(buildGetUsersPostsUrl(userId));
};

export const buildGetUsersPostsUrl = (userId: string) => {
  return `/users/${userId}/posts`;
};
