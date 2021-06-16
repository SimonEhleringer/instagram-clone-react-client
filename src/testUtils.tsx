import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureStore } from './config/store';
import { Router } from 'react-router';
import { AxiosResponse } from 'axios';

export const renderWithProviders = (
  ui: JSX.Element,
  {
    store = configureStore(),
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }
) => {
  const renderResult = render(
    <Provider store={store}>
      <Router history={history}>{ui}</Router>
    </Provider>
  );

  return {
    ...renderResult,
    store,
    history,
  };
};

export const getEmptyAxiosResponse = <DtoT extends unknown>(
  responseDto: DtoT
) => {
  const response: AxiosResponse<DtoT> = {
    config: {},
    data: responseDto,
    headers: [],
    status: 1,
    statusText: '',
  };

  return response;
};
