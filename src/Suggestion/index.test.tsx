import { waitFor } from '@testing-library/react';
import Suggestion from '.';
import { addFollow, UserResponseDto } from '../common/api';
import userEvent from '@testing-library/user-event';
import { getSuggestions, SuggestionsResponseDto } from '../apiRequests';
import { renderWithReduxProviderAndRouter } from '../testUtils';
import { loadSuggestions, SuggestionsState } from '../slice';
import { AxiosResponse } from 'axios';

jest.mock('../common/api.ts');

const addFollowMock = addFollow as jest.MockedFunction<typeof addFollow>;

jest.mock('../apiRequests.ts');
const getSuggestionsMock = getSuggestions as jest.MockedFunction<
  typeof getSuggestions
>;

jest.mock('../Avatar', () => () => <div />);

it('should add follow and reload suggestions when subscribe button is pressed', async () => {
  const userId = 'userId';

  const suggestion: UserResponseDto = {
    fullName: 'fullName',
    userId,
    username: 'username',
    publicProfileImageId: 'publicProfileImageId',
  };

  const suggestionsResponse: AxiosResponse<SuggestionsResponseDto> = {
    config: {},
    data: { suggestions: [] },
    headers: [],
    status: 1,
    statusText: '',
  };

  getSuggestionsMock.mockResolvedValueOnce(suggestionsResponse);

  const initialState: SuggestionsState = {
    isLoading: false,
    suggestions: [],
  };

  const { getByText, storeMock } = renderWithReduxProviderAndRouter(
    <Suggestion suggestion={suggestion} />,
    { initialState }
  );

  userEvent.click(getByText('Abonnieren'));

  await waitFor(() => expect(addFollowMock).toHaveBeenCalledWith(userId));

  const actions = storeMock.getActions();
  expect(actions.length).toBe(1);
  expect(actions[0]).toEqual(loadSuggestions());
});
