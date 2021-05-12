import { call, takeLatest } from 'redux-saga/effects';
import { AccessAndRefreshTokenResponse, register } from '../apiRequests';
import { REGISTER, RegisterPayload, AuthenticationState } from '../store';
import { AsyncPayloadAction } from '../../asyncAction';
import { getErrorsArrayFromSagaError } from '../../sagaError';
import { morphism } from 'morphism';
import {
  registerPayloadToRegisterRequestSchema,
  accessAndRefreshTokenResponseToAuthenticationStateSchema,
} from '../mapping';

export default function* watchRegister() {
  yield takeLatest(REGISTER, handleRegister);
}

function* handleRegister(
  action: AsyncPayloadAction<RegisterPayload, AuthenticationState>
) {
  const { onSuccess, onError } = action.meta;

  const request = morphism(
    registerPayloadToRegisterRequestSchema,
    action.payload
  );

  try {
    const response: AccessAndRefreshTokenResponse = yield call(
      register,
      request
    );

    const payload = morphism(
      accessAndRefreshTokenResponseToAuthenticationStateSchema,
      response
    );

    onSuccess(payload);
  } catch (e) {
    onError(getErrorsArrayFromSagaError(e));
  }
}
