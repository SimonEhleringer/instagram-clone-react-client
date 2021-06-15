import React, { useState } from 'react';
import { UserResponseDto } from '../../api/meFollowed';
import { PostResponseDto } from '../../api/sharedDtos';
import Profile from '../Profile';
import Button, { ButtonType } from '../../shared/Button';
import { useLogout } from '../../authentication/useLogout';

export interface MyProfileProps {
  user: UserResponseDto;
  posts: PostResponseDto[];
  followers: UserResponseDto[];
  followed: UserResponseDto[];
}

const MyProfile: React.FC<MyProfileProps> = (props) => {
  const { isLoggingOut, logout } = useLogout();

  const handleButtonClick = () => {
    logout();
  };

  const renderButton = () => (
    <Button
      loading={isLoggingOut}
      type={ButtonType.SecondaryContained}
      htmlInputProps={{
        onClick: handleButtonClick,
      }}
    >
      Abmelden
    </Button>
  );

  return <Profile {...props} renderButton={renderButton} />;
};

export default MyProfile;
