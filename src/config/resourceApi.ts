import axios, { AxiosRequestConfig } from 'axios';
import { refresh } from '../api/authentication';
import { setAccessAndRefreshToken } from '../redux/authentication/slice';
import applicationStore from './store';

const resourceApi = axios.create({
  baseURL: 'https://instagram-clone-spring-boot.herokuapp.com/api/v1',
});

// TODO: Add tests for interceptor
resourceApi.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken =
    applicationStore.getState().authenticationState.accessToken;

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

let isRefreshing = false;
let refreshSubscribers: ((accessToken: string) => void)[] = [];

// TODO: Read one more time threw this interceptor to understand it completele
resourceApi.interceptors.response.use(
  (value) => value,
  (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status !== 401) {
      return Promise.reject(error);
    }

    if (!isRefreshing) {
      isRefreshing = true;

      const refreshToken =
        applicationStore.getState().authenticationState.refreshToken;

      refresh({ refreshToken }).then((val) => {
        isRefreshing = false;

        applicationStore.dispatch(setAccessAndRefreshToken(val.data));

        refreshSubscribers.forEach((callback) =>
          callback(val.data.accessToken)
        );

        refreshSubscribers = [];
      });
    }

    const retryOriginalRequest = new Promise((resolve) => {
      refreshSubscribers.push((accessToken) => {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        resolve(axios(originalRequest));
      });
    });

    return retryOriginalRequest;
  }
);

export default resourceApi;
