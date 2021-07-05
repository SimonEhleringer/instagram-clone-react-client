import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageLoader from '../../shared/PageLoader';
import { ReduxState } from '../../config/store';
import { useSelector } from 'react-redux';
import MyProfile from '../../profile/MyProfile';
import { useFetchProfileInformation } from '../../profile/useFetchProfileInformation';
import NormalPageLayout from '../../shared/NormalPageLayout';

// TODO: Add tests
// TODO: Add errors -> Errors to loader
const MyProfilePage: React.FC = () => {
  const { loggedInUserId } = useSelector(
    (state: ReduxState) => state.authenticationState
  );

  const { user, posts, followers, followed, reloadProfileInformation } =
    useFetchProfileInformation(loggedInUserId!);

  return (
    <>
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
    </>
  );
};

export default MyProfilePage;
