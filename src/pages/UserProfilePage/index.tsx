import React, { useCallback, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getLoggedInUsersFollowed } from '../../api/me-followed';
import { UserResponseDto } from '../../api/shared-dtos';
import { useFetchProfileInformation } from '../../profile/useFetchProfileInformation';
import UserProfile from '../../profile/UserProfile';
import NormalPageLayout from '../../shared/NormalPageLayout';
import PageLoader from '../../shared/PageLoader';

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
