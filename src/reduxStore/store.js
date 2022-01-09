import { applyMiddleware, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
  //  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
