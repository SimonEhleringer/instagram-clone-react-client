import axios, { AxiosRequestConfig } from 'axios';
import store from './store';

const resourceApi = axios.create({
  baseURL: 'https://instagram-clone-spring-boot.herokuapp.com/api/v1',
});

resourceApi.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = store.getState().authenticationState.accessToken;

  config.headers.Authorization = `Bearer ${accessToken}`;

  console.log(config);

  return config;
});

export default resourceApi;
