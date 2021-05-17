import { combineReducers, createStore } from 'redux';
import { authenticationReducer } from '../authentication/store';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  authenticationState: authenticationReducer,
});

const store = createStore(reducer, composeWithDevTools());

export type ReduxState = ReturnType<typeof reducer>;
export default store;
