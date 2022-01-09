export const loginUser = () => async (dispatch) => {
  try {
    console.log(1);
    dispatch({ type: 'LOGIN' });
  } catch (error) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: error,
    });
  }
};