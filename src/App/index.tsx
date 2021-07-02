import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./style.scss";
import { CloudinaryContext } from "cloudinary-react";
import { Routes } from "../routes";

// TODO: Check for accessibility
// TODO: Profile image on profile page: has white background (but only sometimes?)
// TODO: When post caption is multiline it is not displayed correctly
// TODO: Suggestions: Show some text when no suggestions are there
// TODO: Maybe add padding scss variable?
// TODO: Delete unnessecary API endpoints
// TODO: Rename files to kebap-case
// TODO: Test interceptors
// TODO: Show errors when errors in api call apeared
// TODO: Fix all warnings
// TODO: Images loading
// TODO: Add redux persist
// TODO: Clean up public folder
const App = () => {
  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUD_NAME}>
      <BrowserRouter>
        <Routes />
        {/* <Switch>
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
        </Switch> */}
      </BrowserRouter>
    </CloudinaryContext>
  );
};

export default App;
