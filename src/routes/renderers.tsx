import React from 'react';
import { Route } from 'react-router';
import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage';
import MyProfilePage from '../pages/MyProfilePage';
import NewPostPage from '../pages/NewPostPage';
import RegisterPage from '../pages/RegisterPage';
import SuggestionsPage from '../pages/SuggestionsPage';
import UserProfilePage from '../pages/UserProfilePage';
import ProtectedRoute from '../shared/ProtectedRoute';
import {
  indexPath,
  loginPath,
  myProfilePath,
  newPostPath,
  registerPath,
  suggestionsPath,
  userProfilePath,
} from './path';

export const renderIndexRoute = (route: JSX.Element = <IndexPage />) => (
  <ProtectedRoute path={indexPath} exact>
    {route}
  </ProtectedRoute>
);

export const renderRegisterRoute = (route: JSX.Element = <RegisterPage />) => (
  <Route path={registerPath}>{route}</Route>
);

export const renderLoginRoute = (route: JSX.Element = <LoginPage />) => (
  <Route path={loginPath}>{route}</Route>
);

export const renderSuggestionsRoute = (
  route: JSX.Element = <SuggestionsPage />
) => (
  <ProtectedRoute path={suggestionsPath} exact>
    {route}
  </ProtectedRoute>
);

export const renderNewPostRoute = (route: JSX.Element = <NewPostPage />) => (
  <ProtectedRoute path={newPostPath}>{route}</ProtectedRoute>
);

export const renderMyProfileRoute = (
  route: JSX.Element = <MyProfilePage />
) => <ProtectedRoute path={myProfilePath}>{route}</ProtectedRoute>;

export const renderUserProfileRoute = (
  route: JSX.Element = <UserProfilePage />
) => <ProtectedRoute path={userProfilePath}>{route}</ProtectedRoute>;
