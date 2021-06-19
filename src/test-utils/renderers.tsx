import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '../config/store';
import { MemoryRouter } from 'react-router';

export const renderWithProviders = (
  ui: JSX.Element,
  { store = configureStore(), route = '/' }
) => {
  const renderResult = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );

  return {
    ...renderResult,
    store,
  };
};
