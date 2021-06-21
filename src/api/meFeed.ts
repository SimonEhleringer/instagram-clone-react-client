import resourceApi from '../config/resourceApi';
import { UserResponseDto } from './meFollowed';

export const getFeed = () => {
  return resourceApi.get<FeedResponseDto>(buildGetFeedUrl());
};

export const buildGetFeedUrl = () => '/me/feed';

export interface FeedResponseDto {
  feed: FeedPostResponseDto[];
}

export interface FeedPostResponseDto {
  postId: number;
  publicImageId: string;
  text: string;
  creationTime: Date;
  creator: UserResponseDto;
}
