import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authenticationReducer } from '../redux/authentication/slice';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { suggestionsSaga } from '../redux/suggestions/saga';
import { suggestionsReducer } from '../redux/suggestions/slice';
import { newPostReducer } from '../redux/newPost/slice';

export const reducer = combineReducers({
  authenticationState: authenticationReducer,
  suggestionsState: suggestionsReducer,
  newPostState: newPostReducer,
});

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(suggestionsSaga);

  return store;
};

export type ReduxState = ReturnType<typeof reducer>;
export type StoreType = ReturnType<typeof configureStore>;

const applicationStore = configureStore();

export default applicationStore;
