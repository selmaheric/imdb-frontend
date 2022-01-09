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
    const {
      type, search, searchByPhrase, limit,
    } = params;
    const response = await axios.get('/shows', {
      cancelToken: source.token,
      params: {
        type,
        search,
        searchByPhrase,
        limit: limit || 10,
      },
      withCredentials: true,
    });

    dispatch({
      type: 'GET_SHOWS_SUCCESS',
      shows: response?.data?.data?.shows,
      pagination: {
        limit: response?.data?.data?.limit,
        offset: response?.data?.data?.offset,
        count: response?.data?.data?.count,
        totalPages: response?.data?.data?.totalPages,
        page: 1,
      },
    });
  } catch (error) {
    if (isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      dispatch({
        type: 'GET_SHOWS_ERROR',
        error: error.response && error.response.data,
      });
    }
  }
};

export const getMoreShows = (params = {}) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_MORE_SHOWS_REQUEST',
    });

    const state = getState();
    const { pagination } = state.shows;

    const { type, search, searchByPhrase } = params;
    const response = await axios.get('/shows', {
      params: {
        type,
        search,
        searchByPhrase,
        offset: pagination.page * pagination.limit,
      },
      withCredentials: true,
    });

    dispatch({
      type: 'GET_MORE_SHOWS_SUCCESS',
      shows: response?.data?.data?.shows,
      pagination: {
        limit: response?.data?.data?.limit,
        offset: response?.data?.data?.offset,
        count: response?.data?.data?.count,
        totalPages: response?.data?.data?.totalPages,
        page: pagination.page + 1,
      },
    });
  } catch (error) {
    dispatch({
      type: 'GET_MORE_SHOWS_ERROR',
      error: error.response && error.response.data,
    });
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
      error: error.response && error.response.data,
    });
  }
};
