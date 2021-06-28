import resourceApi from '../config/resourceApi';
import { UserResponseDto } from './meFollowed';

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
