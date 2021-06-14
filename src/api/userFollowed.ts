import resourceApi from '../config/resourceApi';
import { UserResponseDto } from './meFollowed';

// Add tests
export const getUsersFollowed = async (userId: string) => {
  return await resourceApi.get<FollowedResponseDto>(
    `/users/${userId}/followed`
  );
};

export interface FollowedResponseDto {
  followed: UserResponseDto[];
}
