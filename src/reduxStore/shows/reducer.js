const INITIAL_STATE = {
  loading: false,
  shows: [],
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_SHOWS_REQUEST':
      return {
        ...state,
      };

    case 'FETCH_SHOWS_SUCCESS':
      return {
        ...state,
      };

    case 'FETCH_SHOWS_ERROR':
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
