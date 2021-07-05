import React from 'react';
import { FeedPostResponseDto } from '../../api/me-feed';
import Avatar from '../../shared/Avatar';
import { Image, Transformation } from 'cloudinary-react';
import './style.scss';
import UserProfileLink from '../../shared/UserProfileLink';
import { getDisplayTimeDiffFromNowString } from '../../shared/time';

export interface FeedPostProps {
  feedPost: FeedPostResponseDto;
}

const FeedPost: React.FC<FeedPostProps> = ({ feedPost }) => {
  return (
    <div className='feed-post'>
      <div className='feed-post__top'>
        <Avatar
          username={feedPost.creator.username}
          widthInPx={32}
          publicProfileImageId={feedPost.creator.publicProfileImageId}
        />

        <UserProfileLink user={feedPost.creator} />
      </div>

      <div className='feed-post__middle'>
        <Image publicId={feedPost.publicImageId} alt={feedPost.publicImageId}>
          <Transformation crop='lfill' width={800} />
        </Image>
      </div>

      <div className='feed-post__bottom'>
        {feedPost.text && (
          <div className='feed-post__caption'>
            <UserProfileLink user={feedPost.creator} />{' '}
            <span>{feedPost.text}</span>
          </div>
        )}

        <div className='feed-post__creation-time'>
          vor {getDisplayTimeDiffFromNowString(feedPost.creationTime)}
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
