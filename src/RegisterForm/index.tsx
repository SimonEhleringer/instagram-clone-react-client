import AuthenticationForm from '../AuthenticationForm';
import Input from '../Input';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  RegisterRequest,
  requestRegister,
} from '../authentication/apiRequests';
import { useState } from 'react';
import { getErrorsArrayFromSagaError } from '../sagaError';
import { setState } from '../authentication/store';
import { convertAccessAndRefreshTokenResponseToAuthenticationState } from '../authentication/utils';

interface Props {
  handleRegisterSuccess: () => void;
}

// TODO: Values of Inputs are initially "" -> on second press values are undefined
const RegisterForm: React.FC<Props> = ({ handleRegisterSuccess }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm<RegisterRequest>();
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    try {
      const response = await requestRegister(data);

      const payload = convertAccessAndRefreshTokenResponseToAuthenticationState(
        response.data
      );

      dispatch(setState(payload));
      handleRegisterSuccess();
    } catch (e) {
      setErrors(getErrorsArrayFromSagaError(e));
    }
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
  );
};

export default RegisterForm;
