const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
