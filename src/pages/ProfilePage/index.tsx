import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UserResponseDto } from '../../api/meFollowed';
import { PostResponseDto } from '../../api/sharedDtos';
import { getUser } from '../../api/user';
import { getUsersPosts } from '../../api/userPost';
import AppLayout from '../../shared/AppLayout';
import Avatar from '../../shared/Avatar';
import './style.scss';
import { Image, Transformation } from 'cloudinary-react';
import { BsGrid3X3 } from 'react-icons/bs';
import Loader from '../../shared/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../config/store';
import Button, { ButtonType } from '../../shared/Button';
import { requestLogout } from '../../api/authentication';
import { initialState, setState } from '../../redux/authentication/slice';

interface ProfileRouteParams {
  userId: string;
}

// TODO: Add tests
const ProfilePage: React.FC<RouteComponentProps<ProfileRouteParams>> = ({
  match,
}) => {
  const dispatch = useDispatch();

  const { refreshToken, loggedInUserId } = useSelector(
    (state: ReduxState) => state.authenticationState
  );

  if (!loggedInUserId) {
    throw new Error('User is not logged in.');
  }

  const [user, setUser] = useState<UserResponseDto | undefined>(undefined);
  const [posts, setPosts] = useState<PostResponseDto[] | undefined>(undefined);
  const [isLogoutButtonLoading, setIsLogoutButtonLoading] = useState(false);

  const isLoggedInUsersProfile = loggedInUserId === user?.userId;

  useEffect(() => {
    getUser(match.params.userId).then((value) => setUser(value.data));
    getUsersPosts(match.params.userId).then((value) =>
      setPosts(value.data.posts)
    );
  }, [match.params.userId]);

  const handleLogoutButtonClick = async () => {
    setIsLogoutButtonLoading(true);

    await requestLogout({ refreshToken });

    dispatch(setState(initialState));

    setIsLogoutButtonLoading(false);
  };

  return (
    <AppLayout>
      {!user || !posts ? (
        <Loader />
      ) : (
        <div className='profile-page'>
          <div className='profile-page__content-wrapper'>
            <div className='profile-page__profile-information'>
              <div className='profile-page__profile-image'>
                <Avatar
                  widthInPx={150}
                  publicProfileImageId={user.publicProfileImageId}
                />
              </div>

              <div className='profile-page__profile-details'>
                <div className='profile-page__username-detail'>
                  <h2 className='profile-page__username'>{user.username}</h2>

                  {isLoggedInUsersProfile ? (
                    <Button
                      loading={isLogoutButtonLoading}
                      type={ButtonType.SecondaryContained}
                      htmlInputProps={{
                        onClick: handleLogoutButtonClick,
                      }}
                    >
                      Abmelden
                    </Button>
                  ) : (
                    <div>test2</div>
                  )}
                </div>

                <div className='profile-page__posts-and-followers-detail'>
                  posts blablabal
                </div>

                <h1 className='profile-page__full-name'>{user.fullName}</h1>
              </div>
            </div>

            <div className='profile-page__separator'>
              <div className='profile-page__separator-text'>
                <BsGrid3X3 size={12} />
                <span className='profile-page__separator-text-span'>
                  BEITRÄGE
                </span>
              </div>
            </div>

            <div className='profile-page__posts'>
              {posts.map((post) => (
                <div className='profile-page__post'>
                  <Image publicId={post.publicImageId}>
                    <Transformation
                      aspectRatio='1:1'
                      crop='lfill'
                      width={300}
                    />
                  </Image>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default ProfilePage;
