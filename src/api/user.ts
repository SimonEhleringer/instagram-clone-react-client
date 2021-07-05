import resourceApi from '../config/resource-api';
import { UserResponseDto } from './shared-dtos';

export const getUser = async (userId: string) => {
  return await resourceApi.get<UserResponseDto>(buildGetUserUrl(userId));
};

export const buildGetUserUrl = (userId: string) => {
  return `/users/${userId}`;
};
