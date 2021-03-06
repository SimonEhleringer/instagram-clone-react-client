import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// constants
const name = 'authentication';

export const initialState: AuthenticationState = {
  loggedInUserId: undefined,
  accessToken: '',
  refreshToken: '',
};

// slice
const slice = createSlice({
  name,
  initialState,
  reducers: {
    setState(state, action: PayloadAction<AuthenticationState>) {
      const { accessToken, refreshToken, loggedInUserId } = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.loggedInUserId = loggedInUserId;
    },
    setAccessAndRefreshToken(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) {
      const { accessToken, refreshToken } = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
});

export const { setState, setAccessAndRefreshToken } = slice.actions;
export const authenticationReducer = slice.reducer;

// types
export type AuthenticationState = {
  loggedInUserId?: string;
  accessToken: string;
  refreshToken: string;
};
