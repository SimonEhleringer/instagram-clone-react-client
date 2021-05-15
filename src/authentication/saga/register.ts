import { call, put, takeLatest } from 'redux-saga/effects';
import { REGISTER, setState } from '../store';
import { AsyncPayloadAction } from '../../asyncAction';
import { getErrorsArrayFromSagaError } from '../../sagaError';
import {
  register,
  RegisterDto,
  SuccessfulAuthenticationDto,
} from '../business';
import { morphism } from 'morphism';
import { successfulAuthenticationDtoToAuthenticationStateSchema } from '../mapping';

export default function* watchRegister() {
  yield takeLatest(REGISTER, handleRegister);
}

function* handleRegister(action: AsyncPayloadAction<RegisterDto, void>) {
  const { onSuccess, onError } = action.meta;

  try {
    const successfulRegisterDto: SuccessfulAuthenticationDto = yield call(
      register,
      action.payload
    );

    const payload = morphism(
      successfulAuthenticationDtoToAuthenticationStateSchema,
      successfulRegisterDto
    );

    yield put(setState(payload));
    onSuccess();
  } catch (e) {
    onError(getErrorsArrayFromSagaError(e));
  }
}
