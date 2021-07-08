import React from 'react';
import { FeedPostResponseDto } from '../../api/me-feed';
import Avatar from '../../shared/Avatar';
import { Image, Transformation } from 'cloudinary-react';
import './style.scss';
import UserProfileLink from '../../shared/UserProfileLink';
import { getDisplayTimeDiffFromNowString } from '../../shared/time';
import ImagePlaceholder, {
  ImagePlaceholderShape,
} from '../../shared/ImagePlaceholder';
import LazyLoad from 'react-lazyload';

export interface FeedPostProps {
  feedPost: FeedPostResponseDto;
}

const imageWidthInPx = 800;

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
        <ImagePlaceholder
          widthInPx={imageWidthInPx}
          shape={ImagePlaceholderShape.square}
          render={(onLoad) => (
            <LazyLoad offset={500}>
              <Image
                publicId={feedPost.publicImageId}
                alt={feedPost.publicImageId}
                onLoad={onLoad}
                format='jpg'
              >
                <Transformation
                  crop='lfill'
                  width={imageWidthInPx}
                  quality='80'
                />
              </Image>
            </LazyLoad>
          )}
        />
      </div>

      <div className='feed-post__bottom'>
        {feedPost.text && (
          <div className='feed-post__caption'>
            <UserProfileLink user={feedPost.creator} />{' '}
            <span className='feed-post__caption-text'>{feedPost.text}</span>
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
