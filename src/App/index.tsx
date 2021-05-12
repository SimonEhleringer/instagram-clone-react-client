import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import { ReduxState } from '../config/store';
import './style.scss';

const App = () => {
  const loggedInUserId = useSelector(
    (state: ReduxState) => state.authenticationState.loggedInUserId
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          {!loggedInUserId ? <Redirect to='/login' /> : <IndexPage />}
        </Route>
        <Route path='/register' component={RegisterPage} />
        <Route path='/login' component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
