import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { ReduxState } from '../../config/store';
import { buildLoginPath } from '../../routes/path';

interface ProtectedRouteProps extends RouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  const loggedInUserId = useSelector(
    (state: ReduxState) => state.authenticationState.loggedInUserId
  );

  return (
    <Route {...rest}>
      {!loggedInUserId ? <Redirect to={buildLoginPath()} /> : children}
    </Route>
  );
};

export default ProtectedRoute;
