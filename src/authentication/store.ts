import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncActionParams } from '../asyncAction';

// constants
const name = 'authentication';

export const REGISTER = `${name}/register`;

const initialState: AuthenticationState = {
  loggedInUserId: undefined,
  accessToken: '',
  refreshToken: '',
};

// actions
export const register = createAction(
  REGISTER,
  (params: AsyncActionParams<RegisterPayload, AuthenticationState>) => params
);

// slice
const slice = createSlice({
  name,
  initialState,
  reducers: {
    setState(state, action: PayloadAction<AuthenticationState>) {
      state = { ...action.payload };
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

export type RegisterPayload = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};
