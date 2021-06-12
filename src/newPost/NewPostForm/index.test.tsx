import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AxiosResponse, AxiosError } from 'axios';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import NewPostForm from '.';
import { addPost } from '../../api/mePost';
import { PostRequestDto, PostResponseDto } from '../../api/sharedDtos';
import { configureStore } from '../../config/store';
import { ErrorResponse } from '../../shared/error';

jest.mock('../../api/mePost.ts');
const addPostMock = addPost as jest.MockedFunction<typeof addPost>;

it('should call API and redirect to index page when submit button was pressed and API call was successful', async () => {
  const history = createMemoryHistory({ initialEntries: ['/test-route'] });

  const selectedImageDataUri = 'selectedImageDataUri';

  const store = configureStore();
  store.getState().newPostState = {
    selectedImageDataUri,
  };

  const { getByText, getByRole, getByTestId, queryByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route path='/test-route' component={NewPostForm} />
      </Router>
    </Provider>
  );

  const caption = 'caption';

  const submitButtonEl = getByText('Teilen');
  const captionTextareaEl = getByRole('textbox');

  const response: AxiosResponse<PostResponseDto> = {
    config: {},
    data: {
      postId: 1,
      publicImageId: 'publicImageId',
      text: 'text',
      creationTime: new Date(2000, 1, 1, 1, 1),
    },
    headers: [],
    status: 1,
    statusText: '',
  };

  addPostMock.mockResolvedValueOnce(response);

  userEvent.type(captionTextareaEl, caption);

  userEvent.click(submitButtonEl);

  const expectedRequest: PostRequestDto = {
    imageDataUri: selectedImageDataUri,
    text: caption,
  };

  await waitFor(() =>
    expect(getByTestId('submitButtonsLoader')).toBeInTheDocument()
  );
  expect(addPostMock).toHaveBeenCalledWith(expectedRequest);
  expect(queryByTestId('newPostForm')).not.toBeInTheDocument();
  expect(queryByTestId('submitButtonsLoader')).not.toBeInTheDocument();
});

it('should show errors when submit button was clicked and API returned and error', async () => {
  const store = configureStore();
  const history = createMemoryHistory({ initialEntries: ['/test-route'] });

  const { getByText, getByTestId, queryByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route path='/test-route' component={NewPostForm} />
      </Router>
    </Provider>
  );

  const firstError = 'firstError';
  const secondError = 'secondError';

  const error: AxiosError<ErrorResponse> = {
    config: {},
    isAxiosError: true,
    message: '',
    name: '',
    toJSON: () => {
      return {};
    },
    response: {
      config: {},
      headers: [],
      status: 1,
      statusText: '',
      data: { errors: [firstError, secondError] },
    },
  };

  addPostMock.mockRejectedValueOnce(error);

  const submitButtonEl = getByText('Teilen');

  userEvent.click(submitButtonEl);

  await waitFor(() =>
    expect(getByTestId('submitButtonsLoader')).toBeInTheDocument()
  );
  expect(getByText(firstError)).toBeInTheDocument();
  expect(getByText(secondError)).toBeInTheDocument();
  await waitFor(() =>
    expect(queryByTestId('submitButtonsLoader')).not.toBeInTheDocument()
  );

  expect(queryByTestId('newPostForm')).toBeInTheDocument();
});
