import resourceApi from '../config/resource-api';
import { UserResponseDto } from './shared-dtos';

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
