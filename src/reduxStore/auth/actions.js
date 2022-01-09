import config from '../../config';
import axios from '../../utils/axios';

export const loginUser = () => async () => {
  window.open(`${config.REACT_APP_API_URL}/auth/google`, '_self');
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
    dispatch({
      type: 'GET_ME_ERROR',
      payload: error.response && error.response.data,
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
  dispatch({
    type: 'CLEAR_RATINGS',
  });
};
