import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { LoginRequest, requestLogin } from '../authentication/apiRequests';
import { setState } from '../authentication/store';
import AuthenticationForm from '../AuthenticationForm';
import Input from '../Input';
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from '../authentication/utils';
import { getErrorsArrayFromSagaError } from '../sagaError';

interface Props {
  handleLoginSuccess: () => void;
}

const LoginForm: React.FC<Props> = ({ handleLoginSuccess }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm<LoginRequest>();
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const response = await requestLogin(data);

      const authenticationState =
        convertAccessAndRefreshTokenResponseToAuthenticationState(
          response.data
        );

      dispatch(setState(authenticationState));
      handleLoginSuccess();
    } catch (e) {
      setErrors(getErrorsArrayFromSagaError(e));
    }
  };

  return (
    <AuthenticationForm
      onSubmit={handleSubmit(onSubmit)}
      submitButtonCaption='Anmelden'
      redirectText='Du hast kein Konto?'
      redirectButtonText='Registrieren'
      redirectTo='/register'
      errors={errors}
    >
      <Controller
        control={control}
        name='usernameOrEmail'
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            testId='usernameOrEmailInput'
            htmlInputProps={{
              placeholder: 'Benutzername oder E-Mail Adresse',
              onChange: onChange,
              onBlur: onBlur,
              value: value || '',
            }}
            innerRef={ref}
          />
        )}
      />

      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            testId='passwordInput'
            htmlInputProps={{
              placeholder: 'Passwort',
              onChange: onChange,
              onBlur: onBlur,
              value: value || '',
              type: 'password',
            }}
            innerRef={ref}
          />
        )}
      />
    </AuthenticationForm>
  );
};

export default LoginForm;
