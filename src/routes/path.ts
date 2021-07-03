import { NewPostPageState } from '../pages/NewPostPage';

export const indexPath = '/';
export const buildIndexPath = () => '/';

export const registerPath = '/register';
export const buildRegisterPath = () => '/register';

export const loginPath = '/login';
export const buildLoginPath = () => '/login';

export const suggestionsPath = '/suggestions';
export const buildSuggestionsPath = () => '/suggestions';

export const newPostPath = '/new-post';
export const buildNewPostPathname = () => '/new-post';
export const buildNewPostPath = (state: NewPostPageState) => {
  return {
    pathname: buildNewPostPathname(),
    state,
  };
};

export const myProfilePath = '/profiles/me';
export const buildMyProfilePath = () => '/profiles/me';

export const userProfilePath = '/profiles/:userId';
export const buildUserProfilePath = (userId: string) => `/profiles/${userId}`;
