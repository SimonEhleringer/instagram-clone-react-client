import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router";
import AuthenticationForm, { AuthenticationFormProps } from ".";

const history = createMemoryHistory();

it("should redirect when link is pressed", () => {
  const redirectButtonText = "redirectButtonText";
  const redirectTo = "/redirectTo";

  const { getByText } = renderComponent({
    errors: [],
    handleSubmit: () => {},
    redirectButtonText,
    redirectText: "",
    redirectTo,
    submitButtonCaption: "",
    isLoading: false,
  });

  const linkEl = getByText(redirectButtonText);

  fireEvent.click(linkEl);

  expect(history.location.pathname).toBe(redirectTo);
});

it("should render texts and children", () => {
  const errorText = "errorText";
  const errors = [errorText];

  const redirectButtonText = "redirectButtonText";
  const redirectText = "redirectText";
  const submitButtonCaption = "submitButtonCaption";
  const subTitle = "subTitle";

  const innerText = "inner text";
  const children = <div data-testid="children">{innerText}</div>;

  const { getByTestId } = renderComponent(
    {
      errors,
      handleSubmit: () => {},
      redirectButtonText,
      redirectText,
      redirectTo: "",
      submitButtonCaption,
      subTitle,
      isLoading: false,
    },
    children
  );

  const errorsEl = getByTestId("errors");
  const redirectTextEl = getByTestId("redirectText");
  const buttonEl = getByTestId("button");
  const subTitleEl = getByTestId("subTitle");

  const childrenEl = getByTestId("children");

  expect(errorsEl.hasChildNodes()).toBe(true);
  expect(errorsEl.childNodes[0].textContent).toBe(errorText);
  expect(redirectTextEl.textContent).toContain(redirectText);
  expect(redirectTextEl.textContent).toContain(redirectButtonText);
  expect(buttonEl.textContent).toBe(submitButtonCaption);
  expect(subTitleEl.textContent).toBe(subTitle);

  expect(childrenEl.textContent).toBe(innerText);
});

it("should call submit handler when submit event is fired", () => {
  const onSubmitMock = jest.fn();

  const { getByTestId } = renderComponent({
    errors: [],
    handleSubmit: onSubmitMock,
    redirectButtonText: "",
    redirectText: "",
    redirectTo: "",
    submitButtonCaption: "",
    isLoading: false,
  });

  const authenticationFormEl = getByTestId("authentication-form");

  fireEvent.submit(authenticationFormEl);

  expect(onSubmitMock).toBeCalled();
});

const renderComponent = (
  props: AuthenticationFormProps,
  children: React.ReactNode = <></>
) => {
  return render(
    <Router history={history}>
      <AuthenticationForm {...props}>{children}</AuthenticationForm>
    </Router>
  );
};
