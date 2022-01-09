import config from '../../config';
import axios from '../../utils/axios';

export const loginUser = () => async (dispatch) => {
  try {
    window.open(`${config.REACT_APP_API_URL}/auth/google`, '_self');
  } catch (error) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: error,
    });
  }
};

export const getMe = () => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_ME_REQUEST',
    });
    const response = await axios.get('/users/me', {
      withCredentials: true,
    });
    dispatch({
      type: 'GET_ME_SUCCESS',
      user: response?.data?.data?.user,
    });
  } catch (error) {
    const { type } = error.response.data;
    dispatch({
      type: 'GET_ME_ERROR',
      payload: type === 'AUTH_INVALID' ? null : error.response.data,
    });
  }
};

export const logout = () => async (dispatch) => {
  await axios.get('/auth/logout', {
    withCredentials: true,
  });
  dispatch({
    type: 'LOGOUT',
  });
};
