import { render, screen } from "@testing-library/react";
import Button from ".";
import faker from "faker";

it("should render only text in button when not loading", () => {
  const buttonText = faker.lorem.word();

  render(<Button loaderDataTestId="buttonLoader">{buttonText}</Button>);

  expect(screen.getByRole("button", { name: buttonText }).textContent).toBe(
    buttonText
  );
  expect(screen.queryByTestId("buttonLoader")).not.toBeInTheDocument();
});

it("should render loader in button when loading", () => {
  render(<Button loaderDataTestId="buttonLoader" isLoading={true}></Button>);

  expect(screen.getByTestId("buttonLoader")).toBeInTheDocument();
});
