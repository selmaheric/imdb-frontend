const INITIAL_STATE = {
  loading: false,
  shows: [],
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_SHOWS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'GET_SHOWS_SUCCESS':
      return {
        ...state,
        loading: false,
        shows: action.shows,
        error: null,
      };

    case 'GET_SHOWS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case 'ADD_RATING_SUCCESS':
      return {
        ...state,
        shows: state.shows.map((s) => {
          if (s.id === action.show.id) {
            return {
              ...action.show,
            };
          }
          return {
            ...s,
          };
        }),
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
