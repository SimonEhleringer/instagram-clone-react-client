import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AppLayout from '../../shared/AppLayout';

import PageLoader from '../../shared/PageLoader';
import { ReduxState } from '../../config/store';
import { useSelector } from 'react-redux';
import MyProfile from '../../profile/MyProfile';
import { useFetchProfileInformation } from '../../profile/useFetchProfileInformation';
import NormalPageLayout from '../../shared/NormalPageLayout';

// TODO: Add tests
// TODO: Add errors -> Errors to loader
const MyProfilePage: React.FC<RouteComponentProps> = () => {
  const { loggedInUserId } = useSelector(
    (state: ReduxState) => state.authenticationState
  );

  const { user, posts, followers, followed, reloadProfileInformation } =
    useFetchProfileInformation(loggedInUserId!);

  return (
    <AppLayout>
      {!user || !posts || !followers || !followed ? (
        <PageLoader />
      ) : (
        <NormalPageLayout>
          <MyProfile
            user={user}
            posts={posts}
            followers={followers}
            followed={followed}
            reloadProfileInformation={reloadProfileInformation}
          />
        </NormalPageLayout>
      )}
    </AppLayout>
  );
};

export default MyProfilePage;
