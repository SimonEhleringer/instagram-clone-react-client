import { queryByTestId, render } from '@testing-library/react';
import Loader from '.';

it('should render loader when loading is true', () => {
  const { getByTestId, container } = render(
    <Loader loading={true}>
      <div data-testid='loaderChildren' />
    </Loader>
  );

  const loaderEl = getByTestId('loader');
  const loaderChildrenEl = queryByTestId(container, 'loaderChildren');

  expect(loaderEl).toBeInTheDocument();
  expect(loaderChildrenEl).not.toBeInTheDocument();
});

it('should render children when loading is false', () => {
  const { getByTestId, container } = render(
    <Loader loading={false}>
      <div data-testid='loaderChildren' />
    </Loader>
  );

  const loaderEl = queryByTestId(container, 'loader');
  const loaderChildrenEl = getByTestId('loaderChildren');

  expect(loaderEl).not.toBeInTheDocument();
  expect(loaderChildrenEl).toBeInTheDocument();
});

it('should render loader when loading is undefined', () => {
  const { getByTestId, container } = render(
    <Loader>
      <div data-testid='loaderChildren' />
    </Loader>
  );

  const loaderEl = getByTestId('loader');
  const loaderChildrenEl = queryByTestId(container, 'loaderChildren');

  expect(loaderEl).toBeInTheDocument();
  expect(loaderChildrenEl).not.toBeInTheDocument();
});
