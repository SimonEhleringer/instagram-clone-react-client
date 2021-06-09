import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authenticationReducer } from '../authentication/store';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { suggestionsSaga } from '../saga';
import { suggestionsReducer } from '../slice';

export const reducer = combineReducers({
  authenticationState: authenticationReducer,
  suggestionsState: suggestionsReducer,
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

const applicationStore = configureStore();

export default applicationStore;
