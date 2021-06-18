import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

export interface AvatarProps {
  publicProfileImageId?: string;
  widthInPx: number;
  username: string;
}

// TODO: Maybe add manual mock for automatically mocking Image component from cloudinary?
const Avatar: React.FC<AvatarProps> = ({
  publicProfileImageId,
  widthInPx,
  username,
}) => {
  return (
    <Image
      publicId={
        publicProfileImageId
          ? publicProfileImageId
          : 'instagram-clone/static/blank-profile-image'
      }
      alt={`${username}-profile-image`}
    >
      <Transformation
        aspectRatio='1:1'
        crop='lfill'
        radius='max'
        width={widthInPx}
      />
    </Image>
  );
};

export default Avatar;
