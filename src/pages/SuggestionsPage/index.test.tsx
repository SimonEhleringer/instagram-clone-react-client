import { Route, Router } from "react-router";
import SuggestionsPage from ".";
import {
  getSuggestions,
  SuggestionsResponseDto,
} from "../../api/meSuggestions";
import { AxiosResponse } from "axios";
import { Provider } from "react-redux";
import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { configureStore } from "../../config/store";
import { UserResponseDto } from "../../api/meFollowed";

jest.mock("../../api/meSuggestions.ts");
jest.mock("../../shared/Avatar", () => () => <div />);

const getSuggestionsMock = getSuggestions as jest.MockedFunction<
  typeof getSuggestions
>;

const initialRoute = "/suggestions";

it("should show loading animation on startup when no suggestions are present", () => {
  const suggestionsResponse: AxiosResponse<SuggestionsResponseDto> = {
    config: {},
    data: { suggestions: [] },
    headers: [],
    status: 1,
    statusText: "",
  };

  getSuggestionsMock.mockResolvedValueOnce(suggestionsResponse);

  const { getByTestId } = render(
    <Provider store={configureStore()}>
      <Router history={createMemoryHistory({ initialEntries: [initialRoute] })}>
        <Route path={initialRoute} component={SuggestionsPage} />
      </Router>
    </Provider>
  );

  const loaderEl = getByTestId("loader");

  expect(loaderEl).toBeInTheDocument();
});

it("should show loading animation on startup when some suggestions are present", async () => {
  const store = configureStore();

  const fullName = "fullName";
  const username = "username";

  store.getState().suggestionsState = {
    isLoading: false,
    suggestions: [
      {
        userId: "userId",
        fullName,
        username,
        publicProfileImageId: "publicProfileImageId",
      },
      {
        userId: "userId2",
        fullName: "fullName2",
        username: "username2",
        publicProfileImageId: "publicProfileImageId2",
      },
    ],
  };

  const suggestionsResponse: AxiosResponse<SuggestionsResponseDto> = {
    config: {},
    data: {
      suggestions: [
        {
          fullName: "fullName3",
          userId: "userId3",
          username: "username3",
          publicProfileImageId: "publicProfileImageId3",
        },
      ],
    },
    headers: [],
    status: 1,
    statusText: "",
  };

  getSuggestionsMock.mockResolvedValueOnce(suggestionsResponse);

  const { getByTestId, queryByText } = render(
    <Provider store={store}>
      <Router history={createMemoryHistory({ initialEntries: [initialRoute] })}>
        <Route path={initialRoute} component={SuggestionsPage} />
      </Router>
    </Provider>
  );

  const loaderEl = getByTestId("loader");

  expect(loaderEl).toBeInTheDocument();
  expect(queryByText(fullName)).not.toBeInTheDocument();
  expect(queryByText(username)).not.toBeInTheDocument();
});

it("should show suggestions when suggestions are loaded", async () => {
  const firstSuggestion: UserResponseDto = {
    fullName: "firstFullName",
    userId: "firstUserId",
    username: "firstUserName",
    publicProfileImageId: "firstPublicProfileImageId",
  };

  const secondSuggestion: UserResponseDto = {
    fullName: "secondFullName",
    userId: "secondUserId",
    username: "secondUsername",
    publicProfileImageId: "secondPublicProfileImageid",
  };

  const suggestionsResponse: AxiosResponse<SuggestionsResponseDto> = {
    config: {},
    data: {
      suggestions: [firstSuggestion, secondSuggestion],
    },
    headers: [],
    status: 1,
    statusText: "",
  };

  getSuggestionsMock.mockResolvedValueOnce(suggestionsResponse);

  const { getByText, queryByTestId } = render(
    <Provider store={configureStore()}>
      <Router history={createMemoryHistory({ initialEntries: [initialRoute] })}>
        <Route path={initialRoute} component={SuggestionsPage} />
      </Router>
    </Provider>
  );

  await waitFor(() =>
    expect(getByText(firstSuggestion.fullName)).toBeInTheDocument()
  );
  expect(getByText(firstSuggestion.username)).toBeInTheDocument();
  expect(getByText(secondSuggestion.fullName)).toBeInTheDocument();
  expect(getByText(secondSuggestion.username)).toBeInTheDocument();

  expect(queryByTestId("loader")).not.toBeInTheDocument();
});
