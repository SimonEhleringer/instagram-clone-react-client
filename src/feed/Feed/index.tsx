import React from 'react';
import { useEffect } from 'react';
import { FeedPostResponseDto } from '../../api/meFeed';
import FeedPost from '../FeedPost';

export interface FeedProps {
  feed: FeedPostResponseDto[];
}

const Feed: React.FC<FeedProps> = ({ feed }) => {
  useEffect(() => {
    console.log(feed);
  }, []);

  return (
    <div>
      {feed.map((feedPost) => (
        <FeedPost key={feedPost.postId} feedPost={feedPost} />
      ))}
    </div>
  );
};

export default Feed;
