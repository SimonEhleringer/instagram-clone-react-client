import resourceApi from '../config/resourceApi';
import { PostRequestDto, PostResponseDto } from './sharedDtos';

export const addPost = async (request: PostRequestDto) => {
  return await resourceApi.post<PostResponseDto>(buildAddPostUrl(), request);
};

export const buildAddPostUrl = () => '/me/posts';
