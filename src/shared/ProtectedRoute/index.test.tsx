import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { Router } from "react-router";
import ProtectedRoute from ".";
import { configureStore } from "../../config/store";
import { initialState } from "../../redux/authentication/slice";

it("should redirect to login route when user is not logged in", () => {
  const store = configureStore();
  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <Router history={history}>
        <ProtectedRoute path="/" component={componentToRender} />
      </Router>
    </Provider>
  );

  expect(history.location.pathname).toBe("/login");
});

it("should show component when user is logged in and component prop is given", () => {
  const store = configureStore();
  const history = createMemoryHistory();

  const state = { ...initialState };
  state.loggedInUserId = "loggedInUserId";

  store.getState().authenticationState = state;

  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <ProtectedRoute path="/" component={componentToRender} />
      </Router>
    </Provider>
  );

  const renderedEl = getByTestId("componentToRender");

  expect(history.location.pathname).toBe("/");
  expect(renderedEl).toBeInTheDocument();
});

it("should show children when user is logged in and children are given", () => {
  const store = configureStore();
  const history = createMemoryHistory();

  const state = { ...initialState };
  state.loggedInUserId = "loggedInUserId";

  store.getState().authenticationState = state;

  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <ProtectedRoute path="/">{componentToRender}</ProtectedRoute>
      </Router>
    </Provider>
  );

  const renderedEl = getByTestId("componentToRender");

  expect(history.location.pathname).toBe("/");
  expect(renderedEl).toBeInTheDocument();
});

const componentToRender = () => <div data-testid="componentToRender"></div>;
