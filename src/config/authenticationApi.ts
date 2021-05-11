import axios from 'axios';

const authenticationApi = axios.create({
  baseURL: '', // TODO: Base URL for Authentication API
});

export default authenticationApi;
