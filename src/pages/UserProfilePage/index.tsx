import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import {
  RouteComponentProps,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import {
  getLoggedInUsersFollowed,
  UserResponseDto,
} from '../../api/meFollowed';
import { useFetchProfileInformation } from '../../profile/useFetchProfileInformation';
import UserProfile from '../../profile/UserProfile';
import PageLoader from '../../shared/PageLoader';
import NormalPageLayout from '../../shared/NormalPageLayout';

export interface UserProfilePageParams {
  userId: string;
}

const UserProfilePage: React.FC = () => {
  const match = useRouteMatch<UserProfilePageParams>();

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
    <>
      {!user || !posts || !followers || !followed || !loggedInUsersFollowed ? (
        <PageLoader />
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
    </>
  );
};

export default UserProfilePage;
