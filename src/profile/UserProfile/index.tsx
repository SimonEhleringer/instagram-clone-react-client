import React, { useState } from 'react';
import { addFollow, deleteFollow } from '../../api/me-followed';
import { PostResponseDto, UserResponseDto } from '../../api/shared-dtos';
import Button, { ButtonType } from '../../shared/Button';
import Profile from '../Profile';

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
            isLoading={isUnfollowButtonLoading}
            onClick={handleUnfollowButtonClick}
            buttonType={ButtonType.SecondaryContained}
          >
            Nicht mehr folgen
          </Button>
        ) : (
          <Button
            isLoading={isFollowButtonLoading}
            onClick={handleFollowButtonClick}
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
