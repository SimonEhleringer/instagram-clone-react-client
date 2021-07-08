import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authenticationReducer } from '../redux/authentication/slice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = combineReducers({
  authenticationState: authenticationReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const configureStore = () => {
  const store = createStore(reducer, composeWithDevTools());

  return store;
};

export const configurePersistedStore = () => {
  const store = createStore(persistedReducer, composeWithDevTools());
  const persistor = persistStore(store);

  return { store, persistor };
};

export type ReduxState = ReturnType<typeof reducer>;
export type StoreType = ReturnType<typeof configureStore>;

export const { store: applicationStore, persistor: applicationPersistor } =
  configurePersistedStore();
