import axios from 'axios';

const authenticationApi = axios.create({
  baseURL:
    //'https://instagram-clone-spring-boot.herokuapp.com/api/v1/authentication',
    'http://GiG.somee.com/api/v1',
});

export default authenticationApi;
