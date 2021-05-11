import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// constants
const name = 'errors';

const initialState: ErrorsState = {
  errors: new Map<actionName, errors>(),
};

// slice
const slice = createSlice({
  name,
  initialState,
  reducers: {
    setErrorsForAction(
      state,
      action: PayloadAction<SetErrorsForActionPayload>
    ) {
      const { actionName, errors } = action.payload;

      state.errors = new Map<actionName, errors>(
        state.errors.set(actionName, errors)
      );
    },
  },
});

export const { setErrorsForAction } = slice.actions;

export const errorsReducer = slice.reducer;

// types
type ErrorsState = {
  errors: Map<actionName, errors>;
};

type SetErrorsForActionPayload = {
  actionName: actionName;
  errors: errors;
};

type actionName = string;
type errors = string[];
