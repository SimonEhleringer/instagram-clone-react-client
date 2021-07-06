import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './style.scss';
import { CloudinaryContext } from 'cloudinary-react';
import {
  renderIndexRoute,
  renderLoginRoute,
  renderMyProfileRoute,
  renderNewPostRoute,
  renderRegisterRoute,
  renderSuggestionsRoute,
  renderUserProfileRoute,
} from '../routes/renderers';
import Header from '../shared/Header';

// TODO: Maybe put in extra file and tests also
export const Routes = () => {
  return (
    <Switch>
      {renderLoginRoute()}
      {renderRegisterRoute()}
      <Route>
        <Header />
        <Switch>
          {renderIndexRoute()}
          {renderSuggestionsRoute()}
          {renderNewPostRoute()}
          {renderMyProfileRoute()}
          {renderUserProfileRoute()}
        </Switch>
      </Route>
    </Switch>
  );
};

// TODO: Check for accessibility
// TODO: Maybe change fetch format for images
// TODO: Maybe add padding scss variable?
// TODO: Delete unnessecary API endpoints
// TODO: Test interceptors
// TODO: Show errors when errors in api call apeared
// TODO: Fix all warnings
// TODO: Images loading
// TODO: Clean up public folder
// TODO: NewPostPage has a warning when running tests
// TODO: Another loader
const App = () => {
  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUD_NAME}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </CloudinaryContext>
  );
};

export default App;
