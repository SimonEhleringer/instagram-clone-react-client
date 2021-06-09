import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory, State } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureMockStore, { MockStoreCreator } from 'redux-mock-store';

export const renderWithRouter = (
  ui: React.ReactNode,
  history = createMemoryHistory()
) => {
  const renderedResult = render(<Router history={history}>{ui}</Router>);

  return {
    ...renderedResult,
    history,
  };
};

export const renderWithReduxProvider = <TState extends unknown>(
  ui: React.ReactNode,
  initialState: TState,
  mockStoreFunc = configureMockStore<TState>([])
) => {
  const storeMock = mockStoreFunc(initialState);

  const renderedResult = render(<Provider store={storeMock}>{ui}</Provider>);

  return {
    ...renderedResult,
    storeMock,
  };
};

interface RenderWithReduxProviderAndRouterOptions<TState> {
  initialState: TState;
  history?: MemoryHistory<State>;
  mockStoreFunc?: MockStoreCreator<TState, {}>;
}

export const renderWithReduxProviderAndRouter = <TState extends unknown>(
  ui: React.ReactNode,
  {
    initialState,
    history = createMemoryHistory(),
    mockStoreFunc = configureMockStore<TState>([]),
  }: RenderWithReduxProviderAndRouterOptions<TState>
) => {
  const storeMock = mockStoreFunc(initialState);

  const renderedResult = render(
    <Provider store={storeMock}>
      <Router history={history}>{ui}</Router>
    </Provider>
  );

  return {
    ...renderedResult,
    storeMock,
    history,
  };
};
