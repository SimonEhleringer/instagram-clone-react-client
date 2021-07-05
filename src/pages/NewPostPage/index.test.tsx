import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import { buildAddPostUrl } from '../../api/me-post';
import { PostRequestDto } from '../../api/shared-dtos';
import resourceApi from '../../config/resource-api';
import { configureStore, StoreType } from '../../config/store';
import { buildNewPostPath } from '../../routes/path';
import { renderNewPostRoute } from '../../routes/renderers';
import {
  buildAuthenticationState,
  buildAxiosError,
  buildErrorResponseDto,
  buildMockedImage,
  renderMockedIndexRoute,
  renderMockedLoginRoute,
  renderWithProviders,
} from '../../test-utils';
import faker from 'faker';
import { initialState } from '../../redux/authentication/slice';

jest.mock('../../config/resource-api.ts');
const mockedResourceApi = resourceApi as jest.Mocked<typeof resourceApi>;

let store: StoreType;

beforeEach(() => {
  store = configureStore();
  store.getState().authenticationState = buildAuthenticationState();
});

it('should show image preview when route was given the data uri', () => {
  const { imageDataUri } = buildMockedImage();

  renderWithProviders(renderNewPostRoute(), {
    route: buildNewPostPath({ selectedImageDataUri: imageDataUri }),
    store,
  });

  expect(screen.getByAltText('selectedImagePreview')).toHaveAttribute(
    'src',
    imageDataUri
  );
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
