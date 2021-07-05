import resourceApi from '../config/resource-api';
import { UserResponseDto } from '../api/shared-dtos';

export const getUsersFollowers = async (userId: string) => {
  return await resourceApi.get<FollowersResponseDto>(
    buildGetUsersFollowersUrl(userId)
  );
};

export const buildGetUsersFollowersUrl = (userId: string) => {
  return `/users/${userId}/followers`;
};

export interface FollowersResponseDto {
  followers: UserResponseDto[];
}
