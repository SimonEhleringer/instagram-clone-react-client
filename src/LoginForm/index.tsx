import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { LoginDto } from '../authentication/business';
import { login } from '../authentication/store';
import AuthenticationForm from '../AuthenticationForm';
import Input from '../Input';

interface Props {
  handleLoginSuccess: () => void;
}

const LoginForm: React.FC<Props> = ({ handleLoginSuccess }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm<LoginDto>();
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit: SubmitHandler<LoginDto> = (data) => {
    dispatch(
      login({
        payload: data,
        meta: {
          onSuccess: () => handleLoginSuccess(),
          onError: (errors) => setErrors(errors),
        },
      })
    );
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
