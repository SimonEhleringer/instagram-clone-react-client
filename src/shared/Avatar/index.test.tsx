import { render, screen } from '@testing-library/react';
import { Image, Transformation } from 'cloudinary-react';
import Avatar from '.';
import faker from 'faker';

jest.mock('cloudinary-react', () => {
  return {
    Image: jest.fn(),
    Transformation: jest.fn(),
  };
});

jest.mock(
  'react-lazyload',
  () => require('../../test-utils/mock-objects/react-lazyload').default
);

it('should render avatar and pass props to cloudinary components', () => {
  const { publicProfileImageId, username, widthInPx } = buildProps();

  mockAvatarAndTransformation();

  render(
    <Avatar
      publicProfileImageId={publicProfileImageId}
      username={username}
      widthInPx={widthInPx}
    />
  );

  expect(screen.getByTestId('avatar')).toBeInTheDocument();

  expect(Image).toHaveBeenCalledWith(
    expect.objectContaining({
      publicId: publicProfileImageId,
      alt: `${username}-profile-image`,
    }),
    {}
  );

  expect(Transformation).toHaveBeenCalledWith(
    expect.objectContaining({
      width: widthInPx,
    }),
    {}
  );
});

it('should use blank profile image id when no image id is passed within props', () => {
  const { username, widthInPx } = buildProps();

  mockAvatarAndTransformation();

  render(<Avatar username={username} widthInPx={widthInPx} />);

  expect(Image).toHaveBeenCalledWith(
    expect.objectContaining({
      publicId: 'instagram-clone/static/blank-profile-image',
    }),
    {}
  );
});

const mockAvatarAndTransformation = () => {
  Image.mockImplementation((props: any) => (
    <div data-testid='avatar'>{props.children}</div>
  ));

  Transformation.mockImplementation(() => <div />);
};

const buildProps = () => {
  return {
    publicProfileImageId: faker.datatype.string(),
    username: faker.internet.userName(),
    widthInPx: faker.datatype.number(100),
  };
};
