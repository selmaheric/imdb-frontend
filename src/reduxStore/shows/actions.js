import axios from '../../utils/axios';

export const getShows = (params = {}) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_SHOWS_REQUEST',
    });

    const { search } = params;
    const response = await axios.get('/shows', {
      params: {
        type: 'movie',
        search,
      },
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
