import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogout } from '../api/authentication';
import { ReduxState } from '../config/store';
import { initialState, setState } from '../redux/authentication/slice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const refreshToken = useSelector(
    (state: ReduxState) => state.authenticationState.refreshToken
  );

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);

    await requestLogout({ refreshToken });

    dispatch(setState(initialState));

    setIsLoggingOut(false);
  };

  return { isLoggingOut, logout };
};
