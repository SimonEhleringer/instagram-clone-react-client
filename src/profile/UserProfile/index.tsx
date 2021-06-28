import React from 'react';
import { addFollow, deleteFollow, UserResponseDto } from '../../api/meFollowed';
import { PostResponseDto } from '../../api/sharedDtos';
import Profile from '../Profile';
import Button, { ButtonType } from '../../shared/Button';
import { useState } from 'react';

export interface UserProfileProps {
  user: UserResponseDto;
  posts: PostResponseDto[];
  followers: UserResponseDto[];
  followed: UserResponseDto[];
  loggedInUsersFollowed: UserResponseDto[];
  reloadUserInformation: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  loggedInUsersFollowed,
  user,
  posts,
  followers,
  followed,
  reloadUserInformation: loadLoggedInUsersFollowed,
}) => {
  const [isFollowButtonLoading, setIsFollowButtonLoading] = useState(false);
  const [isUnfollowButtonLoading, setIsUnfollowButtonLoading] = useState(false);

  const handleFollowButtonClick = async () => {
    setIsFollowButtonLoading(true);
    setIsUnfollowButtonLoading(false);

    await addFollow(user.userId);

    await loadLoggedInUsersFollowed();
  };

  const handleUnfollowButtonClick = async () => {
    setIsUnfollowButtonLoading(true);
    setIsFollowButtonLoading(false);

    await deleteFollow(user.userId);

    await loadLoggedInUsersFollowed();
  };

  const renderButton = () => {
    const doesLoggedInUserFollowUser =
      loggedInUsersFollowed.filter((val) => val.userId === user.userId).length >
      0;

    return (
      <>
        {doesLoggedInUserFollowUser ? (
          <Button
            loading={isUnfollowButtonLoading}
            htmlInputProps={{
              onClick: handleUnfollowButtonClick,
            }}
            type={ButtonType.SecondaryContained}
          >
            Nicht mehr folgen
          </Button>
        ) : (
          <Button
            loading={isFollowButtonLoading}
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

  const renderAvatar = (avatar: JSX.Element) => <>{avatar}</>;

  return (
    <Profile
      user={user}
      posts={posts}
      followers={followers}
      followed={followed}
      renderAvatar={renderAvatar}
      renderButton={renderButton}
    />
  );
};

export default UserProfile;
