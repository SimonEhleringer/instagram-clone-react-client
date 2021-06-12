import { render } from '@testing-library/react';
import ResponsiveHeading from '.';

it('should render children', () => {
  const text = 'Some text to render';

  const { getByText } = render(<ResponsiveHeading>{text}</ResponsiveHeading>);

  expect(getByText(text)).toBeInTheDocument();
});
