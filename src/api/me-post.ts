import resourceApi from '../config/resource-api';
import { PostRequestDto, PostResponseDto } from './shared-dtos';

export const addPost = async (request: PostRequestDto) => {
  return await resourceApi.post<PostResponseDto>(buildAddPostUrl(), request);
};

export const buildAddPostUrl = () => '/me/posts';
