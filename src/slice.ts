import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponseDto } from './common/api';

const name = 'suggestions';

export const LOAD_SUGGESTIONS = `${name}/loadSuggestions`;

export interface SuggestionsState {
  suggestions: UserResponseDto[];
  isLoading: boolean;
}

const initialState: SuggestionsState = {
  suggestions: [],
  isLoading: false,
};

export const loadSuggestions = createAction(LOAD_SUGGESTIONS);

const suggestionsSlice = createSlice({
  name,
  initialState,
  reducers: {
    loadSuggestionsStarted(state) {
      console.log('load suggestions reducer :)');

      state.isLoading = true;
    },
    loadSuggestionsSucceeded(state, action: PayloadAction<UserResponseDto[]>) {
      state.suggestions = action.payload;
      state.isLoading = false;
    },
    loadSuggestionsFailed(state) {
      state.isLoading = false;
    },
  },
});

export const {
  loadSuggestionsStarted,
  loadSuggestionsFailed,
  loadSuggestionsSucceeded,
} = suggestionsSlice.actions;

export const suggestionsReducer = suggestionsSlice.reducer;
