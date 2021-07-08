import React from 'react';
import LoginForm from '../../authentication/LoginForm';
import ContentCenteredLayout from '../../shared/ContentCenteredLayout';

const LoginPage: React.FC = () => {
  return (
    <ContentCenteredLayout>
      <LoginForm />
    </ContentCenteredLayout>
  );
};

export default LoginPage;
