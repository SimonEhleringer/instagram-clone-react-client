import { all, fork } from '@redux-saga/core/effects';
import register from './register';

export default function* authenticationSaga() {
  yield all([fork(register)]);
}
