import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getSuggestions, SuggestionsResponseDto } from '../api/meSuggestions';
import {
  loadSuggestionsFailed,
  loadSuggestionsSucceeded,
  loadSuggestionsStarted,
  LOAD_SUGGESTIONS,
} from '../slice';

export function* loadSuggestionsSaga() {
  yield takeLatest(LOAD_SUGGESTIONS, handleLoadSuggestions);
}

function* handleLoadSuggestions() {
  yield put(loadSuggestionsStarted());

  try {
    const response: AxiosResponse<SuggestionsResponseDto> = yield call(
      getSuggestions
    );

    yield put(loadSuggestionsSucceeded(response.data.suggestions));
  } catch {
    yield put(loadSuggestionsFailed());
  }
}
