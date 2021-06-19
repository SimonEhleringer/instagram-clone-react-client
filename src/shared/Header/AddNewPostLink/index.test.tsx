import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router, Route, BrowserRouter } from 'react-router-dom';
import AddNewPostLink from '.';
import { configureStore } from '../../../config/store';
import NewPostForm from '../../../newPost/NewPostForm';
import { newPostPath } from '../../../routes';

it('should open file inputs dialog when button is pressed', () => {
  const { getByRole, getByTestId } = render(
    <Provider store={configureStore()}>
      <Router history={createMemoryHistory()}>
        <AddNewPostLink />
      </Router>
    </Provider>
  );

  const fileInputClick = jest.spyOn(getByTestId('fileInput'), 'click');

  userEvent.click(getByRole('button'));

  expect(fileInputClick).toHaveBeenCalled();
});

it('should load file, redirect to new post page and show image preview when file is given', async () => {
  const imageBlob = 'imageDataUri';
  const image = new File([imageBlob], 'image.png', { type: 'image/png' });
  const imageDataUri = 'data:image/png;base64,aW1hZ2VEYXRhVXJp';

  const store = configureStore();

  const { getByTestId, getByAltText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <AddNewPostLink />
        <Route path={newPostPath} component={NewPostForm} />
      </BrowserRouter>
    </Provider>
  );

  fireEvent.change(getByTestId('fileInput'), {
    target: {
      files: [image],
    },
  });

  await waitFor(() =>
    expect(getByAltText('selectedImagePreview')).toHaveAttribute(
      'src',
      imageDataUri
    )
  );
});
