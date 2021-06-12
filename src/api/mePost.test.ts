import resourceApi from '../config/resourceApi';
import { addPost } from './mePost';
import { PostRequestDto, PostResponseDto } from './sharedDtos';
import { AxiosResponse } from 'axios';

jest.mock('../config/resourceApi.ts');
const resourceApiMock = resourceApi as jest.Mocked<typeof resourceApi>;

describe('addPost', () => {
  it('should call api and return response', async () => {
    const expectedResponse: AxiosResponse<PostResponseDto> = {
      config: {},
      data: {
        postId: 1,
        creationTime: new Date(2000, 1, 1, 1, 1, 1),
        publicImageId: 'publicImageId',
        text: 'text',
      },
      headers: [],
      status: 1,
      statusText: '',
    };

    resourceApiMock.post.mockResolvedValueOnce(expectedResponse);

    const request: PostRequestDto = {
      imageDataUri: 'imageDataUri',
      text: 'text',
    };

    const actualResponse = await addPost(request);

    expect(actualResponse).toBe(expectedResponse);
    expect(resourceApiMock.post).toHaveBeenCalledWith('/me/posts', request);
  });
});
