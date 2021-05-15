import React from 'react';
import { RouteComponentProps } from 'react-router';
import AuthenticationPageLayout from '../../AuthenticationPageLayout';
import LoginForm from '../../LoginForm';

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const handleLoginSuccess = () => {
    history.push('/');
  };

  return (
    <AuthenticationPageLayout>
      <LoginForm handleLoginSuccess={handleLoginSuccess} />
    </AuthenticationPageLayout>
  );
};

export default LoginPage;
