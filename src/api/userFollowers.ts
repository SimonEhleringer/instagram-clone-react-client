import resourceApi from '../config/resourceApi';
import { UserResponseDto } from './meFollowed';

// Add tests
export const getUsersFollowers = async (userId: string) => {
  return await resourceApi.get<FollowersResponseDto>(
    `/users/${userId}/followers`
  );
};

export interface FollowersResponseDto {
  followers: UserResponseDto[];
}
