// TODO: Maybe some refactoring -> Put api requests in this file in another file

import resourceApi from '../config/resourceApi';
import { FollowedResponseDto } from './userFollowed';

export const addFollow = (followedId: string) => {
  return resourceApi.post(`me/followed/${followedId}`);
};

// TODO: Add test
export const getLoggedInUsersFollowed = () => {
  return resourceApi.get<FollowedResponseDto>('me/followed');
};

// TODO: Add test
export const deleteFollow = (followedId: string) => {
  return resourceApi.delete(`me/followed/${followedId}`);
};

export interface UserResponseDto {
  userId: string;
  fullName: string;
  username: string;
  publicProfileImageId?: string;
}
