import { render, screen, waitFor } from '@testing-library/react';
import { when } from 'jest-when';
import { sortAndDeduplicateDiagnostics } from 'typescript';
import { buildGetMeUrl } from '../../api/me';
import { buildGetFeedUrl } from '../../api/meFeed';
import { buildGetSuggestionsUrl } from '../../api/meSuggestions';
import resourceApi from '../../config/resourceApi';
import { configureStore } from '../../config/store';
import { initialState } from '../../redux/authentication/slice';
import { buildIndexPath, renderIndexRoute } from '../../routes';
import {
  buildAxiosResponseWithData,
  buildFeedResponseDto,
  buildSuggestionsResponseDto,
  buildUserResponseDto,
  renderWithProviders,
} from '../../test-utils';

jest.mock('../../config/resourceApi.ts');
const mockedResourceApi = resourceApi as jest.Mocked<typeof resourceApi>;

jest.mock(
  'cloudinary-react',
  () => require('../../test-utils/mock-objects/cloudinary').default
);

it('should load data and show page when data is loaded', async () => {
  const loggedInUser = buildUserResponseDto();
  const feed = buildFeedResponseDto({}, 3);
  const suggestions = buildSuggestionsResponseDto({}, 6);

  when(mockedResourceApi.get)
    .calledWith(buildGetMeUrl())
    .mockResolvedValue(buildAxiosResponseWithData(loggedInUser))
    .calledWith(buildGetFeedUrl())
    .mockResolvedValue(buildAxiosResponseWithData(feed))
    .calledWith(buildGetSuggestionsUrl())
    .mockResolvedValue(buildAxiosResponseWithData(suggestions));

  const store = configureStore();
  store.getState().authenticationState = {
    ...initialState,
    loggedInUserId: loggedInUser.userId,
  };

  renderWithProviders(renderIndexRoute(), { route: buildIndexPath(), store });

  expect(screen.getByTestId('loader')).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.getByText(loggedInUser.username)).toBeInTheDocument()
  );
  expect(screen.getByText(loggedInUser.fullName)).toBeInTheDocument();
  expect(
    screen.getByAltText(`${loggedInUser.username}-profile-image`)
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Abmelden' })).toBeInTheDocument();
});
