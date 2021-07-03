import { useParams } from 'react-router-dom';
import { NewPostPageType } from '../pages/NewPostPage';
import { UserProfilePageParams } from '../pages/UserProfilePage';
import {
  renderIndexRoute,
  renderLoginRoute,
  renderMyProfileRoute,
  renderNewPostRoute,
  renderRegisterRoute,
  renderSuggestionsRoute,
  renderUserProfileRoute,
} from '../routes/renderers';

export const MockedIndexPage: React.FC = () => (
  <div data-testid='index-page'>IndexPage</div>
);

export const renderMockedIndexRoute = () => renderIndexRoute(MockedIndexPage);

export const MockedRegisterPage: React.FC = () => (
  <div data-testid='login-page'>LoginPage</div>
);

export const renderMockedRegisterRoute = () =>
  renderRegisterRoute(MockedRegisterPage);

export const MockedLoginPage: React.FC = () => (
  <div data-testid='login-page'>LoginPage</div>
);

export const renderMockedLoginRoute = () => renderLoginRoute(MockedLoginPage);

export const MockedSuggestionsPage: React.FC = () => (
  <div data-testid='suggestions-page'>SuggestionsPage</div>
);

export const renderMockedSuggestionsRoute = () =>
  renderSuggestionsRoute(MockedSuggestionsPage);

export const MockedNewPostPage: NewPostPageType = ({ location }) => {
  return (
    <div data-testid='new-post-page'>
      <div data-testid='selectedImageDataUri'>
        {location.state.selectedImageDataUri}
      </div>
    </div>
  );
};

export const renderMockedNewPostRoute = () =>
  renderNewPostRoute(MockedNewPostPage);

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
