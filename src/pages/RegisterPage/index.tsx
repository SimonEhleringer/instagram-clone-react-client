import React from 'react';
import { RouteComponentProps } from 'react-router';
import AuthenticationPageLayout from '../../AuthenticationPageLayout';
import RegisterForm from '../../RegisterForm';

const RegisterPage: React.FC<RouteComponentProps> = ({ history }) => {
  const handleRegisterSuccess = () => {
    history.push('/');
  };

  return (
    <AuthenticationPageLayout>
      <RegisterForm handleRegisterSuccess={handleRegisterSuccess} />
    </AuthenticationPageLayout>
  );
};

export default RegisterPage;
