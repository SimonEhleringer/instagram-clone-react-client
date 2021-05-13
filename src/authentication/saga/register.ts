import { call, takeLatest } from 'redux-saga/effects';
import {
  AccessAndRefreshTokenResponse,
  register,
  RegisterRequest_Test,
  requestRegister,
} from '../apiRequests';
import { REGISTER, RegisterPayload, AuthenticationState } from '../store';
import { AsyncPayloadAction } from '../../asyncAction';
import { getErrorsArrayFromSagaError } from '../../sagaError';
import { morphism } from 'morphism';
import {
  registerPayloadToRegisterRequestSchema,
  accessAndRefreshTokenResponseToAuthenticationStateSchema,
} from '../mapping';
import { AxiosResponse } from 'axios';

export default function* watchRegister() {
  yield takeLatest(REGISTER, handleRegister);
}

function* handleRegister(
  action: AsyncPayloadAction<RegisterPayload, AuthenticationState>
) {
  console.log('registerrr');

  const { onSuccess, onError } = action.meta;

  // const request = morphism(
  //   registerPayloadToRegisterRequestSchema,
  //   action.payload
  // );

  const request: RegisterRequest_Test = {
    email: 'testasdf@testasdf.com',
    password: 'Test123!',
    username: 'Testasdf',
  };

  console.log(action.payload);

  try {
    const response: AccessAndRefreshTokenResponse = yield call(
      requestRegister,
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
