import { render } from '@testing-library/react';
import Errors from '.';

const testId = 'errors';

it('should render errors when given errors', () => {
  const firstError = 'firstError';
  const secondError = 'secondError';
  const thirdError = 'thirdError';

  const errors = [firstError, secondError, thirdError];

  const { getByTestId } = render(<Errors testId={testId} errors={errors} />);

  const errorsEl = getByTestId(testId);

  expect(errorsEl.childElementCount).toBe(3);
  expect(errorsEl.childNodes[0].textContent).toBe(firstError);
  expect(errorsEl.childNodes[1].textContent).toBe(secondError);
  expect(errorsEl.childNodes[2].textContent).toBe(thirdError);
});

it('should render no errors when given no errors', () => {
  const errors: string[] = [];

  const { getByTestId } = render(<Errors testId={testId} errors={errors} />);

  const errorsEl = getByTestId(testId);

  expect(errorsEl.hasChildNodes()).toBe(false);
});
