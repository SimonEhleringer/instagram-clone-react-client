import { render } from '@testing-library/react';
import SlimPageLayout from '.';

it('should render children', () => {
  const { getByTestId } = render(
    <SlimPageLayout>
      <div data-testid='divToRender' />
    </SlimPageLayout>
  );

  expect(getByTestId('divToRender')).toBeInTheDocument();
});
