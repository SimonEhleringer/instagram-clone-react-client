import React from "react";
import ProfilePreview from "..";
import { UserResponseDto } from "../../../api/meFollowed";
import "./style.scss";
import UserProfileLink from "../../UserProfileLink";
import Button, { ButtonType } from "../../Button";
import { useLogout } from "../../../authentication/useLogout";

export interface MyProfilePreviewProps {
  me: UserResponseDto;
  avatarSizeInPx: number;
}

const MyProfilePreview: React.FC<MyProfilePreviewProps> = ({
  me,
  avatarSizeInPx,
}) => {
  const { logout, isLoggingOut } = useLogout();

  const handleButtonClick = () => logout();

  const renderUserInformation = () => (
    <>
      <UserProfileLink user={me} />

      <div className="my-profile-preview__full-name">{me.fullName}</div>
    </>
  );

  const renderButton = () => (
    <Button
      isLoading={isLoggingOut}
      buttonType={ButtonType.PrimaryText}
      onClick={handleButtonClick}
    >
      Abmelden
    </Button>
  );

  return (
    <ProfilePreview
      user={me}
      avatarSizeInPx={avatarSizeInPx}
      renderUserInformation={renderUserInformation}
      renderButton={renderButton}
    />
  );
};

export default MyProfilePreview;
