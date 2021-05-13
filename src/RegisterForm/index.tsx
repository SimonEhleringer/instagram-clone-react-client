import AuthenticationForm from '../AuthenticationForm';
import Input from '../Input';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { RegisterPayload, setState } from '../authentication/store';
import { useDispatch } from 'react-redux';
import { register as registerAction } from '../authentication/store';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm<RegisterPayload>();

  const onSubmit: SubmitHandler<RegisterPayload> = (data) => {
    console.log('registerr');

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
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
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
      {/* <Input placeholder='E-Mail Adresse' innerRef={register('email').ref} {...register('email')} />
      <Input placeholder='Vollständiger Name' {...register('fullName')} />
      <Input placeholder='Benutzername' {...register('username')} />
      <Input type='password' placeholder='Passwort' {...register('password')} /> */}
    </AuthenticationForm>
  );
};

export default RegisterForm;
