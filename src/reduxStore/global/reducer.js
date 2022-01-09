const INITIAL_STATE = {
  error500: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GLOBAL_ERROR_500':
      console.log('ok');
      return {
        ...state,
        error500: true,
      };
    default:
      return state;
  }
};

export default reducer;
