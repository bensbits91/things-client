import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// create a new instance of axios
const axiosInstance = axios.create();

// add a request interceptor
axiosInstance.interceptors.request.use(
   config => {
      config.headers['x-request-id'] = uuidv4(); // add a unique request id
      return config;
   },
   error => {
      return Promise.reject(error);
   }
);

export default axiosInstance;
