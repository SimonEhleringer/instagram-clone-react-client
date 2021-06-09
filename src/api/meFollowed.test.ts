import resourceApi from '../config/resourceApi';
import { addFollow } from './meFollowed';

jest.mock('../config/resourceApi.ts');
const mockedResourceApi = resourceApi as jest.Mocked<typeof resourceApi>;

describe('addFollow', () => {
  it('should call api and return response', async () => {
    var followedId = 'followedId';

    const expected = {};

    mockedResourceApi.post.mockResolvedValueOnce(expected);

    const actual = await addFollow(followedId);

    expect(mockedResourceApi.post).toHaveBeenLastCalledWith(
      `me/followed/${followedId}`
    );
    expect(actual).toBe(expected);
  });
});
