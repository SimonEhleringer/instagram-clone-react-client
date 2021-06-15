import userEvent from '@testing-library/user-event';
import React from 'react';
import { addFollow, deleteFollow, UserResponseDto } from '../../api/meFollowed';
import { PostResponseDto } from '../../api/sharedDtos';
import Profile from '../Profile';
import Button, { ButtonType } from '../../shared/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export interface UserProfileProps {
  user: UserResponseDto;
  posts: PostResponseDto[];
  followers: UserResponseDto[];
  followed: UserResponseDto[];
  loggedInUsersFollowed: UserResponseDto[];
  loadLoggedInUsersFollowed: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  loggedInUsersFollowed,
  user,
  posts,
  followers,
  followed,
  loadLoggedInUsersFollowed,
}) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleFollowButtonClick = async () => {
    setIsButtonLoading(true);

    await addFollow(user.userId);

    await loadLoggedInUsersFollowed();

    setIsButtonLoading(false);
  };

  const handleUnfollowButtonClick = async () => {
    setIsButtonLoading(true);

    await deleteFollow(user.userId);

    await loadLoggedInUsersFollowed();

    setIsButtonLoading(false);
  };

  const renderButton = () => {
    const doesLoggedInUserFollowUser =
      loggedInUsersFollowed.filter((val) => val.userId === user.userId).length >
      0;

    return (
      <>
        {doesLoggedInUserFollowUser ? (
          <Button
            loading={isButtonLoading}
            htmlInputProps={{
              onClick: handleUnfollowButtonClick,
            }}
            type={ButtonType.SecondaryContained}
          >
            Nicht mehr folgen
          </Button>
        ) : (
          <Button
            loading={isButtonLoading}
            htmlInputProps={{
              onClick: handleFollowButtonClick,
            }}
          >
            Abonnieren
          </Button>
        )}
      </>
    );
  };

  return (
    <Profile
      user={user}
      posts={posts}
      followers={followers}
      followed={followed}
      renderButton={renderButton}
    />
  );
};

export default UserProfile;
