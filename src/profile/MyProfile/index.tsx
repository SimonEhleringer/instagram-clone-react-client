import React, { useRef } from 'react';
import { UserResponseDto } from '../../api/meFollowed';
import { PostResponseDto } from '../../api/sharedDtos';
import Profile from '../Profile';
import Button, { ButtonType } from '../../shared/Button';
import { useLogout } from '../../authentication/useLogout';
import { changeProfileImage } from '../../api/meProfileImage';
import { useReadFileFromEvent } from '../../shared/hooks/useReadFileFromEvent';
import InvisibleButton from '../../shared/InvisibleButton';
import HiddenImageInput from '../../shared/HiddenImageInput';
import { useHiddenInput } from '../../shared/hooks/useHiddenInput';

export interface MyProfileProps {
  user: UserResponseDto;
  posts: PostResponseDto[];
  followers: UserResponseDto[];
  followed: UserResponseDto[];
  reloadProfileInformation: () => void;
}

// TODO: Add loader to profile image (for changing profile image)
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
        loading={isLoggingOut}
        type={ButtonType.SecondaryContained}
        htmlInputProps={{
          onClick: handleButtonClick,
        }}
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
          data-testid='changeProfileImageHiddenFileInput'
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
