import React, { useEffect } from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  getLoggedInUsersFollowed,
  UserResponseDto,
} from '../../api/meFollowed';
import { useFetchProfileInformation } from '../../profile/useFetchProfileInformation';
import UserProfile from '../../profile/UserProfile';
import AppLayout from '../../shared/AppLayout';
import Loader from '../../shared/Loader';

interface UserProfilePageParams {
  userId: string;
}

const UserProfilePage: React.FC<RouteComponentProps<UserProfilePageParams>> = ({
  match,
}) => {
  const { user, posts, followers, followed } = useFetchProfileInformation(
    match.params.userId
  );

  const [loggedInUsersFollowed, setLoggedInUsersFollowed] =
    useState<UserResponseDto[] | undefined>(undefined);

  const loadLoggedInUsersFollowed = () => {
    getLoggedInUsersFollowed().then((val) =>
      setLoggedInUsersFollowed(val.data.followed)
    );
  };

  useEffect(() => {
    loadLoggedInUsersFollowed();
  });

  return (
    <AppLayout>
      {!user || !posts || !followers || !followed || !loggedInUsersFollowed ? (
        <Loader />
      ) : (
        // TODO: Make component for layout (is same as in myProfilePage)
        <div className='profile-page'>
          <div className='profile-page__content-wrapper'>
            <UserProfile
              user={user}
              posts={posts}
              followers={followers}
              followed={followed}
              loggedInUsersFollowed={loggedInUsersFollowed}
              loadLoggedInUsersFollowed={loadLoggedInUsersFollowed}
            />
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default UserProfilePage;
