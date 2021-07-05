export interface PostRequestDto {
  imageDataUri: string;
  text: string;
}

export interface PostResponseDto {
  postId: number;
  publicImageId: string;
  text: string;
  creationTime: Date;
}

export interface PostsResponseDto {
  posts: PostResponseDto[];
}

export interface UserResponseDto {
  userId: string;
  fullName: string;
  username: string;
  publicProfileImageId?: string;
}

export interface FollowedResponseDto {
  followed: UserResponseDto[];
}
