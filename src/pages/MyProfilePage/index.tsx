import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UserResponseDto } from '../../api/meFollowed';
import { PostResponseDto } from '../../api/sharedDtos';
import { getUser } from '../../api/user';
import { getUsersPosts } from '../../api/userPost';
import AppLayout from '../../shared/AppLayout';

import './style.scss';

import Loader from '../../shared/Loader';
import { getUsersFollowers } from '../../api/userFollowers';
import { getUsersFollowed } from '../../api/userFollowed';
import { ReduxState } from '../../config/store';
import { useSelector } from 'react-redux';
import MyProfile from '../../profile/MyProfile';
import { useFetchProfileInformation } from '../../profile/useFetchProfileInformation';

// TODO: Add tests
const MyProfilePage: React.FC<RouteComponentProps> = () => {
  // const dispatch = useDispatch();

  const { loggedInUserId } = useSelector(
    (state: ReduxState) => state.authenticationState
  );

  const { user, posts, followers, followed } = useFetchProfileInformation(
    loggedInUserId!
  );

  // const [isLogoutButtonLoading, setIsLogoutButtonLoading] = useState(false);
  // const [isFollowButtonLoading, setIsFollowButtonLoading] = useState(false);
  // const [isUnfollowButtonLoading, setIsUnfollowButtonLoading] = useState(false);

  // const isLoggedInUsersProfile = loggedInUserId === user?.userId;

  // const [doesLoggedInUserFollow, setDoesLoggedInUserFollow] = useState(false);

  // useEffect(() => {
  //   if (isLoggedInUsersProfile || !user) {
  //     return;
  //   }

  //   getLoggedInUsersFollowed().then((value) =>
  //     setDoesLoggedInUserFollow(
  //       value.data.followed.filter((val) => val.userId === user?.userId)
  //         .length > 0
  //     )
  //   );
  // }, [isLoggedInUsersProfile, user]);

  // const handleLogoutButtonClick = async () => {
  //   setIsLogoutButtonLoading(true);

  //   await requestLogout({ refreshToken });

  //   dispatch(setState(initialState));

  //   setIsLogoutButtonLoading(false);
  // };

  // const handleFollowButtonClick = async () => {
  //   if (!user) {
  //     return;
  //   }

  //   setIsFollowButtonLoading(true);

  //   await addFollow(user.userId);

  //   const newFollowed = await getUsersFollowed(match.params.userId);
  //   setFollowed(newFollowed.data.followed);

  //   setIsFollowButtonLoading(false);
  // };

  // const handleUnfollowButtonClick = async () => {
  //   if (!user) {
  //     return;
  //   }

  //   setIsUnfollowButtonLoading(true);

  //   await deleteFollow(user.userId);

  //   const newFollowed = await getUsersFollowed(match.params.userId);
  //   setFollowed(newFollowed.data.followed);

  //   setIsUnfollowButtonLoading(false);
  // };

  return (
    <AppLayout>
      {!user || !posts || !followers || !followed ? (
        <Loader />
      ) : (
        <div className='profile-page'>
          <div className='profile-page__content-wrapper'>
            <MyProfile
              user={user}
              posts={posts}
              followers={followers}
              followed={followed}
            />
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default MyProfilePage;
