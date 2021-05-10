import React from "react";
import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";
import Input from "../Input/Input";
import "./style.scss";

const RegisterForm = () => {
  return (
    <AuthenticationForm
      subTitle="Registriere dich, um die Fotos und Videos deiner Freunde zu sehen."
      submitButtonCaption="Registrieren"
      redirectText="Du hast ein Konto?"
      redirectButtonText="Melde dich an"
      redirectTo="/login"
    >
      <Input placeholder="E-Mail Adresse" />
      <Input placeholder="Vollständiger Name" />
      <Input placeholder="Benutzername" />
      <Input type="password" placeholder="Passwort" />
    </AuthenticationForm>
  );
};

export default RegisterForm;
