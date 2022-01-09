import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import showsReducer from './shows/reducer';
import globalReducer from './global/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  shows: showsReducer,
  global: globalReducer,
});

export default rootReducer;
