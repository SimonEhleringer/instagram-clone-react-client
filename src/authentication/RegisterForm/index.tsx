import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RegisterRequest, requestRegister } from "../../api/authentication";
import { setState } from "../../redux/authentication/slice";
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from "../../authentication/utils";
import AuthenticationForm from "../../authentication/AuthenticationForm";

import { getErrorsArrayFromError } from "../../shared/error";
import Input from "../../shared/Input";
import { buildLoginPath } from "../../routes/path";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, control } = useForm<RegisterRequest>();

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    setLoading(true);

    try {
      const response = await requestRegister(data);

      const payload = convertAccessAndRefreshTokenResponseToAuthenticationState(
        response.data
      );

      dispatch(setState(payload));
      history.push("/");
    } catch (e) {
      setErrors(getErrorsArrayFromError(e));
    }

    setLoading(false);
  };

  return (
    <AuthenticationForm
      handleSubmit={handleSubmit(onSubmit)}
      subTitle="Registriere dich, um die Fotos und Videos deiner Freunde zu sehen."
      submitButtonCaption="Registrieren"
      redirectText="Du hast ein Konto?"
      redirectButtonText="Melde dich an"
      redirectTo={buildLoginPath()}
      errors={errors}
      isLoading={loading}
    >
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            data-testId={"emailInput"}
            placeholder="E-Mail Adresse"
            onChange={onChange}
            onBlur={onBlur}
            value={value || ""}
            ref={ref}
          />
        )}
      />

      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            data-testId="fullNameInput"
            placeholder={"Vollständiger Name"}
            onChange={onChange}
            onBlur={onBlur}
            value={value || ""}
            ref={ref}
          />
        )}
      />

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            data-testId="usernameInput"
            placeholder="Benutzername"
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
            type="password"
            placeholder="Passwort"
            onChange={onChange}
            onBlur={onBlur}
            value={value || ""}
            ref={ref}
          />
        )}
      />
    </AuthenticationForm>
  );
};

export default RegisterForm;
