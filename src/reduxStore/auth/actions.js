import axios from '../../utils/axios';

export const loginUser = () => async (dispatch) => {
  try {
    const response = await axios.get('/users/me', {
        withCredentials: true
      });
    dispatch({
      type: 'LOGIN',
      user: response?.data?.user
    });
  } catch (error) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: error,
    });
  }
};