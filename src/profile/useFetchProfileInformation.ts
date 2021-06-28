import { useCallback, useEffect, useState } from 'react';
import { UserResponseDto } from '../api/meFollowed';
import { PostResponseDto } from '../api/sharedDtos';
import { getUser } from '../api/user';
import { getUsersFollowed } from '../api/userFollowed';
import { getUsersFollowers } from '../api/userFollowers';
import { getUsersPosts } from '../api/userPost';

export const useFetchProfileInformation = (userId: string) => {
  const [user, setUser] = useState<UserResponseDto | undefined>(undefined);
  const [posts, setPosts] = useState<PostResponseDto[] | undefined>(undefined);
  const [followed, setFollowed] = useState<UserResponseDto[] | undefined>(
    undefined
  );
  const [followers, setFollowers] = useState<UserResponseDto[] | undefined>(
    undefined
  );

  const reloadProfileInformation = useCallback(() => {
    getUser(userId).then((value) => setUser(value.data));
    getUsersPosts(userId).then((value) => setPosts(value.data.posts));
    getUsersFollowers(userId).then((value) =>
      setFollowers(value.data.followers)
    );
    getUsersFollowed(userId).then((value) => setFollowed(value.data.followed));
  }, [userId]);

  useEffect(() => {
    reloadProfileInformation();
  }, [reloadProfileInformation]);

  return {
    user,
    posts,
    followed,
    followers,
    reloadProfileInformation,
  };
};
