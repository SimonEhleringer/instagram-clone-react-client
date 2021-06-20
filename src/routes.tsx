import ProtectedRoute from './shared/ProtectedRoute';
import IndexPage from './pages/IndexPage';
import { Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SuggestionsPage from './pages/SuggestionsPage';
import NewPostPage from './pages/NewPostPage';
import MyProfilePage from './pages/MyProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import React from 'react';

export const indexPath = '/';
export const buildIndexPath = () => '/';
export const renderIndexRoute = (
  component: React.ComponentType<any> = IndexPage
) => <ProtectedRoute path={indexPath} exact component={component} />;

export const registerPath = '/register';
export const buildRegisterPath = () => '/register';
export const renderRegisterRoute = (
  component: React.ComponentType<any> = RegisterPage
) => <Route path={registerPath} component={component} />;

export const loginPath = '/login';
export const buildLoginPath = () => '/login';
export const renderLoginRoute = (
  component: React.ComponentType<any> = LoginPage
) => <Route path={loginPath} component={component} />;

export const suggestionsPath = '/suggestions';
export const buildSuggestionsPath = () => '/suggestions';
export const renderSuggestionsRoute = (
  component: React.ComponentType<any> = SuggestionsPage
) => <ProtectedRoute path={suggestionsPath} exact component={component} />;

export const newPostPath = '/new-post';
export const buildNewPostPath = () => '/new-post';
export const renderNewPostRoute = (
  component: React.ComponentType<any> = NewPostPage
) => <ProtectedRoute path={newPostPath} component={component} />;

export const myProfilePath = '/profiles/me';
export const buildMyProfilePath = () => '/profiles/me';
export const renderMyProfileRoute = (
  component: React.ComponentType<any> = MyProfilePage
) => <ProtectedRoute path={myProfilePath} component={component} />;

export const userProfilePath = '/profiles/:userId';
export const buildUserProfilePath = (userId: string) => `/profiles/${userId}`;
export const renderUserProfileRoute = (
  component: React.ComponentType<any> = UserProfilePage
) => <ProtectedRoute path={userProfilePath} component={component} />;
