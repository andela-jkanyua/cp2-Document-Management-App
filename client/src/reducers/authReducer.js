import * as types from '../actions/actionTypes';
import * as tokenUtils from '../utils/tokenUtility';

export default function authReducer(
  state = {
    isFetching: false,
    isAuthenticated: !!tokenUtils.getAuthToken()
  }, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: action.user.user
      });
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message.message
      });
    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: null
      });
    case types.SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: null,
      });
    case types.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}
