import React from "react";
import ContentCenteredLayout from "../../shared/ContentCenteredLayout";
import LoginForm from "../../authentication/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <ContentCenteredLayout>
      <LoginForm />
    </ContentCenteredLayout>
  );
};

export default LoginPage;
