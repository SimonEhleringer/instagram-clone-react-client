import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
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
} from '../routes';

// TODO: Suggestions: Show some text when no suggestions are there
// TODO: Maybe add padding scss variable?
// TODO: Delete unnessecary API endpoints
// TODO: Rename files to kebap-case
// TODO: Test interceptors
// TODO: Show errors when errors in api call apeared
// TODO: Fix all warnings
// TODO: Images loading
// TODO: Add redux persist
const App = () => {
  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUD_NAME}>
      <BrowserRouter>
        <Switch>
          {renderIndexRoute()}
          {renderRegisterRoute()}
          {renderLoginRoute()}
          {renderSuggestionsRoute()}
          {renderNewPostRoute()}
          {renderMyProfileRoute()}
          {renderUserProfileRoute()}
        </Switch>
      </BrowserRouter>
    </CloudinaryContext>
  );
};

export default App;
