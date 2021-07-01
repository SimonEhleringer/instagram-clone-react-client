import { Route, Router } from 'react-router';
import SuggestionsPage from '.';
import {
  buildGetSuggestionsUrl,
  getSuggestions,
  SuggestionsResponseDto,
} from '../../api/meSuggestions';
import { AxiosResponse } from 'axios';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureStore, StoreType } from '../../config/store';
import { buildAddFollowUrl, UserResponseDto } from '../../api/meFollowed';
import {
  buildSuggestionsPath,
  renderSuggestionsRoute,
  suggestionsPath,
} from '../../routes';
import {
  buildAuthenticationState,
  buildAxiosResponseWithData,
  buildMockedCloudinaryImageSource,
  buildSuggestionsResponseDto,
  buildUserResponseDto,
  renderMockedLoginRoute,
  renderMockedUserProfileRoute,
  renderWithProviders,
} from '../../test-utils';
import resourceApi from '../../config/resourceApi';
import { when } from 'jest-when';
import { initialState } from '../../redux/authentication/slice';
import userEvent from '@testing-library/user-event';

jest.mock('../../config/resourceApi.ts');
const mockedResourceApi = resourceApi as jest.Mocked<typeof resourceApi>;

jest.mock(
  'cloudinary-react',
  () => require('../../test-utils/mock-objects/cloudinary').default
);

let suggestions: SuggestionsResponseDto;
let store: StoreType;

beforeEach(() => {
  suggestions = buildSuggestionsResponseDto();

  when(mockedResourceApi.get)
    .calledWith(buildGetSuggestionsUrl())
    .mockResolvedValue(buildAxiosResponseWithData(suggestions));

  store = configureStore();
  store.getState().authenticationState = buildAuthenticationState();
});

it('should redirect to login page when user is not logged in', () => {
  store.getState().authenticationState = { ...initialState };

  renderWithProviders(
    <>
      {renderSuggestionsRoute()} {renderMockedLoginRoute()}
    </>,
    { route: buildSuggestionsPath(), store }
  );

  expect(screen.getByTestId('login-page')).toBeInTheDocument();
});

it('should load data and show suggestions when no errors occured', async () => {
  renderWithProviders(renderSuggestionsRoute(), {
    route: buildSuggestionsPath(),
    store,
  });

  expect(screen.getByTestId('pageLoader')).toBeInTheDocument();

  const buttons = await screen.findAllByRole('button', { name: 'Abonnieren' });

  expect(buttons.length).toBe(suggestions.suggestions.length);

  suggestions.suggestions.forEach((suggestion) => {
    expect(
      screen.getByAltText(`${suggestion.username}-profile-image`)
    ).toHaveAttribute(
      'src',
      buildMockedCloudinaryImageSource(suggestion.publicProfileImageId!)
    );

    expect(
      screen.getByRole('link', { name: suggestion.username })
    ).toBeInTheDocument();

    expect(screen.getByText(suggestion.fullName)).toBeInTheDocument();
  });
});

it('should subscribe to user and reload suggestions when subscribe button is pressed', async () => {
  renderWithProviders(renderSuggestionsRoute(), {
    route: buildSuggestionsPath(),
    store,
  });

  const buttons = await screen.findAllByRole('button', { name: 'Abonnieren' });

  suggestions.suggestions.forEach((suggestion) => {
    expect(
      screen.getByRole('link', { name: suggestion.username })
    ).toBeInTheDocument();
  });

  const suggestionToSubscribe = suggestions.suggestions[0];

  const newSuggestions = suggestions.suggestions.filter(
    (suggestion) => suggestion !== suggestionToSubscribe
  );

  when(mockedResourceApi.get)
    .calledWith(buildGetSuggestionsUrl())
    .mockResolvedValue(buildAxiosResponseWithData(newSuggestions));

  userEvent.click(buttons[0]);

  await waitFor(() =>
    expect(
      screen.queryByRole('link', { name: suggestionToSubscribe.username })
    ).not.toBeInTheDocument()
  );

  expect(mockedResourceApi.post).toHaveBeenCalledWith(
    buildAddFollowUrl(suggestionToSubscribe.userId)
  );
});

it('should show users profile when link is pressed', async () => {
  renderWithProviders(
    <>
      {renderSuggestionsRoute()} {renderMockedUserProfileRoute()}
    </>,
    {
      route: buildSuggestionsPath(),
      store,
    }
  );

  const suggestionToShowProfile = suggestions.suggestions[0];

  userEvent.click(
    await screen.findByRole('link', { name: suggestionToShowProfile.username })
  );

  expect(screen.getByTestId('user-profile-page')).toBeInTheDocument();
  expect(screen.getByTestId('userId')).toHaveTextContent(
    suggestionToShowProfile.userId
  );
});
