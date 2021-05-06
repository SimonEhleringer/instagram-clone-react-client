import { combineReducers, createStore } from "redux";
import { authenticationReducer } from "./authentication/authenticationStore";

const reducer = combineReducers({
  authenticationState: authenticationReducer,
});

const store = createStore(reducer);

export type ReduxState = ReturnType<typeof reducer>;
export default store;
