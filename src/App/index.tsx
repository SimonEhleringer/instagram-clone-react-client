import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import './style.scss';
import SuggestionsPage from '../pages/SuggestionsPage';
import ProtectedRoute from '../shared/ProtectedRoute';
import { CloudinaryContext } from 'cloudinary-react';
import NewPostPage from '../pages/NewPostPage';
import MyProfilePage from '../pages/MyProfilePage';
import UserProfilePage from '../pages/UserProfilePage';
import {
  indexPath,
  loginPath,
  myProfilePath,
  newPostPath,
  registerPath,
  suggestionsPath,
  userProfilePath,
} from '../routes';

// TODO: Suggestions: Show some text when no suggestions are there
// TODO: Maybe add padding scss variable?
// TODO: Delete unnessecary API endpoints
// TODO: Rename files to kebap-case
const App = () => {
  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUD_NAME}>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path={indexPath} exact component={IndexPage} />
          <Route path={registerPath} component={RegisterPage} />
          <Route path={loginPath} component={LoginPage} />
          <ProtectedRoute
            path={suggestionsPath}
            exact
            component={SuggestionsPage}
          />
          <ProtectedRoute path={newPostPath} component={NewPostPage} />
          <ProtectedRoute path={myProfilePath} component={MyProfilePage} />
          <ProtectedRoute path={userProfilePath} component={UserProfilePage} />
        </Switch>
      </BrowserRouter>
    </CloudinaryContext>
  );
};

export default App;
