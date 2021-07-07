import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import AuthenticationForm from '../../authentication/AuthenticationForm';
import Input from '../../shared/Input';
import {
  buildIndexPath,
  buildLoginPath,
  buildRegisterPath,
} from '../../routes/path';
import { useDispatch } from 'react-redux';
import { LoginRequestDto, login } from '../../api/authentication';
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from '../utils';
import { setState } from '../../redux/authentication/slice';
import { useHistory } from 'react-router-dom';
import { getErrorsArrayFromError } from '../../shared/error';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, control } = useForm<LoginRequestDto>();

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginRequestDto> = async (data) => {
    setLoading(true);

    try {
      const response = await login(data);

      const authenticationState =
        convertAccessAndRefreshTokenResponseToAuthenticationState(
          response.data
        );

      dispatch(setState(authenticationState));
      history.push(buildIndexPath());
    } catch (e) {
      setErrors(getErrorsArrayFromError(e));
    }

    setLoading(false);
  };

  return (
    <AuthenticationForm
      handleSubmit={handleSubmit(onSubmit)}
      submitButtonCaption='Anmelden'
      redirectText='Du hast kein Konto?'
      redirectButtonText='Registrieren'
      redirectTo={buildRegisterPath()}
      errors={errors}
      isLoading={loading}
    >
      <Controller
        control={control}
        name='usernameOrEmail'
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
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
  );
};

export default LoginForm;
