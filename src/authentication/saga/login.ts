import { call, put, takeLatest } from '@redux-saga/core/effects';
import { morphism } from 'morphism';
import { AsyncPayloadAction } from '../../asyncAction';
import { getErrorsArrayFromSagaError } from '../../sagaError';
import { login, LoginDto, SuccessfulAuthenticationDto } from '../business';
import { successfulAuthenticationDtoToAuthenticationStateSchema } from '../mapping';
import { LOGIN, setState } from '../store';

export default function* watchLogin() {
  yield takeLatest(LOGIN, handleLogin);
}

function* handleLogin(action: AsyncPayloadAction<LoginDto, void>) {
  const { onSuccess, onError } = action.meta;

  try {
    const successfulAuthenticationDto: SuccessfulAuthenticationDto = yield call(
      login,
      action.payload
    );

    const payload = morphism(
      successfulAuthenticationDtoToAuthenticationStateSchema,
      successfulAuthenticationDto
    );

    yield put(setState(payload));
    onSuccess();
  } catch (e) {
    onError(getErrorsArrayFromSagaError(e));
  }
}
