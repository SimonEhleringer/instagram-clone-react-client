import React from 'react';
import { UserResponseDto } from '../../api/meFollowed';
import { PostResponseDto } from '../../api/sharedDtos';
import Profile from '../Profile';
import Button, { ButtonType } from '../../shared/Button';
import { useLogout } from '../../authentication/useLogout';
import { changeProfileImage } from '../../api/meProfileImage';
import { useReadFileFromEvent } from '../../shared/hooks/useReadFileFromEvent';
import { useHiddenImageInput } from '../../shared/hooks/useHiddenImageInput';
import InvisibleButton from '../../shared/InvisibleButton';
import { useRef } from 'react';

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

  // const { fileInput, pretendClickOnFileInput } = useHiddenImageInput(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     readFileFromEvent(e, async (dataUri) => {
  //       console.log('im change');

  //       await changeProfileImage({ imageDataUri: dataUri });

  //       reloadProfileInformation();
  //     });
  //   }
  // );

  const test = (e: React.ChangeEvent<HTMLInputElement>) => {
    readFileFromEvent(e, (dataUri) => {
      console.log('im change');

      changeProfileImage({ imageDataUri: dataUri }).then(() =>
        reloadProfileInformation()
      );
    });
  };

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

  const test2 = useRef<HTMLInputElement>(null);

  const renderAvatar = (avatar: JSX.Element) => {
    return (
      <InvisibleButton
        onClick={() => /*pretendClickOnFileInput()*/ test2.current?.click()}
      >
        {/* {fileInput} */}

        <input type='file' onChange={test} data-testid='hiddenFiInput' />

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
