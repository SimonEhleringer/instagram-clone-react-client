import resourceApi from '../config/resource-api';
import { PostsResponseDto } from './shared-dtos';

export const getUsersPosts = async (userId: string) => {
  return await resourceApi.get<PostsResponseDto>(buildGetUsersPostsUrl(userId));
};

export const buildGetUsersPostsUrl = (userId: string) => {
  return `/users/${userId}/posts`;
};
