import React from 'react';
import { useEffect } from 'react';
import { FeedPostResponseDto } from '../../api/meFeed';
import FeedPost from '../FeedPost';
import './style.scss';

export interface FeedProps {
  feed: FeedPostResponseDto[];
}

const Feed: React.FC<FeedProps> = ({ feed }) => {
  return (
    <div className='feed'>
      {feed.map((feedPost) => (
        <FeedPost key={feedPost.postId} feedPost={feedPost} />
      ))}
    </div>
  );
};

export default Feed;
