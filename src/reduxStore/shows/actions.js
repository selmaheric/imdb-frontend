import axios, { CancelToken, isCancel } from '../../utils/axios';

let source = CancelToken.source();

export const cancelPreviousRequest = () => async () => {
  source.cancel('Operation canceled by other request.');
  source = CancelToken.source();
};

export const getShows = (params = {}) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_SHOWS_REQUEST',
    });

    const { search, searchByPhrase } = params;
    const response = await axios.get('/shows', {
      cancelToken: source.token,
      params: {
        type: 'movie',
        search,
        searchByPhrase,
      },
      withCredentials: true,
    });

    dispatch({
      type: 'GET_SHOWS_SUCCESS',
      shows: response?.data?.data?.shows,
    });
  } catch (error) {
    if (isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      const { type } = error.response.data;
      dispatch({
        type: 'GET_SHOWS_ERROR',
        payload: type === 'AUTH_INVALID' ? null : error.response.data,
      });
    }
  }
};

export const addRating = ({ rating, id }) => async (dispatch) => {
  try {
    const response = await axios.post(
      `/shows/${id}/add-rating`,
      {
        rating,
      },
      {
        withCredentials: true,
      },
    );

    dispatch({
      type: 'ADD_RATING_SUCCESS',
      show: {
        ...response.data.data.show,
        my_rating: rating,
      },
    });
  } catch (error) {
    dispatch({
      type: 'ADD_RATING_ERROR',
    });
  }
};
