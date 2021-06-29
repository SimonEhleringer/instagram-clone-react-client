import { combineReducers, createStore } from 'redux';
import { authenticationReducer } from '../redux/authentication/slice';
import { composeWithDevTools } from 'redux-devtools-extension';
import { newPostReducer } from '../redux/newPost/slice';

export const reducer = combineReducers({
  authenticationState: authenticationReducer,
  newPostState: newPostReducer,
});

export const configureStore = () => {
  const store = createStore(reducer, composeWithDevTools());

  return store;
};

export type ReduxState = ReturnType<typeof reducer>;
export type StoreType = ReturnType<typeof configureStore>;

const applicationStore = configureStore();

export default applicationStore;
