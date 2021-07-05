import resourceApi from '../config/resource-api';
import { FollowedResponseDto } from './shared-dtos';

export const addFollow = (followedId: string) => {
  return resourceApi.post(buildAddFollowUrl(followedId));
};

export const buildAddFollowUrl = (followedId: string) =>
  `me/followed/${followedId}`;

export const getLoggedInUsersFollowed = () => {
  return resourceApi.get<FollowedResponseDto>(
    buildGetLoggedInUsersFollowedUrl()
  );
};

export const buildGetLoggedInUsersFollowedUrl = () => 'me/followed';

export const deleteFollow = (followedId: string) => {
  return resourceApi.delete(buildDeleteFollowUrl(followedId));
};

export const buildDeleteFollowUrl = (followedId: string) =>
  `me/followed/${followedId}`;
