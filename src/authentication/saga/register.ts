import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setErrorsForAction } from '../../errorsStore';
import { register, RegisterRequest } from '../apiRequests';
import { REGISTER, RegisterPayload } from '../store';

export default function* watchRegister() {
  yield takeLatest(REGISTER, handleRegister);
}

function* handleRegister(action: PayloadAction<RegisterPayload>) {
  const request: RegisterRequest = { ...action.payload };

  try {
    yield call(register, request);
  } catch (e) {
    yield put(
      setErrorsForAction({
        actionName: REGISTER,
        errors: e,
      })
    );
  }
}
