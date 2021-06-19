import resourceApi from '../config/resourceApi';
import { UserResponseDto } from './meFollowed';

// Add tests
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
