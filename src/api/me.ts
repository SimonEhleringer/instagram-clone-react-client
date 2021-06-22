import resourceApi from '../config/resourceApi';
import { UserResponseDto } from './meFollowed';

export const getMe = () => {
  return resourceApi.get<UserResponseDto>(buildGetMeUrl());
};

export const buildGetMeUrl = () => '/me';
