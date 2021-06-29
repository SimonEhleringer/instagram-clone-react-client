import React from 'react';
import { FeedPostResponseDto } from '../../api/meFeed';
import FeedPost from '../FeedPost';

export interface FeedProps {
  feed: FeedPostResponseDto[];
}

const Feed: React.FC<FeedProps> = ({ feed }) => {
  return (
    <>
      {feed.map((feedPost) => (
        <FeedPost key={feedPost.postId} feedPost={feedPost} />
      ))}
    </>
  );
};

export default Feed;
