import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncActionParams } from '../asyncAction';
import { LoginDto, RegisterDto } from './business';

// constants
const name = 'authentication';

export const REGISTER = `${name}/register`;
export const LOGIN = `${name}/login`;

const initialState: AuthenticationState = {
  loggedInUserId: undefined,
  accessToken: '',
  refreshToken: '',
};

// actions
export const register = createAction(
  REGISTER,
  (params: AsyncActionParams<RegisterDto, void>) => params
);

export const login = createAction(
  LOGIN,
  (params: AsyncActionParams<LoginDto, void>) => params
);

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
  },
});

export const { setState } = slice.actions;
export const authenticationReducer = slice.reducer;

// types
export type AuthenticationState = {
  loggedInUserId?: string;
  accessToken: string;
  refreshToken: string;
};
