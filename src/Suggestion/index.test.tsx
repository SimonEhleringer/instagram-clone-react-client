import { render, waitFor } from '@testing-library/react';
import Suggestion from '.';
import { addFollow, UserResponseDto } from '../common/api';
import userEvent from '@testing-library/user-event';
import { getSuggestions, SuggestionsResponseDto } from '../apiRequests';
import { AxiosResponse } from 'axios';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { configureStore } from '../config/store';

jest.mock('../common/api.ts');

const addFollowMock = addFollow as jest.MockedFunction<typeof addFollow>;

jest.mock('../apiRequests.ts');
const getSuggestionsMock = getSuggestions as jest.MockedFunction<
  typeof getSuggestions
>;

jest.mock('../Avatar', () => () => <div />);

it('should add follow and reload suggestions when subscribe button is pressed', async () => {
  const store = configureStore();

  const userId = 'userId';

  const suggestion: UserResponseDto = {
    fullName: 'fullName',
    userId,
    username: 'username',
    publicProfileImageId: 'publicProfileImageId',
  };

  store.getState().suggestionsState = {
    isLoading: false,
    suggestions: [suggestion],
  };

  const suggestionsResponse: AxiosResponse<SuggestionsResponseDto> = {
    config: {},
    data: { suggestions: [] },
    headers: [],
    status: 1,
    statusText: '',
  };

  getSuggestionsMock.mockResolvedValueOnce(suggestionsResponse);

  const { getByText } = render(
    <Provider store={store}>
      <Router history={createMemoryHistory()}>
        <Suggestion suggestion={suggestion} />
      </Router>
    </Provider>,
    {}
  );

  userEvent.click(getByText('Abonnieren'));

  await waitFor(() => expect(addFollowMock).toHaveBeenCalledWith(userId));

  expect(store.getState().suggestionsState.suggestions.length).toBe(0);
});
