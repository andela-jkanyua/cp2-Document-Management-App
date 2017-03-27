import { combineReducers } from 'redux';
import documents from './documentReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  documents,
  auth
});

export default rootReducer;
