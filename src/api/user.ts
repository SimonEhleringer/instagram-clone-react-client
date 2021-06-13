import resourceApi from '../config/resourceApi';
import { UserResponseDto } from './meFollowed';
//TODO: Add tests
export const getUser = async (userId: string) => {
  return await resourceApi.get<UserResponseDto>(`/users/${userId}`);
};
