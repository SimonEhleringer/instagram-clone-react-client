import resourceApi from '../config/resourceApi';
import { UserResponseDto } from './meFollowed';
import { buildGetUsersFollowersUrl } from './userFollowers';

// Add tests
export const getUsersFollowed = async (userId: string) => {
  return await resourceApi.get<FollowedResponseDto>(
    buildGetUsersFollowedUrl(userId)
  );
};

export const buildGetUsersFollowedUrl = (userId: string) => {
  return `/users/${userId}/followed`;
};

export interface FollowedResponseDto {
  followed: UserResponseDto[];
}
