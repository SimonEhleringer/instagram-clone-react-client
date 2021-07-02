import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, StoreType } from "../config/store";
import { MemoryRouter } from "react-router";
import { buildIndexPath } from "../routes";

export const renderWithProviders = (
  ui: JSX.Element,
  {
    store = configureStore(),
    route = buildIndexPath(),
  }: { store?: StoreType; route?: string | { pathname: string } }
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
