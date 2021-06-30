import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import { buildAddPostUrl } from '../../api/mePost';
import { PostRequestDto } from '../../api/sharedDtos';
import resourceApi from '../../config/resourceApi';
import { configureStore, StoreType } from '../../config/store';
import { buildNewPostPath, renderNewPostRoute } from '../../routes';
import {
  buildAuthenticationState,
  buildAxiosError,
  buildErrorResponseDto,
  buildMockedImage,
  renderMockedIndexRoute,
  renderWithProviders,
} from '../../test-utils';
import faker from 'faker';

jest.mock('../../config/resourceApi.ts');
const mockedResourceApi = resourceApi as jest.Mocked<typeof resourceApi>;

let store: StoreType;

beforeEach(() => {
  store = configureStore();
  store.getState().authenticationState = buildAuthenticationState();
});

it('should upload post and redirect to index page when button was pressed and API call was successful', async () => {
  const { imageDataUri } = buildMockedImage();

  renderWithProviders(
    <>
      {renderNewPostRoute()}
      {renderMockedIndexRoute()}
    </>,
    {
      route: buildNewPostPath({ selectedImageDataUri: imageDataUri }),
      store,
    }
  );

  const caption = faker.lorem.sentence(10);

  userEvent.type(screen.getByRole('textbox'), caption);
  userEvent.click(screen.getByRole('button', { name: 'Teilen' }));

  const expectedRequest: PostRequestDto = {
    imageDataUri,
    text: caption,
  };

  await waitFor(() =>
    expect(screen.queryByTestId('index-page')).toBeInTheDocument()
  );
  expect(mockedResourceApi.post).toHaveBeenCalledWith(
    expect.anything(),
    expectedRequest
  );
});

it('should show errors and not redirect to index page when button was pressed and API call was not successful', async () => {
  const { imageDataUri } = buildMockedImage();

  renderWithProviders(renderNewPostRoute(), {
    store,
    route: buildNewPostPath({ selectedImageDataUri: imageDataUri }),
  });

  const errorResponseDto = buildErrorResponseDto({}, 3);

  const caption = faker.lorem.sentence(10);

  const request: PostRequestDto = {
    imageDataUri,
    text: caption,
  };

  when(mockedResourceApi.post)
    .calledWith(buildAddPostUrl(), request)
    .mockRejectedValue(buildAxiosError(errorResponseDto));

  userEvent.type(screen.getByRole('textbox'), caption);
  userEvent.click(screen.getByRole('button', { name: 'Teilen' }));

  await waitFor(() => {
    errorResponseDto.errors.forEach((error) => {
      expect(screen.queryByText(error)).toBeInTheDocument();
    });
  });
});
