import { all, fork } from '@redux-saga/core/effects';
import { loadSuggestionsSaga } from './loadSuggestions';

export function* suggestionsSaga() {
  yield all([fork(loadSuggestionsSaga)]);
}
