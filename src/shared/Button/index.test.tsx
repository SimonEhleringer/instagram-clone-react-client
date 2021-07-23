import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import Button from '.';

it('should render only text in button when not loading', () => {
  const buttonText = faker.lorem.word();

  render(<Button loaderDataTestId='button-loader'>{buttonText}</Button>);

  expect(screen.getByRole('button', { name: buttonText }).textContent).toBe(
    buttonText
  );
  expect(screen.queryByTestId('button-loader')).not.toBeInTheDocument();
});

it('should render loader in button when loading', () => {
  render(<Button loaderDataTestId='button-loader' isLoading={true}></Button>);

  expect(screen.getByTestId('button-loader')).toBeInTheDocument();
});

it('should not invoke click handler when loading', () => {
  const handleClick = jest.fn();

  render(<Button onClick={handleClick} isLoading={true} />);

  userEvent.click(screen.getByRole('button'));

  expect(handleClick).not.toBeCalled();
});
