import resourceApi from '../config/resource-api';
import { FollowedResponseDto } from './shared-dtos';

export const getUsersFollowed = async (userId: string) => {
  return await resourceApi.get<FollowedResponseDto>(
    buildGetUsersFollowedUrl(userId)
  );
};

export const buildGetUsersFollowedUrl = (userId: string) => {
  return `/users/${userId}/followed`;
};
