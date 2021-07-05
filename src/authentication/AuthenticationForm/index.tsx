import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../shared/Button";
import instagramLogo from "../../assets/images/logo.png";
import "./style.scss";
import Errors from "../../shared/Errors";

export interface AuthenticationFormProps {
  handleSubmit: () => void;
  subTitle?: string;
  submitButtonCaption: string;
  redirectText: string;
  redirectButtonText: string;
  redirectTo: string;
  errors: string[];
  isLoading: boolean;
}

// TODO: Add tests for loading
// TODO: Remove Data test ids
const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  handleSubmit,
  subTitle,
  submitButtonCaption,
  redirectText,
  redirectButtonText,
  redirectTo,
  children,
  errors,
  isLoading,
}) => {
  return (
    <form
      data-testid="authentication-form"
      className="authentication-form"
      onSubmit={handleSubmit}
    >
      <div className="authentication-form__box">
        <img
          className={
            subTitle
              ? "authentication-form__logo"
              : "authentication-form__logo--margin-bottom"
          }
          src={instagramLogo}
          alt="Instagram"
        />

        <div className="authentication-form__content-wrapper">
          {subTitle && (
            <p
              data-testid="subTitle"
              className="authentication-form__sub-title"
            >
              {subTitle}
            </p>
          )}

          {children}

          <div className="authentication-form__submit-button">
            <Button type={"submit"} isLoading={isLoading}>
              {submitButtonCaption}
            </Button>
          </div>

          {errors.length > 0 && (
            <div className="authentication-form__errors">
              <Errors errors={errors} />
            </div>
          )}
        </div>
      </div>

      <div className="authentication-form__box">
        <div
          data-testid="redirectText"
          className="authentication-form__redirect-text"
        >
          {redirectText}{" "}
          <Link className="authentication-form__redirect-link" to={redirectTo}>
            {redirectButtonText}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default AuthenticationForm;
