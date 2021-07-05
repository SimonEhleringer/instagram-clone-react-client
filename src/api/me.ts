import resourceApi from '../config/resource-api';
import { UserResponseDto } from './shared-dtos';

export const getMe = () => {
  return resourceApi.get<UserResponseDto>(buildGetMeUrl());
};

export const buildGetMeUrl = () => '/me';
