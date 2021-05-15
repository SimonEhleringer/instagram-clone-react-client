import { all, fork } from '@redux-saga/core/effects';
import register from './register';
import login from './login';

export default function* authenticationSaga() {
  yield all([fork(register), fork(login)]);
}
