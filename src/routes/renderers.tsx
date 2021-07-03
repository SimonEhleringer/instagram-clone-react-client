import ProtectedRoute from '../shared/ProtectedRoute';
import IndexPage from '../pages/IndexPage';
import { Route } from 'react-router';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import SuggestionsPage from '../pages/SuggestionsPage';
import NewPostPage from '../pages/NewPostPage';
import MyProfilePage from '../pages/MyProfilePage';
import UserProfilePage from '../pages/UserProfilePage';
import React from 'react';
import {
  indexPath,
  loginPath,
  myProfilePath,
  newPostPath,
  registerPath,
  suggestionsPath,
  userProfilePath,
} from './path';

export const renderIndexRoute = (
  component: React.ComponentType<any> = IndexPage
) => <ProtectedRoute path={indexPath} exact component={component} />;

export const renderRegisterRoute = (
  component: React.ComponentType<any> = RegisterPage
) => <Route path={registerPath} component={component} />;

export const renderLoginRoute = (
  component: React.ComponentType<any> = LoginPage
) => <Route path={loginPath} component={component} />;

export const renderSuggestionsRoute = (
  component: React.ComponentType<any> = SuggestionsPage
) => <ProtectedRoute path={suggestionsPath} exact component={component} />;

export const renderNewPostRoute = (
  component: React.ComponentType<any> = NewPostPage
) => <ProtectedRoute path={newPostPath} component={component} />;

export const renderMyProfileRoute = (
  component: React.ComponentType<any> = MyProfilePage
) => <ProtectedRoute path={myProfilePath} component={component} />;

export const renderUserProfileRoute = (
  component: React.ComponentType<any> = UserProfilePage
) => <ProtectedRoute path={userProfilePath} component={component} />;
