import React from 'react';
import { changeProfileImage } from '../../api/me-profile-image';
import { PostResponseDto, UserResponseDto } from '../../api/shared-dtos';
import { useLogout } from '../../authentication/useLogout';
import Button, { ButtonType } from '../../shared/Button';
import HiddenImageInput from '../../shared/HiddenImageInput';
import { useHiddenInput } from '../../shared/hooks/useHiddenInput';
import { useReadFileFromEvent } from '../../shared/hooks/useReadFileFromEvent';
import InvisibleButton from '../../shared/InvisibleButton';
import Profile from '../Profile';

export interface MyProfileProps {
  user: UserResponseDto;
  posts: PostResponseDto[];
  followers: UserResponseDto[];
  followed: UserResponseDto[];
  reloadProfileInformation: () => void;
}

const MyProfile: React.FC<MyProfileProps> = ({
  reloadProfileInformation,
  ...rest
}) => {
  const { isLoggingOut, logout } = useLogout();
  const { readFileFromEvent } = useReadFileFromEvent();

  const { fileInputRef, pretendClickOnFileInput } = useHiddenInput();

  const renderButton = () => {
    const handleButtonClick = () => {
      logout();
    };

    return (
      <Button
        isLoading={isLoggingOut}
        buttonType={ButtonType.SecondaryContained}
        onClick={handleButtonClick}
      >
        Abmelden
      </Button>
    );
  };

  const renderAvatar = (avatar: JSX.Element) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      readFileFromEvent(e, async (dataUri) => {
        await changeProfileImage({ imageDataUri: dataUri });

        reloadProfileInformation();
      });
    };

    return (
      <InvisibleButton onClick={() => pretendClickOnFileInput()}>
        <HiddenImageInput
          ref={fileInputRef}
          data-testid='change-profile-image-hidden-file-input'
          onChange={handleInputChange}
        />

        {avatar}
      </InvisibleButton>
    );
  };

  return (
    <Profile
      {...rest}
      renderButton={renderButton}
      renderAvatar={renderAvatar}
    />
  );
};

export default MyProfile;
