import axios, { AxiosRequestConfig } from 'axios';
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

export default resourceApi;
