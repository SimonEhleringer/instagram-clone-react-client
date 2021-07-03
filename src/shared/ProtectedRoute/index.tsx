import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { ReduxState } from '../../config/store';
import { buildLoginPath } from '../../routes/path';

interface ProtectedRouteProps extends RouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const loggedInUserId = useSelector(
    (state: ReduxState) => state.authenticationState.loggedInUserId
  );

  if (!loggedInUserId) {
    return <Redirect to={buildLoginPath()} />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
