import { buildMockedCloudinaryImageSource } from '../builders';

const cloudinaryMockObj = {
  Image: (props: any) => (
    <img
      alt={props.alt}
      src={buildMockedCloudinaryImageSource(props.publicId)}
    />
  ),
  Transformation: () => null,
};

export default cloudinaryMockObj;
