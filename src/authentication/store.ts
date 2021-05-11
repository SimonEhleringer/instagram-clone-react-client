import { createAction, createSlice } from '@reduxjs/toolkit';

// constants
const name = 'authentication';

export const REGISTER = `${name}/register`;

const initialState: AuthenticationState = {
  isUserLoggedIn: false,
};

// actions
export const register = createAction<RegisterPayload>(REGISTER);

// slice
const slice = createSlice({
  name,
  initialState,
  reducers: {
    setState() {},
  },
});

export const { setState } = slice.actions;
export const authenticationReducer = slice.reducer;

// types
type AuthenticationState = {
  isUserLoggedIn: boolean;
};

export type RegisterPayload = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};
