const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_ME_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ME_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.user,
        error: null,
      };
    case 'GET_ME_ERROR':
      return {
        ...state,
        loading: false,
        user: null,
        error: action.error,
      };

    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
