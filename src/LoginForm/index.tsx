import React from 'react';
import AuthenticationForm from '../AuthenticationForm';
import Input from '../Input';

const LoginForm = () => {
  return (
    <AuthenticationForm
      onSubmit={() => {}}
      submitButtonCaption='Anmelden'
      redirectText='Du hast kein Konto?'
      redirectButtonText='Registrieren'
      redirectTo='/register'
      // TODO: Errors state
      errors={[]}
    >
      {/* <Input placeholder='Benutzername oder E-Mail Adresse' />
      <Input type='password' placeholder='Passwort' /> */}
    </AuthenticationForm>
  );
};

export default LoginForm;