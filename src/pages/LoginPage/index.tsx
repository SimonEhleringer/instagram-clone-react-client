import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { LoginRequest, requestLogin } from '../../api/authentication';
import { setState } from '../../authentication/store';
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from '../../authentication/utils';
import AuthenticationForm from '../../AuthenticationForm';
import AuthenticationPageLayout from '../../AuthenticationPageLayout';
import { getErrorsArrayFromError } from '../../error';
import Input from '../../Input';

// TODO: Add tests for loading
const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
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
      history.push('/');
    } catch (e) {
      setErrors(getErrorsArrayFromError(e));
    }

    setLoading(false);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationForm
        onSubmit={handleSubmit(onSubmit)}
        submitButtonCaption='Anmelden'
        redirectText='Du hast kein Konto?'
        redirectButtonText='Registrieren'
        redirectTo='/register'
        errors={errors}
        loading={loading}
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
    </AuthenticationPageLayout>
  );
};

export default LoginPage;
