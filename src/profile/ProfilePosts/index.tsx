import React from 'react';
import { BsGrid3X3 } from 'react-icons/bs';
import { Image, Transformation } from 'cloudinary-react';
import { PostResponseDto } from '../../api/shared-dtos';
import './style.scss';

interface ProfilePostsProps {
  posts: PostResponseDto[];
}

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
            <div key={post.postId} className='profile-posts__post'>
              <Image publicId={post.publicImageId} alt={post.publicImageId}>
                <Transformation aspectRatio='1:1' crop='lfill' width={300} />
              </Image>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
