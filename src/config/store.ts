import { all, fork } from '@redux-saga/core/effects';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import authenticationSaga from '../authentication/saga';
import { authenticationReducer } from '../authentication/store';
import createSagaMiddleware from 'redux-saga';

function* rootSaga() {
  yield all([fork(authenticationSaga)]);
}

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  authenticationState: authenticationReducer,
});

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export type ReduxState = ReturnType<typeof reducer>;
export default store;
