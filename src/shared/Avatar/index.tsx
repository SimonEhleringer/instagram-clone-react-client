import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

export interface AvatarProps {
  publicProfileImageId?: string;
  widthInPx: number;
}

// TODO: Only fetch needed size
// TODO: Add tests if possible (seems very hard to test that Cloudinary Image component)
// TODO: Maybe add manual mock for automatically mocking Image component from cloudinary?
const Avatar: React.FC<AvatarProps> = ({ publicProfileImageId, widthInPx }) => {
  return (
    <Image
      publicId={
        publicProfileImageId
          ? publicProfileImageId
          : 'instagram-clone/static/blank-profile-image'
      }
      width={`${widthInPx}`}
    >
      <Transformation aspectRatio='1:1' crop='crop' radius='max' />
    </Image>
  );
};

export default Avatar;
