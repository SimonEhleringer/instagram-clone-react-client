import { getByAltText, render } from "@testing-library/react";
import * as cloudinary from "cloudinary-react";
import Avatar from ".";

//(props: any) => <img alt={props.alt} />

jest.mock("cloudinary-react", () => {
  return {
    Image: jest.fn((props) => <div data-testid="test" {...props}></div>),
    Transformation: () => <div />,
  };
});

it("should render avatar and pass props to cloudinary components", () => {
  const publicProfileImageId = "publicProfileImageId";
  const username = "username";
  const widthInPx = 99;

  const { getByTestId, getByAltText } = render(
    <Avatar
      publicProfileImageId={publicProfileImageId}
      username={username}
      widthInPx={widthInPx}
    />
  );

  //expect(getByAltText(`${username}-profile-image`)).toBeInTheDocument();
  expect(getByTestId("test")).toHaveAttribute("publicId", publicProfileImageId);
});
