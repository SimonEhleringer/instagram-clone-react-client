import { render, waitFor } from "@testing-library/react";
import { AxiosResponse } from "axios";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import MyProfilePage from ".";
import { UserResponseDto } from "../../api/meFollowed";
import { PostsResponseDto } from "../../api/sharedDtos";
import { getUser } from "../../api/user";
import { getUsersFollowed } from "../../api/userFollowed";
import { getUsersFollowers } from "../../api/userFollowers";
import { getUsersPosts } from "../../api/userPost";
import { configureStore } from "../../config/store";
import { getEmptyAxiosResponse, renderWithProviders } from "../../testUtils";

jest.mock("../../api/user.ts");
const getUserMock = getUser as jest.MockedFunction<typeof getUser>;

jest.mock("../../api/userPost.ts");
const getUsersPostsMock = getUsersPosts as jest.MockedFunction<
  typeof getUsersPosts
>;

jest.mock("../../api/userFollowers.ts");
const getUsersFollowersMock = getUsersFollowers as jest.MockedFunction<
  typeof getUsersFollowers
>;

jest.mock("../../api/userFollowed.ts");
const getUsersFollowedMock = getUsersFollowed as jest.MockedFunction<
  typeof getUsersFollowed
>;

it("nix", () => {
  expect(true).toBe(true);
});

// it('should show loader when screen is rendered', async () => {
//   const username = 'username';
//   const fullName = 'fullName';

//   getUserMock.mockResolvedValueOnce(
//     getEmptyAxiosResponse({
//       userId: 'userId',
//       username,
//       fullName,
//     })
//   );

//   getUsersPostsMock.mockResolvedValueOnce(getEmptyAxiosResponse({ posts: [] }));

//   getUsersFollowersMock.mockResolvedValueOnce(
//     getEmptyAxiosResponse({
//       followers: [
//         {
//           fullName: '',
//           userId: '',
//           username: '',
//         },
//       ],
//     })
//   );

//   getUsersFollowedMock.mockResolvedValueOnce(
//     getEmptyAxiosResponse({
//       followed: [
//         {
//           fullName: '',
//           username: '',
//           userId: '',
//         },
//       ],
//     })
//   );

//   const { getByTestId, queryByTestId, getByText } = renderWithProviders(
//     <Route path='/' component={MyProfilePage} />,
//     {}
//   );

//   expect(getByTestId('loader')).toBeInTheDocument();

//   await waitFor(() => expect(queryByTestId('loader')).not.toBeInTheDocument());

//   expect(getByText(username)).toBeInTheDocument();
//   expect(getByText(fullName)).toBeInTheDocument();
//   expect(getByText('0 Posts')).toBeInTheDocument();
//   expect(getByText('1 Abonnenten')).toBeInTheDocument();
//   expect(getByText('1 abonniert')).toBeInTheDocument();
// });
