import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import { buildGetMeUrl } from '../../api/me';
import { buildGetFeedUrl, FeedResponseDto } from '../../api/me-feed';
import { buildAddFollowUrl } from '../../api/me-followed';
import {
  buildGetSuggestionsUrl,
  SuggestionsResponseDto,
} from '../../api/me-suggestions';
import { UserResponseDto } from '../../api/shared-dtos';
import resourceApi from '../../config/resource-api';
import { configureStore, StoreType } from '../../config/store';
import { initialState } from '../../redux/authentication/slice';
import { buildIndexPath } from '../../routes/path';
import { renderIndexRoute } from '../../routes/renderers';
import { getDisplayTimeDiffFromNowString } from '../../shared/time';
import {
  buildAuthenticationState,
  buildAxiosResponseWithData,
  buildAxiosResponseWithoutData,
  buildFeedResponseDto,
  buildSuggestionsResponseDto,
  buildUserResponseDto,
  renderMockedLoginRoute,
  renderMockedMyProfileRoute,
  renderMockedSuggestionsRoute,
  renderMockedUserProfileRoute,
  renderWithProviders,
} from '../../test-utils';

jest.mock('../../config/resource-api.ts');
const mockedResourceApi = resourceApi as jest.Mocked<typeof resourceApi>;

jest.mock('../../config/authentication-api.ts');

jest.mock(
  'cloudinary-react',
  () => require('../../test-utils/mock-objects/cloudinary').default
);

let loggedInUser: UserResponseDto;
let feed: FeedResponseDto;
let suggestions: SuggestionsResponseDto;
let store: StoreType;

beforeEach(() => {
  loggedInUser = buildUserResponseDto();
  feed = buildFeedResponseDto({}, 3);
  suggestions = buildSuggestionsResponseDto({}, 6);

  when(mockedResourceApi.get)
    .calledWith(buildGetMeUrl())
    .mockResolvedValue(buildAxiosResponseWithData(loggedInUser))
    .calledWith(buildGetFeedUrl())
    .mockResolvedValue(buildAxiosResponseWithData(feed))
    .calledWith(buildGetSuggestionsUrl())
    .mockResolvedValue(buildAxiosResponseWithData(suggestions));

  store = configureStore();
  store.getState().authenticationState = buildAuthenticationState({
    loggedInUserId: loggedInUser.userId,
  });
});

