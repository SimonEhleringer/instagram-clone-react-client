import React, { useState } from 'react';
import ProfilePreview from '..';
import { addFollow } from '../../../api/me-followed';
import { UserResponseDto } from '../../../api/shared-dtos';
import Button, { ButtonType } from '../../Button';
import UserProfileLink from '../../UserProfileLink';
import './style.scss';

export interface UserProfilePreviewProps {
  user: UserResponseDto;
  avatarSizeInPx: number;
  buttonType: ButtonType;
  handleSuccessfulSubscription: () => void;
}

const UserProfilePreview: React.FC<UserProfilePreviewProps> = ({
  user,
  avatarSizeInPx,
  buttonType,
  handleSuccessfulSubscription,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (userIdToSubscribeTo: string) => {
    setLoading(true);

    await addFollow(userIdToSubscribeTo);

    handleSuccessfulSubscription();

    setLoading(false);
  };

  const renderUserInformation = () => (
    <>
      <UserProfileLink user={user} />

      <div className='user-profile-preview__full-name'>{user.fullName}</div>
    </>
  );

  const renderButton = () => (
    <Button
      isLoading={loading}
      buttonType={buttonType}
      onClick={() => handleSubscribe(user.userId)}
    >
      Abonnieren
    </Button>
  );

  return (
    <ProfilePreview
      user={user}
      avatarSizeInPx={avatarSizeInPx}
      renderUserInformation={renderUserInformation}
      renderButton={renderButton}
    />
  );
};

export default UserProfilePreview;
