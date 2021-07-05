import ProtectedRoute from '../shared/ProtectedRoute';
import IndexPage from '../pages/IndexPage';
import { Route } from 'react-router';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import SuggestionsPage from '../pages/SuggestionsPage';
import NewPostPage from '../pages/NewPostPage';
import MyProfilePage from '../pages/MyProfilePage';
import UserProfilePage from '../pages/UserProfilePage';
import React, { FC } from 'react';
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
