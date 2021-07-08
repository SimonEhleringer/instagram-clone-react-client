import React from 'react';
import RegisterForm from '../../authentication/RegisterForm';
import ContentCenteredLayout from '../../shared/ContentCenteredLayout';

const RegisterPage: React.FC = () => {
  return (
    <ContentCenteredLayout>
      <RegisterForm />
    </ContentCenteredLayout>
  );
};

export default RegisterPage;
