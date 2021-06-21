import React from 'react';
import { FeedPostResponseDto } from '../../api/meFeed';
import Avatar from '../../shared/Avatar';
import { Image, Transformation } from 'cloudinary-react';

export interface FeedPostProps {
  feedPost: FeedPostResponseDto;
}

const FeedPost: React.FC<FeedPostProps> = ({ feedPost }) => {
  return (
    <div className='feed-post'>
      <div className='feed-post__top'>
        <Avatar
          username={feedPost.creator.username}
          widthInPx={20}
          publicProfileImageId={feedPost.creator.publicProfileImageId}
        />

        <div>{feedPost.creator.username}</div>
      </div>

      <div className='feed-post__middle'>
        <Image publicId={feedPost.publicImageId} alt={feedPost.publicImageId}>
          <Transformation aspectRatio='1:1' crop='lfill' width={300} />
        </Image>
      </div>

      <div className='feed-post__bottom'>
        <span>{feedPost.text}</span>
      </div>
    </div>
  );
};

export default FeedPost;
