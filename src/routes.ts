export const indexPath = '/';
export const buildIndexPath = () => '/';

export const registerPath = '/register';
export const buildRegisterPath = () => '/register';

export const loginPath = '/login';
export const buildLoginPath = () => '/login';

export const suggestionsPath = '/suggestions';
export const buildSuggestionsPath = () => '/suggestions';

export const newPostPath = '/new-post';
export const buildNewPostPath = () => '/new-post';

export const myProfilePath = '/profiles/me';
export const buildMyProfilePath = () => '/profiles/me';

export const userProfilePath = '/profiles/:userId';
export const buildUserProfilePath = (userId: string) => `/profiles/${userId}`;
