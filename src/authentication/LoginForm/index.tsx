import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import AuthenticationForm from "../../authentication/AuthenticationForm";
import Input from "../../shared/Input";
import { buildLoginPath, buildRegisterPath } from "../../routes/path";
import { useDispatch } from "react-redux";
import { LoginRequest, requestLogin } from "../../api/authentication";
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from "../utils";
import { setState } from "../../redux/authentication/slice";
import { useHistory } from "react-router-dom";
import { getErrorsArrayFromError } from "../../shared/error";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, control } = useForm<LoginRequest>();

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    setLoading(true);

    try {
      const response = await requestLogin(data);

      const authenticationState =
        convertAccessAndRefreshTokenResponseToAuthenticationState(
          response.data
        );

      dispatch(setState(authenticationState));
      history.push(buildLoginPath());
    } catch (e) {
      setErrors(getErrorsArrayFromError(e));
    }

    setLoading(false);
  };

  return (
    <AuthenticationForm
      handleSubmit={handleSubmit(onSubmit)}
      submitButtonCaption="Anmelden"
      redirectText="Du hast kein Konto?"
      redirectButtonText="Registrieren"
      redirectTo={buildRegisterPath()}
      errors={errors}
      isLoading={loading}
    >
      <Controller
        control={control}
        name="usernameOrEmail"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            date-testId="usernameOrEmailInput"
            placeholder="Benutzername oder E-Mail Adresse"
            onChange={onChange}
            onBlur={onBlur}
            value={value || ""}
            ref={ref}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            data-testId="passwordInput"
            placeholder="Passwort"
            onChange={onChange}
            onBlur={onBlur}
            value={value || ""}
            type={"password"}
            ref={ref}
          />
        )}
      />
    </AuthenticationForm>
  );
};

export default LoginForm;
