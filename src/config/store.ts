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

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(suggestionsSaga);

export type ReduxState = ReturnType<typeof reducer>;
export default store;
