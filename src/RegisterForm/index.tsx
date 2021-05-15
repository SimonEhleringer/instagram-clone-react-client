import AuthenticationForm from '../AuthenticationForm';
import Input from '../Input';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { register as registerAction } from '../authentication/store';
import { useState } from 'react';
import { RegisterDto } from '../authentication/business';

interface Props {
  handleRegisterSuccess: () => void;
}

// TODO: Values of Inputs are initially "" -> on second press values are undefined
const RegisterForm: React.FC<Props> = ({ handleRegisterSuccess }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm<RegisterDto>();
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit: SubmitHandler<RegisterDto> = (data) => {
    dispatch(
      registerAction({
        payload: data,
        meta: {
          onSuccess: () => handleRegisterSuccess(),
          onError: (errors) => setErrors(errors),
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
      errors={errors}
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
    </AuthenticationForm>
  );
};

export default RegisterForm;
