import { screen } from '@testing-library/react';
import FeedPost from '.';
import {
  buildFeedPostResponseDto,
  renderWithProviders,
} from '../../test-utils';

jest.mock(
  'cloudinary-react',
  () => require('../../test-utils/mock-objects/cloudinary').default
);

it('should not show user profile link and caption when no caption is given', () => {
  const feedPost = buildFeedPostResponseDto({ text: '' });

  renderWithProviders(<FeedPost feedPost={feedPost} />, {});

  // One link is showed at top of feed post -> that one is going to be showed
  expect(
    screen.getAllByRole('link', { name: feedPost.creator.username }).length
  ).toBe(1);
});
