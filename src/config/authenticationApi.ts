import axios from 'axios';

const authenticationApi = axios.create({
  baseURL:
    'https://instagram-clone-spring-boot.herokuapp.com/api/v1/authentication',
});

export default authenticationApi;
