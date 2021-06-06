import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  RegisterRequest,
  requestRegister,
} from '../../authentication/apiRequests';
import { setState } from '../../authentication/store';
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from '../../authentication/utils';
import AuthenticationForm from '../../AuthenticationForm';
import AuthenticationPageLayout from '../../AuthenticationPageLayout';
import { getErrorsArrayFromError } from '../../error';
import Input from '../../Input';

// TODO: Add tests for loading
const RegisterPage: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
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
        subTitle='Registriere dich, um die Fotos und Videos deiner Freunde zu sehen.'
        submitButtonCaption='Registrieren'
        redirectText='Du hast ein Konto?'
        redirectButtonText='Melde dich an'
        redirectTo='/login'
        errors={errors}
        loading={loading}
      >
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              testId={'emailInput'}
              htmlInputProps={{
                placeholder: 'E-Mail Adresse',
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
          name='fullName'
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              testId='fullNameInput'
              htmlInputProps={{
                placeholder: 'Vollständiger Name',
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
          name='username'
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              testId='usernameInput'
              htmlInputProps={{
                placeholder: 'Benutzername',
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
                type: 'password',
                placeholder: 'Passwort',
                onChange: onChange,
                onBlur: onBlur,
                value: value || '',
              }}
              innerRef={ref}
            />
          )}
        />
      </AuthenticationForm>
    </AuthenticationPageLayout>
  );
};

export default RegisterPage;
