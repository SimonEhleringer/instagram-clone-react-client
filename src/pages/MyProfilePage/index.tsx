import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AppLayout from '../../shared/AppLayout';

import Loader from '../../shared/Loader';
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

  const { user, posts, followers, followed } = useFetchProfileInformation(
    loggedInUserId!
  );

  return (
    <AppLayout>
      {!user || !posts || !followers || !followed ? (
        <Loader />
      ) : (
        <NormalPageLayout>
          <MyProfile
            user={user}
            posts={posts}
            followers={followers}
            followed={followed}
          />
        </NormalPageLayout>
      )}
    </AppLayout>
  );
};

export default MyProfilePage;
