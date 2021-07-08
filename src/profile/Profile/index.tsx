import React from 'react';
import { PostResponseDto, UserResponseDto } from '../../api/shared-dtos';
import ProfileInformation from '../ProfileInformation';
import ProfilePosts from '../ProfilePosts';

export interface ProfileProps {
  user: UserResponseDto;
  posts: PostResponseDto[];
  followers: UserResponseDto[];
  followed: UserResponseDto[];
  renderAvatar: (avatar: JSX.Element) => JSX.Element;
  renderButton: () => JSX.Element;
}

const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <>
      <ProfileInformation {...props} />
      <ProfilePosts posts={props.posts} />
    </>
  );
};

export default Profile;
