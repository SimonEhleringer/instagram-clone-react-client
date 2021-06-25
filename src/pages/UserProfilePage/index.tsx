import React, { useEffect } from 'react';
import { useCallback } from 'react';
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
import NormalPageLayout from '../../shared/NormalPageLayout';

export interface UserProfilePageParams {
  userId: string;
}

const UserProfilePage: React.FC<RouteComponentProps<UserProfilePageParams>> = ({
  match,
}) => {
  const { user, posts, followers, followed, reloadProfileInformation } =
    useFetchProfileInformation(match.params.userId);

  const [loggedInUsersFollowed, setLoggedInUsersFollowed] = useState<
    UserResponseDto[] | undefined
  >(undefined);

  const loadLoggedInUsersFollowed = useCallback(() => {
    getLoggedInUsersFollowed().then((val) =>
      setLoggedInUsersFollowed(val.data.followed)
    );
  }, []);

  const reloadUserInformation = () => {
    reloadProfileInformation();

    loadLoggedInUsersFollowed();
  };

  useEffect(() => {
    loadLoggedInUsersFollowed();
  }, [loadLoggedInUsersFollowed]);

  return (
    <AppLayout>
      {!user || !posts || !followers || !followed || !loggedInUsersFollowed ? (
        <Loader />
      ) : (
        <NormalPageLayout>
          <UserProfile
            user={user}
            posts={posts}
            followers={followers}
            followed={followed}
            loggedInUsersFollowed={loggedInUsersFollowed}
            reloadUserInformation={reloadUserInformation}
          />
        </NormalPageLayout>
      )}
    </AppLayout>
  );
};

export default UserProfilePage;
