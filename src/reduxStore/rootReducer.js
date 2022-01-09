import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import showsReducer from './shows/reducer';

const rootReducer = combineReducers({
   auth: authReducer,
   shows: showsReducer,
});

export default rootReducer;
