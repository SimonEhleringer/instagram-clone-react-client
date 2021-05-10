import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import { ReduxState } from '../store';
import './style.scss';

// TODO: Neues logo
// Make app responsive

const App = () => {
  const isUserLoggedIn = useSelector(
    (state: ReduxState) => state.authenticationState.isUserLoggedIn
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          {!isUserLoggedIn ? <Redirect to='/login' /> : <IndexPage />}
        </Route>
        <Route path='/register' component={RegisterPage} />
        <Route path='/login' component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
