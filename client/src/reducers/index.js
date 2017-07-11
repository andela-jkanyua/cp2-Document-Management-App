import { combineReducers } from 'redux';
import documents from './documentReducer';
import auth from './authReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  documents,
  auth,
  user
});

export default rootReducer;
