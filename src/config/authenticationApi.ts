import axios, { AxiosRequestConfig } from 'axios';

const authenticationApi = axios.create({
  baseURL:
    'https://instagram-clone-spring-boot.herokuapp.com/api/v1/authentication',
});

authenticationApi.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log(config);

  return config;
});

export default authenticationApi;
