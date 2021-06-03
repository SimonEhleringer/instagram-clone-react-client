import React from 'react';
// import { Route, RouteProps } from 'react-router';

// export interface ProtectedRouteProps extends RouteProps {

// }

// export class ProtectedRoute extends Route<ProtectedRouteProps> {
//   public render() {
//     const renderRouteComponent = () => {

//     }

//     return <Route {...this.props} component={renderRouteComponent} />
//   }
// }

import { useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';
import { ReduxState } from '../config/store';

interface ProtectedRouteProps extends RouteProps {}

// TODO: Add tests
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,
  children,
  ...rest
}: any) => {
  const loggedInUserId = useSelector(
    (state: ReduxState) => state.authenticationState.loggedInUserId
  );

  const renderRouteComponent = (props: any) => {
    const componentToRender = component ? component : children;

    return !loggedInUserId ? (
      <Redirect to='/login' />
    ) : (
      React.createElement(componentToRender, props)
    );
  };

  return <Route {...rest} render={renderRouteComponent} />;
};

export default ProtectedRoute;
