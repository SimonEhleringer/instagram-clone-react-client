import App from ".";
import { Routes } from "../routes";
import {
  renderMockedIndexRoute,
  renderMockedLoginRoute,
  renderMockedMyProfileRoute,
  renderMockedNewPostRoute,
  renderMockedRegisterRoute,
  renderMockedSuggestionsRoute,
  renderMockedUserProfileRoute,
  renderWithProviders,
} from "../test-utils";

jest.mock("../routes.tsx", () => {
  return {
    renderIndexRoute: renderMockedIndexRoute,
    renderRegisterRoute: renderMockedRegisterRoute,
    renderLoginRoute: renderMockedLoginRoute,
    renderSuggestionsRoute: renderMockedSuggestionsRoute,
    renderNewPostRoute: renderMockedNewPostRoute,
    renderMyProfileRoute: renderMockedMyProfileRoute,
    renderUserProfileRoute: renderMockedUserProfileRoute,
  };
});

it("render login route when user is not logged in", () => {
  renderWithProviders(<Routes />, {});
});

/*

- render login, when user not logged in
  - test with all protected routes 

- render index route when user is logged in
- render all routes that are accessibly threw header

*/
