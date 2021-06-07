import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import './style.scss';
import SuggestionsPage from '../pages/SuggestionsPage';
import ProtectedRoute from '../ProtectedRoute';
import { CloudinaryContext } from 'cloudinary-react';

const App = () => {
  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUD_NAME}>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path='/' exact component={IndexPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/login' component={LoginPage} />
          <ProtectedRoute
            path='/suggestions'
            exact
            component={SuggestionsPage}
          />
        </Switch>
      </BrowserRouter>
    </CloudinaryContext>
  );
};

export default App;
