import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { LoginRequest, requestLogin } from '../../api/authentication';
import { setState } from '../../redux/authentication/slice';
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from '../../authentication/utils';
import AuthenticationForm from '../../authentication/AuthenticationForm';
import AuthenticationPageLayout from '../../authentication/AuthenticationPageLayout';
import { getErrorsArrayFromError } from '../../shared/error';
import Input from '../../shared/Input';
import { buildRegisterPath } from '../../routes';

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
        redirectTo={buildRegisterPath()}
        errors={errors}
        loading={loading}
      >
        <Controller
          control={control}
          name='usernameOrEmail'
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              date-testId='usernameOrEmailInput'
              placeholder='Benutzername oder E-Mail Adresse'
              onChange={onChange}
              onBlur={onBlur}
              value={value || ''}
              ref={ref}
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              data-testId='passwordInput'
              placeholder='Passwort'
              onChange={onChange}
              onBlur={onBlur}
              value={value || ''}
              type={'password'}
              ref={ref}
            />
          )}
        />
      </AuthenticationForm>
    </AuthenticationPageLayout>
  );
};

export default LoginPage;
