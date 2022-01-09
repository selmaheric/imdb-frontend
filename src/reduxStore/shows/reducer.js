const INITIAL_STATE = {
  loading: false,
  loadingMore: false,
  shows: [],
  error: null,
  pagination: {},
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
        pagination: action.pagination,
      };

    case 'GET_SHOWS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case 'GET_MORE_SHOWS_REQUEST':
      return {
        ...state,
        loadingMore: true,
        error: null,
      };

    case 'GET_MORE_SHOWS_SUCCESS':
      return {
        ...state,
        loadingMore: false,
        shows: [...state.shows, ...action.shows],
        error: null,
        pagination: action.pagination,
      };

    case 'GET_MORE_SHOWS_ERROR':
      return {
        ...state,
        loadingMore: false,
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

    case 'CLEAR_RATINGS':
      return {
        ...state,
        shows: state.shows.map((show) => ({
          ...show,
          my_rating: null,
        })),
      };

    default:
      return state;
  }
};

export default reducer;
