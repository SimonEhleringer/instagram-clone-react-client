import { AxiosResponse } from 'axios';
import { getSuggestions, SuggestionsResponseDto } from './meSuggestions';
import resourceApi from '../config/resourceApi';

jest.mock('../config/resourceApi.ts');
const resourceApiMock = resourceApi as jest.Mocked<typeof resourceApi>;

describe('getSuggestions', () => {
  it('should call API and return response', async () => {
    const expectedResponse: AxiosResponse<SuggestionsResponseDto> = {
      config: {},
      data: {
        suggestions: [
          {
            fullName: 'fullName',
            userId: 'userId',
            username: 'username',
            publicProfileImageId: 'publicProfileImageId',
          },
        ],
      },
      headers: [],
      status: 1,
      statusText: '',
    };

    resourceApiMock.get.mockResolvedValueOnce(expectedResponse);

    const actualResponse = await getSuggestions();

    expect(actualResponse).toBe(expectedResponse);
  });
});
