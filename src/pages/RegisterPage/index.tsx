import React from "react";
import ContentCenteredLayout from "../../shared/ContentCenteredLayout";
import RegisterForm from "../../authentication/RegisterForm";

// TODO: Add tests for loading
const RegisterPage: React.FC = () => {
  return (
    <ContentCenteredLayout>
      <RegisterForm />
    </ContentCenteredLayout>
  );
};

export default RegisterPage;
