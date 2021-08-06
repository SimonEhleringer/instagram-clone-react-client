import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserResponseDto } from '../../api/shared-dtos';
import { ReduxState } from '../../config/store';
import { buildMyProfilePath, buildUserProfilePath } from '../../routes/path';
import './style.scss';

interface UserProfileProps {
  user: UserResponseDto;
}

const UserProfileLink: React.FC<UserProfileProps> = ({ user }) => {
  const loggedInUserId = useSelector(
    (state: ReduxState) => state.authenticationState.loggedInUserId
  );

  const isUserLoggedInUser = loggedInUserId === user.userId;

  const profilePath = isUserLoggedInUser
    ? buildMyProfilePath()
    : buildUserProfilePath(user.userId);

  return (
    <Link to={profilePath} className='user-profile-link'>
      {user.username}
    </Link>
  );
};

export default UserProfileLink;
