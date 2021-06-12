import { render } from '@testing-library/react';
import Button from '.';

it('should render text in button when not loading', () => {
  const buttonText = 'buttonText';

  const { getByTestId } = render(
    <Button testId='button' htmlInputProps={{}} loading={false}>
      {buttonText}
    </Button>
  );

  const buttonEl = getByTestId('button');

  expect(buttonEl.textContent).toBe(buttonText);
});

it('should render loader in button when loading', () => {
  const { getByTestId } = render(
    <Button
      testId='button'
      loaderTestId='buttonsLoader'
      htmlInputProps={{}}
      loading={true}
    >
      button
    </Button>
  );

  const loaderEl = getByTestId('buttonsLoader');

  expect(loaderEl).toBeInTheDocument();
});
