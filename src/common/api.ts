// TODO: Maybe some refactoring -> Put api requests in this file in another file

import resourceApi from '../config/resourceApi';

export const addFollow = (followedId: string) => {
  return resourceApi.post(`me/followed/${followedId}`);
};

export interface UserResponseDto {
  userId: string;
  fullName: string;
  username: string;
  publicProfileImageId?: string;
}
