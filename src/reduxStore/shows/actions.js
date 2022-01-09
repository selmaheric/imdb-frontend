import axios from '../../utils/axios';

export const getShows = () => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_SHOWS_REQUEST',
    });
    const response = await axios.get('/shows?type=movie', {
      withCredentials: true,
    });
    dispatch({
      type: 'GET_SHOWS_SUCCESS',
      shows: response?.data?.data?.shows,
    });
  } catch (error) {
    const { type } = error.response.data;
    dispatch({
      type: 'GET_SHOWS_ERROR',
      payload: type === 'AUTH_INVALID' ? null : error.response.data,
    });
  }
};