it('should load data and show page when data is loaded', async () => {
  renderWithProviders(renderIndexRoute(), { route: buildIndexPath(), store });

  expect(screen.getByTestId('page-loader')).toBeInTheDocument();

  await waitFor(() =>
    expect(
      screen.getByRole('link', { name: loggedInUser.username })
    ).toBeInTheDocument()
  );
  expect(screen.getByText(loggedInUser.fullName)).toBeInTheDocument();
  expect(
    screen.getByAltText(`${loggedInUser.username}-profile-image`)
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Abmelden' })).toBeInTheDocument();

  for (let i = 0; i < suggestions.suggestions.length; i++) {
    const suggestion = suggestions.suggestions[i];

    if (i === 5) {
      break;
    }

    expect(
      screen.getByRole('link', { name: suggestion.username })
    ).toBeInTheDocument();
    expect(screen.getByText(suggestion.fullName)).toBeInTheDocument();
    expect(
      screen.getByAltText(`${suggestion.username}-profile-image`)
    ).toBeInTheDocument();
  }
  expect(screen.getAllByRole('button', { name: 'Abonnieren' }).length).toBe(5);

  for (let i = 5; i < suggestions.suggestions.length; i++) {
    const suggestion = suggestions.suggestions[i];

    expect(screen.queryByText(suggestion.fullName)).not.toBeInTheDocument();
  }

  feed.feed.forEach((feedPost) => {
    expect(
      screen.getAllByRole('link', { name: feedPost.creator.username }).length
    ).toBe(2);
    expect(
      screen.getByAltText(`${feedPost.creator.username}-profile-image`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(feedPost.publicImageId)).toBeInTheDocument();
    expect(screen.getByText(feedPost.text)).toBeInTheDocument();
    expect(
      screen.getAllByText(
        'vor ' + getDisplayTimeDiffFromNowString(feedPost.creationTime)
      )[0]
    ).toBeInTheDocument();
  });
});

it('should redirect to suggestions page when no posts are in feed', async () => {
  feed = buildFeedResponseDto({}, 0);

  when(mockedResourceApi.get)
    .calledWith(buildGetFeedUrl())
    .mockResolvedValue(buildAxiosResponseWithData(feed));

  renderWithProviders(
    <>
      {renderIndexRoute()} {renderMockedSuggestionsRoute()}
    </>,
    {
      route: buildIndexPath(),
      store: store,
    }
  );

  expect(await screen.findByTestId('suggestions-page')).toBeInTheDocument();
});

it('should log user out when logout button is pressed', async () => {
  renderWithProviders(
    <>
      {renderIndexRoute()} {renderMockedLoginRoute()}
    </>,
    {
      route: buildIndexPath(),
      store: store,
    }
  );

  userEvent.click(await screen.findByRole('button', { name: 'Abmelden' }));

  expect(await screen.findByTestId('login-page')).toBeInTheDocument();
});

it('should follow user when follow button on sidebar suggestion is pressed', async () => {
  when(mockedResourceApi.post)
    .calledWith(buildAddFollowUrl(expect.anything()))
    .mockResolvedValue(buildAxiosResponseWithoutData());

  renderWithProviders(<>{renderIndexRoute()}</>, {
    route: buildIndexPath(),
    store: store,
  });

  const followButtons = await screen.findAllByRole('button', {
    name: 'Abonnieren',
  });

  const suggestionToFollow = suggestions.suggestions[0];

  const newSuggestions: SuggestionsResponseDto = {
    suggestions: suggestions.suggestions.filter(
      (suggestion) => suggestion !== suggestionToFollow
    ),
  };

  when(mockedResourceApi.get)
    .calledWith(buildGetSuggestionsUrl())
    .mockResolvedValue(buildAxiosResponseWithData(newSuggestions));

  expect(screen.getByText(suggestionToFollow.fullName)).toBeInTheDocument();

  userEvent.click(followButtons[0]);

  expect(
    await waitFor(() => screen.queryByText(suggestionToFollow.fullName))
  ).not.toBeInTheDocument();
});

it('should show logged in users profile when link is clicked', async () => {
  renderWithProviders(
    <>
      {renderIndexRoute()} {renderMockedMyProfileRoute()}
    </>,
    {
      route: buildIndexPath(),
      store: store,
    }
  );

  userEvent.click(
    await screen.findByRole('link', { name: loggedInUser.username })
  );

  expect(screen.getByTestId('my-profile-page')).toBeInTheDocument();
});

it('should show users profile when link in suggestion is clicked', async () => {
  renderWithProviders(
    <>
      {renderIndexRoute()} {renderMockedUserProfileRoute()}
    </>,
    {
      route: buildIndexPath(),
      store: store,
    }
  );

  const suggestionToShowProfile = suggestions.suggestions[0];

  userEvent.click(
    await screen.findByRole('link', { name: suggestionToShowProfile.username })
  );

  expect(screen.getByTestId('user-profile-page')).toBeInTheDocument();
  expect(screen.getByTestId('user-id')).toHaveTextContent(
    suggestionToShowProfile.userId
  );
});

it('should show users profile when link in top of feed post is clicked', async () => {
  renderWithProviders(
    <>
      {renderIndexRoute()} {renderMockedUserProfileRoute()}
    </>,
    {
      route: buildIndexPath(),
      store: store,
    }
  );

  const creatorToShowProfile = feed.feed[0].creator;

  const creatorsLinks = await screen.findAllByRole('link', {
    name: creatorToShowProfile.username,
  });

  userEvent.click(creatorsLinks[0]);

  expect(screen.getByTestId('user-profile-page')).toBeInTheDocument();
  expect(screen.getByTestId('user-id')).toHaveTextContent(
    creatorToShowProfile.userId
  );
});

it('should show users profile when link in caption of feed post is clicked', async () => {
  renderWithProviders(
    <>
      {renderIndexRoute()} {renderMockedUserProfileRoute()}
    </>,
    {
      route: buildIndexPath(),
      store: store,
    }
  );

  const creatorToShowProfile = feed.feed[0].creator;

  const creatorsLinks = await screen.findAllByRole('link', {
    name: creatorToShowProfile.username,
  });

  userEvent.click(creatorsLinks[1]);

  expect(screen.getByTestId('user-profile-page')).toBeInTheDocument();
  expect(screen.getByTestId('user-id')).toHaveTextContent(
    creatorToShowProfile.userId
  );
});

it('should show suggestions page when button to show all suggestions is pressed', async () => {
  renderWithProviders(
    <>
      {renderIndexRoute()} {renderMockedSuggestionsRoute()}
    </>,
    {
      route: buildIndexPath(),
      store: store,
    }
  );

  userEvent.click(await screen.findByRole('link', { name: 'Alle ansehen' }));

  expect(screen.getByTestId('suggestions-page')).toBeInTheDocument();
});
