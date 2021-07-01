import React from "react";
import "./style.scss";
import ClipLoader from "react-spinners/ClipLoader";

export enum ButtonType {
  PrimaryContained,
  SecondaryContained,
  PrimaryText,
}

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  buttonType?: ButtonType;
  loaderDataTestId?: string;
}

// TODO: use variables for Loader color
const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  buttonType = ButtonType.PrimaryContained,
  loaderDataTestId = "buttonLoader",
  children,
  ...rest
}) => {
  return (
    <button
      className={`button ${
        buttonType === ButtonType.PrimaryContained
          ? "button--primary-contained"
          : ""
      } ${
        buttonType === ButtonType.SecondaryContained
          ? "button--secondary-contained"
          : ""
      } ${
        buttonType === ButtonType.PrimaryText ? "button--primary-text" : " "
      } ${isLoading ? "button--loading" : ""}`}
      {...rest}
    >
      {isLoading && (
        <div className="button__spinner" data-testid={loaderDataTestId}>
          <ClipLoader
            size="1em"
            color={`
          ${buttonType === ButtonType.PrimaryContained ? "white" : ""}
          ${buttonType === ButtonType.SecondaryContained ? "black" : ""}
          ${buttonType === ButtonType.PrimaryText ? "black" : ""}`}
          />
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
