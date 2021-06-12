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
