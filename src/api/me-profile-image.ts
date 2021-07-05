import resourceApi from '../config/resource-api';
import { UserResponseDto } from './shared-dtos';

export const changeProfileImage = (request: ProfileImageRequestDto) => {
  return resourceApi.post<UserResponseDto>(
    buildChangeProfileImageUrl(),
    request
  );
};

export const buildChangeProfileImageUrl = () => 'me/profile-image';

export interface ProfileImageRequestDto {
  imageDataUri: string;
}
