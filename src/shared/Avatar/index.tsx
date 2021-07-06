import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

export interface AvatarProps {
  publicProfileImageId?: string;
  widthInPx: number;
  username: string;
}

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
      format='webp'
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
