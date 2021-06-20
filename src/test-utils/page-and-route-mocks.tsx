import { renderLoginRoute } from '../routes';

export const MockedLoginPage: React.FC = () => (
  <div data-testid='login-page'>Login page</div>
);

export const renderMockedLoginRoute = () => renderLoginRoute(MockedLoginPage);
