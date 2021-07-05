import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddNewPostLink from '.';
import { renderWithProviders } from '../../../test-utils';

it('should open file inputs dialog when button is pressed', () => {
  renderWithProviders(<AddNewPostLink />, {});

  const fileInputClick = jest.spyOn(
    screen.getByTestId('hidden-new-post-input'),
    'click'
  );

  userEvent.click(screen.getByRole('button'));

  expect(fileInputClick).toHaveBeenCalled();
});
