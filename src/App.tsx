import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <>
      <CssBaseline />

      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Index} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
