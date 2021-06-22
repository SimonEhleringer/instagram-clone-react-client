import React from 'react';
import { UserResponseDto } from '../../api/meFollowed';
import Avatar from '../Avatar';
import './style.scss';

export interface ProfilePreviewProps {
  user: UserResponseDto;
  avatarSizeInPx: number;
  renderUserInformation: () => JSX.Element;
  renderButton: () => JSX.Element;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({
  user,
  avatarSizeInPx,
  renderUserInformation,
  renderButton,
}) => {
  return (
    <div className='profile-preview'>
      <Avatar
        publicProfileImageId={user.publicProfileImageId}
        widthInPx={avatarSizeInPx}
        username={user.username}
      />

      <div className='profile-preview__user-information'>
        {renderUserInformation()}
      </div>

      <div className='profile-preview__button'>{renderButton()}</div>
    </div>
  );
};

export default ProfilePreview;
