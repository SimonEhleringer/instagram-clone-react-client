import React from 'react';
import AuthenticationForm from '../AuthenticationForm';
import Input from '../Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterPayload, setState } from '../authentication/store';
import { useDispatch } from 'react-redux';
import { register as registerAction } from '../authentication/store';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<RegisterPayload>();

  const onSubmit: SubmitHandler<RegisterPayload> = (data) => {
    dispatch(
      registerAction({
        payload: data,
        meta: {
          onSuccess: (params) => dispatch(setState(params)),
          onError: (errors) => console.log(errors),
        },
      })
    );
  };

  return (
    <AuthenticationForm
      onSubmit={handleSubmit(onSubmit)}
      subTitle='Registriere dich, um die Fotos und Videos deiner Freunde zu sehen.'
      submitButtonCaption='Registrieren'
      redirectText='Du hast ein Konto?'
      redirectButtonText='Melde dich an'
      redirectTo='/login'
    >
      <Input placeholder='E-Mail Adresse' {...register('email')} />
      <Input placeholder='Vollständiger Name' {...register('fullName')} />
      <Input placeholder='Benutzername' {...register('username')} />
      <Input type='password' placeholder='Passwort' {...register('password')} />
    </AuthenticationForm>
  );
};

export default RegisterForm;
