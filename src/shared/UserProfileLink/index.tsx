import React from 'react';
import { UserResponseDto } from '../../api/meFollowed';
import { Link } from 'react-router-dom';
import './style.scss';
import { buildMyProfilePath, buildUserProfilePath } from '../../routes';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../config/store';

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
