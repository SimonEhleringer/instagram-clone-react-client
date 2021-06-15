import React from 'react';
import { UserResponseDto } from '../../api/meFollowed';
import { PostResponseDto } from '../../api/sharedDtos';
import Avatar from '../../shared/Avatar';
import './style.scss';
import Stat from '../Stat';

interface ProfileInformationProps {
  user: UserResponseDto;
  posts: PostResponseDto[];
  followers: UserResponseDto[];
  followed: UserResponseDto[];
  renderButton: () => JSX.Element;
}

const ProfileInformation: React.FC<ProfileInformationProps> = ({
  user,
  posts,
  followers,
  followed,
  renderButton,
}) => {
  return (
    <div className='profile-information'>
      <div className='profile-information__image'>
        <Avatar
          widthInPx={150}
          publicProfileImageId={user.publicProfileImageId}
        />
      </div>

      <div className='profile-information__details'>
        <div className='profile-information__username-and-button'>
          <h2 className='profile-information__username'>{user.username}</h2>

          {renderButton()}
        </div>

        <div className='profile-information__stats'>
          <Stat number={posts.length} text='Beiträge' />
          <Stat number={followers.length} text='Abonennten' />
          <Stat number={followed.length} text='abonniert' />
        </div>

        <h1 className='profile-information__full-name'>{user.fullName}</h1>
      </div>
    </div>
  );
};

export default ProfileInformation;
