import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { RegisterRequestDto, register } from '../../api/authentication';
import { setState } from '../../redux/authentication/slice';
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from '../../authentication/utils';
import AuthenticationForm from '../../authentication/AuthenticationForm';

import { getErrorsArrayFromError } from '../../shared/error';
import Input from '../../shared/Input';
import { buildLoginPath } from '../../routes/path';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, control } = useForm<RegisterRequestDto>();

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterRequestDto> = async (data) => {
    setLoading(true);

    try {
      const response = await register(data);

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
    <AuthenticationForm
      handleSubmit={handleSubmit(onSubmit)}
      subTitle='Registriere dich, um die Fotos und Videos deiner Freunde zu sehen.'
      submitButtonCaption='Registrieren'
      redirectText='Du hast ein Konto?'
      redirectButtonText='Melde dich an'
      redirectTo={buildLoginPath()}
      errors={errors}
      isLoading={loading}
    >
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            placeholder='E-Mail Adresse'
            onChange={onChange}
            onBlur={onBlur}
            value={value || ''}
            ref={ref}
          />
        )}
      />

      <Controller
        control={control}
        name='fullName'
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            placeholder={'Vollständiger Name'}
            onChange={onChange}
            onBlur={onBlur}
            value={value || ''}
            ref={ref}
          />
        )}
      />

      <Controller
        control={control}
        name='username'
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            placeholder='Benutzername'
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
            type='password'
            placeholder='Passwort'
            onChange={onChange}
            onBlur={onBlur}
            value={value || ''}
            ref={ref}
          />
        )}
      />
    </AuthenticationForm>
  );
};

export default RegisterForm;
