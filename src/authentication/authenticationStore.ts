import { createSlice } from '@reduxjs/toolkit';

const name = 'authentication';

type AuthenticationState = {
  isUserLoggedIn: boolean;
};

const initialState: AuthenticationState = {
  isUserLoggedIn: false,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {},
});

export const authenticationReducer = slice.reducer;
