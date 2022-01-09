import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
  baseURL: config.REACT_APP_API_URL,
});

export default axiosInstance;
