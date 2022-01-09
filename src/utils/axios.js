import axios from 'axios';
import config from '../config';

import store from '../reduxStore/store';

const axiosInstance = axios.create({
  baseURL: config.REACT_APP_API_URL,
});

axiosInstance.interceptors.response.use(undefined, async (error) => {
  if (error && error.response) {
    const { status } = error.response;
    if (status >= 500) {
      store.dispatch({ type: 'GLOBAL_ERROR_500', error: status });
    }
  }
  throw error;
});

export const { CancelToken, isCancel } = axios;

export default axiosInstance;
