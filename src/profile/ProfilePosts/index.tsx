import React from 'react';
import { BsGrid3X3 } from 'react-icons/bs';
import { Image, Transformation, Placeholder } from 'cloudinary-react';
import { PostResponseDto } from '../../api/shared-dtos';
import './style.scss';
import ImagePlaceholder, {
  ImagePlaceholderShape,
} from '../../shared/ImagePlaceholder';
import LazyLoad from 'react-lazyload';

interface ProfilePostsProps {
  posts: PostResponseDto[];
}

const imageWidthInPx = 300;

const ProfilePosts: React.FC<ProfilePostsProps> = ({ posts }) => {
  return (
    <div>
      <div className='profile-posts__heading-wrapper'>
        <div className='profile-posts__heading'>
          <BsGrid3X3 size={12} />
          <span className='profile-posts__heading-text'>BEITRÄGE</span>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className='profile-posts__no-posts-placeholder'>
          Noch keine Beiträge vorhanden
        </div>
      ) : (
        <div className='profile-posts__posts'>
          {posts.map((post) => (
            <ImagePlaceholder
              key={post.postId}
              widthInPx={imageWidthInPx}
              shape={ImagePlaceholderShape.square}
              render={(onLoad) => (
                <LazyLoad offset={100}>
                  <Image
                    publicId={post.publicImageId}
                    alt={post.publicImageId}
                    onLoad={onLoad}
                    format='jpg'
                  >
                    <Transformation
                      aspectRatio='1:1'
                      crop='fill'
                      width={imageWidthInPx}
                      quality='80'
                    />
                  </Image>
                </LazyLoad>
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
