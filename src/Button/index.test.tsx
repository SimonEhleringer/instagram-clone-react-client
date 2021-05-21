import { render } from '@testing-library/react';
import Button from '.';

it('should render text in button', () => {
  const buttonText = 'buttonText';

  const { getByTestId } = render(
    <Button testId='button' htmlInputProps={{}}>
      {buttonText}
    </Button>
  );

  const buttonEl = getByTestId('button');

  expect(buttonEl.textContent).toBe(buttonText);
});
