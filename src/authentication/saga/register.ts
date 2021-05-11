import { call, put, takeLatest } from 'redux-saga/effects';
import {
  AccessAndRefreshTokenResponse,
  register,
  RegisterRequest,
} from '../apiRequests';
import { REGISTER, RegisterPayload, AuthenticationState } from '../store';
import { AsyncPayloadAction } from '../../asyncAction';
import { getUserIdFromAccessToken } from '../../accessToken';
import { getErrorsArrayFromSagaError } from '../../sagaError';

export default function* watchRegister() {
  yield takeLatest(REGISTER, handleRegister);
}

function* handleRegister(
  action: AsyncPayloadAction<RegisterPayload, AuthenticationState>
) {
  const { onSuccess, onError } = action.meta;

  const request: RegisterRequest = { ...action.payload };

  try {
    const response: AccessAndRefreshTokenResponse = yield call(
      register,
      request
    );

    const { accessToken, refreshToken } = response;

    const loggedInUserId = getUserIdFromAccessToken(accessToken);

    const payload: AuthenticationState = {
      accessToken,
      refreshToken,
      loggedInUserId,
    };

    onSuccess(payload);
  } catch (e) {
    onError(getErrorsArrayFromSagaError(e));
  }
}
