import { useParams } from 'react-router-dom';
import { UserProfilePageParams } from '../pages/UserProfilePage';
import {
  renderIndexRoute,
  renderLoginRoute,
  renderMyProfileRoute,
  renderSuggestionsRoute,
  renderUserProfileRoute,
} from '../routes';

export const MockedIndexPage: React.FC = () => (
  <div data-testid='index-page'>IndexPage</div>
);

export const renderMockedIndexRoute = () => renderIndexRoute(MockedIndexPage);

export const MockedLoginPage: React.FC = () => (
  <div data-testid='login-page'>LoginPage</div>
);

export const renderMockedLoginRoute = () => renderLoginRoute(MockedLoginPage);

export const MockedSuggestionsPage: React.FC = () => (
  <div data-testid='suggestions-page'>SuggestionsPage</div>
);

export const renderMockedSuggestionsRoute = () =>
  renderSuggestionsRoute(MockedSuggestionsPage);

export const MockedMyProfilePage: React.FC = () => (
  <div data-testid='my-profile-page'>MyProfilePage</div>
);

export const renderMockedMyProfileRoute = () =>
  renderMyProfileRoute(MockedMyProfilePage);

export const MockedUserProfilePage: React.FC = () => {
  const params = useParams<UserProfilePageParams>();

  return (
    <div data-testid='user-profile-page'>
      <div data-testid={'userId'}>{params.userId}</div>
    </div>
  );
};

export const renderMockedUserProfileRoute = () =>
  renderUserProfileRoute(MockedUserProfilePage);
