import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

interface AvatarProps {
  publicProfileImageId?: string;
  widthInPx: number;
}

// TODO: Add tests
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
