import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import LazyLoad from 'react-lazyload';
import ImagePlaceholder, { ImagePlaceholderShape } from '../ImagePlaceholder';

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
    <ImagePlaceholder
      shape={ImagePlaceholderShape.circle}
      widthInPx={widthInPx}
      render={(onLoad) => (
        <LazyLoad offset={300}>
          <Image
            publicId={
              publicProfileImageId
                ? publicProfileImageId
                : 'instagram-clone/static/blank-profile-image'
            }
            alt={`${username}-profile-image`}
            format='jpg'
            onLoad={onLoad}
            style={{ borderRadius: '50%' }}
          >
            <Transformation
              aspectRatio='1:1'
              crop='lfill'
              width={widthInPx}
              quality='80'
            />
          </Image>
        </LazyLoad>
      )}
    />
  );
};

export default Avatar;
